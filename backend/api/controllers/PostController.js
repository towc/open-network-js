/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const MC = require( 'maptor-consumer' )
    , I = x => x;

const util = {
  err( res, err ) {
    sails.log( err );
    return res.serverError('internal server error');
  },

  updateTitle( id, title, callback ) {
  
    Post.update({ id }, { title }).exec( ( err, records ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'title' );
    })
  },
  updateIdTitle( id, idTitle, ownerId, callback ) {
  
    Post.findOne({ idTitle, owner: { id: ownerId } }).exec( ( err, post ) => {
    
      if( err )
        return callback( err );

      if( post )
        return callback( false, 'user already has post with that id' );

      Post.update({ id }, { idTitle }).exec( ( err, records ) => {
      
        if( err )
          return callback( err );

        return callback( false, false, 'idTitle' );
      })
    })
  },
  updateDescription( id, description, callback ) {
  
    Post.update({ id }, { description }).exec( ( err, records ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'description' );
    })
  },
  updateMarkdownContent( id, markdownContent, callback ) {
  
    Post.update({ id }, { markdownContent }).exec( ( err, records ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'markdownContent' );
    })
  },
  updatePrivate( id, isPrivate, callback ) {
  
    Post.update({ id }, { isPrivate }).exec( ( err, records ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'isPrivate' );
    })
  }

}

module.exports = {
  
  appreciate( req, res ) {
    
    const titleId = req.param( 'postname' )
        , userName = req.param( 'username' )
        , userId = req.session.userId

    User.findOne({ userName }).exec( ( err, user ) => {

      if( err )
        util.err( res, err );

      Post.findOne({ titleId, owner: user.id }).exec( ( err, post ) => {
      
        if( err )
          return util.err( res, err );
        
        Post.addToCollection( post.id, 'appreciatedBy' ).members( [ user.id ] ).exec( ( err ) => {

          if( err )
            return util.err( res, err );

          return res.ok( 'post appreciated' );
        });
      })
    })
  },

  createCustom( req, res ) {
  
    const title = req.param( 'postname' )
        , idTitle = req.param( 'postid' ) || title.split(' ').join('-').replace( /[\,\'\:]/g, '' )
        , description = req.param( 'description' )
        , markdownContent = req.param( 'markdowncontent' )
        , ownerId = req.session.userId
        , isPrivate = req.param( 'isPrivate' );

    Post.create({ title, idTitle, description, markdownContent, owner: ownerId, isPrivate }).exec( ( err, post ) => {
    
      if( err )
        return util.err( res, err );

      res.ok( 'post created' );
    })
  },

  updateCustom( req, res ) {
  
    const title = req.param( 'postname' )
        , idTitle = req.param( 'postid' )
        , newIdTitle = req.param( 'newpostid' ) || ( title && req.param( 'updatepostid' ) && title.split(' ').join('-').replace( /[\,\'\:]/g, '' ) )
        , description = req.param( 'description' )
        , markdownContent = req.param( 'markdowncontent' )
        , ownerId = req.session.userId
        , isPrivate = req.param( 'isPrivate' );

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

    Post.findOne({ idTitle, owner: ownerId }).exec( ( err, post ) => {

      if( err )
        return util.err( res, err );

      const id = post.id;

      if( title ) {
        toGo.push( 'title' );
        util.updateTitle( id, title, callback );
      }
      if( newIdTitle ) {
        toGo.push( 'newIdTitle' );
        util.updateIdTitle( id, newIdTitle, ownerId, callback );
      }
      if( description ) {
        toGo.push( 'description' );
        util.updateDescription( id, description, callback );
      }
      if( markdownContent ) {
        toGo.push( 'markdownContent' );
        util.updateMarkdownContent( id, markdownContent, callback );
      }
      if( isPrivate !== post.isPrivate ) {
        toGo.push( 'isPrivate' );
        util.updatePrivate( id, isPrivate, callback );
      }
    });
  },

  request( req, res ) {
  
    const idTitle = req.param( 'postname' )
        , userName = req.param( 'username' );

    Post.findOne({ idTitle, owner: { userName } })
      .populate( 'seenBy' )
      .populate( 'appreciatedBy' )
      .exec( ( err, post ) => {
   
      if( err )
        return util.err( res, err );

      if( post.isPrivate && req.session.userName !== userName )
        return res.notFound( 'post does not exist' );

      const response = MC.map( post, {
        idTitle: I,
        title: I,
        description: I,
        markdownContent: I,
        owner: {
          userName: I,
          name: I,
          description: I,
          onlineStatus: I,
          privilegeStatus: I,
          profileAsset: ( asset ) => {
            if( !asset )
              return undefined;

            return MC.map( profileAsset, {
              path: I
            });
          }
        }
      })

    })
  },

  delete( req, res ) {
    
    const idTitle = req.param( 'postname' )
        , userName = req.session.userName;

    Post.destroy({ idTitle, owner: { userName }}).exec( ( err ) => {
      
      if( err )
        return util.err( res, err );

      res.ok( 'post deleted' );
    })
  }

};

