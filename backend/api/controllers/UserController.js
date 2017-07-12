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
  getUserResponse( user, sessionUserName ) {
  
    return MC.map( user, {
      userName: I,
      name: I,
      description: I,
      profileAsset: ( asset ) => {

        if( !asset )
          return undefined;

        return MC.map( asset, {
          path: I,
          idName: I
        });
      },
      posts: [ ( post ) => {

        if( post.isPrivate && sessionUserName !== user.userName )
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
        owner: {
          userName: I
        },
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
        if( asset.isPrivate && sessionUserName !== user.userName )
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
  updateProfileAsset( id, profileAssetIdName, callback ) {
  
    Asset.findOne({ owner: id, idName: profileAssetIdName }).exec( ( err, asset ) => {
    
      if( err )
        return callback( err );

      if( !asset )
        return callback( false, 'asset doesn\'t exist' );

      User.update({ id }, { profileAsset: asset.id }).exec( ( err, records ) => {
      
        if( err )
          return callbacK( err );

        return callback( false, false, 'profileAsset' );
      })
    })
  },
  updateLinks( id, links, callback ) {
  
    User.update({ id }, { links }).exec( ( err, records ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'links' );
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
          return res.badRequest( 'invalid password' ); // unauthorized

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

    const name = req.param( 'name' ) || userName;

    bcrypt.hash( password, 10, ( err, hash ) => {
    
      if( err )
        return util.err( res, err );

      User.create({ userName, hash, email, name }).exec( ( err, user ) => {
        
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
        , profileAssetIdName = req.param( 'profileaset' )
        , links = req.param( 'links' )
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

    if( profileAssetIdName ) {
      toGo.push( 'profileAsset' );
      util.updateProfileAsset( id, profileAssetIdName, callback );
    }
    
    if( links) {
      toGo.push( 'links' );
      util.updateLinks( id, links, callback );
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

      let appreciatedNumber = user.appreciatedPosts.length;


      if( appreciatedNumber > 0 )
        user.appreciatedPosts.forEach( ( post, i ) => {
        
          Post.findOne({ id: post.id })
            .populate( 'owner' ).exec( ( err, post ) => {
            
              if( err )
                return util.err( res, err );

              user.appreciatedPosts[ i ].owner = post.owner;

              --appreciatedNumber;
              if( appreciatedNumber <= 0 ) {
              
                return res.json( util.getUserResponse( user, req.session.userName ) );
              }
            })
        });

      else
        return res.json( util.getUserResponse( user, req.session.userName ));

    })
  },

  status( req, res ) {
  
    if( req.session.isAuthenticated ) {
      const id = req.session.userId;

      User.findOne({ id })
        .exec( ( err, user ) => {

      
          if( err )
            util.err( res, err );

          res.json({
            isAuthenticated: true,
            userName: user.userName
          });

        })
    } else res.json({ isAuthenticated: false });
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

