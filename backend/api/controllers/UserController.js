/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require( 'bcryptjs' )
    , MC = require( 'maptor-consumer' )
    , I = x => x;

const util = {
  err( res, err ) {
    sails.log( err );
    return res.serverError('internal server error');
  },
  updateUserName( id, userName, callback ) {
  
    User.findOne({ userName }).exec( ( err, user ) => {
    
      if( err )
        return callback( err );

      if( user )
        return callback( false, 'user already exists' );

      if( !user ) {
      
        User.update({ id }, { userName }).exec( ( err, records ) => {
        
          if( err )
            return callback( err );

          return callback( false, false, 'userName' );

        });
      }

    })
  },
  updateName( id, name, callback ) {
  
    User.update({ id }, { name }).exec( ( err, records ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'name' );
    })
  },
  updateDescription( id, description, callback ) {
  
    User.update({ id }, { description }).exec( ( err, records ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'description' );
    })
  },
  updatePassword( id, password, callback ) {
  
    bcrypt.hash( password, 10, ( err, hash ) => {
    
      if( err )
        return callback( err );

      User.update({ id }, { hash }).exec( ( err, records ) => {
      
        if( err )
          return callback( err );

        return callback( false, false, 'password' );
      })
    })
  },

}

module.exports = {
  
  login( req, res ) {
    
    const userName = req.param( 'username' )
        , email = req.param( 'email' )
        , password = req.param( 'password' )
        , lastLogin = Date.now()
        , onlineStatus = 'online';

    User.findOne( userName ? { userName } : { email } ).exec( ( err, user ) => {
      
      if( err )
        return util.err( res, err );

      if( !user )
        return res.badRequest( 'no user with that email or username' );

      bcrypt.compare( password, user.hash, ( err, result ) => {
      
        if( err )
          return util.err( res, err );

        if( !result )
          return res.forbidden( 'invalid password' );

        req.session.isAuthenticated = true;
        req.session.userName = user.userName;
        req.session.userId = user.id;

        User.update( userName ? { userName } : { email }, { lastLogin, onlineStatus } ).exec( ( err, records ) => {
        
          if( err )
            return util.err( res, err );

          return res.ok( 'logged in' );

        })
      })
    })
    
  },

  logout( req, res ) {

    const userName = req.session.userName
        , onlineStatus = 'offline'
        , lastLogout = Date.now()
  
    User.update({ userName }, { onlineStatus, lastLogout }).exec( ( err, records ) => {
    
      if( err )
        return util.err( res, err );
      
      req.session.isAuthenticated = false;
      delete req.session.userName;
      delete req.session.userId;

      res.ok( 'logged out' );
    })
  },

  delete( req, res ) {
  
    const userName = req.session.userName;

    User.destroy({ userName }).exec( ( err, records ) => {
    
      // TODO: remove from all interactions

      if( err )
        return util.err( res, err );

      req.session.isAuthenticated = false;
      delete req.session.userName;
      delete req.session.userId;

      res.ok( 'user deleted' );
    });
  },

  createCustom( req, res ) {
    
    const userName = req.param( 'username' )
        , password = req.param( 'password' )
        , email = req.param( 'email' );

    const name = req.param( 'name' )
        , description = req.param( 'description' )

        

    bcrypt.hash( password, 10, ( err, hash ) => {
    
      if( err )
        return util.err( res, err );

      User.create({ userName, hash, email, name, description }).exec( ( err, user ) => {
        
        if( err )
          return util.err( res, err );

        return res.ok( 'user created' );
      });

    });
  },

  updateCustom( req, res ) {
    
    const id = req.session.userId
        , userName = req.param( 'username' )
        , name = req.param( 'name' )
        , description = req.param( 'description' )
        , password = req.param( 'password' );

    const toGo = []
        , callback = ( err, errMessage, property ) => {
        
          if( err )
            return util.err( res, err );

          if( errMessage )
            return res.badRequest( errMessage )

          toGo.splice( toGo.indexOf( property, 1 ) );

          if( toGo.length === 0 )
            return res.ok( 'parameters updated' );
        }

    if( userName ) {
      toGo.push( 'userName' );
      util.updateUserName( id, userName, callback );
    }

    if( name ) {
      toGo.push( 'name' );
      util.updateName( id, name, callback );
    }

    if( description ) {
      toGo.push( 'description' );
      util.updateDescription( id, description, callback );
    }

    if( password ) {
      toGo.push( 'password' );
      util.updatePassword( id, password, callback );
    }

  },

  request( req, res ) {
  
    const userName = req.param( 'username' );

    User.findOne({ userName })
      .populate( 'posts' )
      .populate( 'appreciatedPosts' )
      .populate( 'assets' )
      .populate( 'profileAsset' )
      .populate( 'follows' )
      .populate( 'followedBy' )
      .exec( ( err, user ) => {
    
      if( err )
        return util.err( res, err );

      const response = MC.map( user, {
        userName: I,
        name: I,
        description: I,
        profileAsset: ( asset ) => {

          if( !asset )
            return undefined;

          return MC.map( asset, {
            path: I
          });
        },
        posts: [ ( post ) => {
          if( post.isPrivate && req.session.userName !== user.userName )
            return undefined;

          return MC.map( post, {
            idTitle: I,
            title: I,
            description: I,
            views: I,
            appreciations: I
          })
        }],
        appreciatedPosts: [{
          idTitle: I,
          title: I,
          description: I,
          owner: I,
          views: I,
          appreciatons: I
        }],
        follows: [{
          userName: I,
          name: I,
          onlineStatus: I,
          profileAsset: ( asset ) => {

            if( !asset )
              return undefined;

            return MC.map( asset, {
              path: I
            });
          },
          privilegeStatus: I
        }],
        followedBy: [{
          userName: I,
          name: I,
          onlineStatus: I,
          profileAsset: ( asset ) => {

            if( !asset )
              return undefined;

            return MC.map( asset, {
              path: I
            });
          },
          privilegeStatus: I
        }],
        assets: [ ( asset ) => {
          if( asset.isPrivate && req.session.userName !== user.userName )
            return undefined;

          return MC.map( asset, {
            name: I,
            idName: I,
            description: I,
            path: I
          })
        }],
        lastLogin: I,
        lastLogout: I,
        onlineStatus: I,
        privilegeStatus: I
      })

      return res.json( response );
    })
  },

  status( req, res ) {
  
    // TODO
    res.json( req.session );
  },

  follow( req, res ) {
  
    const toFollowUserName = req.param( 'username' )
        , userName = req.session.userName;

    User.update({ userName }, { follows: { userName: toFollowUserName } }).exec( ( err, user ) => {
    
      if( err )
        return util.err( res, err );

      return res.ok( 'user followed' );
    })
  },

  // TODO
  socketCallIn( req, res ) {},
  socketLogin( req, res ) {},
  socketLogout( req, res ) {}

};
