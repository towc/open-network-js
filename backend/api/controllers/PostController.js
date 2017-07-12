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
  
    Post.findOne({ idTitle, owner: ownerId }).exec( ( err, post ) => {
    
      if( err )
        return callback( err );

      if( post )
        return callback( false, 'user already has post with that id' );

      Post.update({ id }, { idTitle }).exec( ( err, records ) => {
      
        if( err )
          return callback( err );

        return callback( false, false, 'newIdTitle' );
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
  
    const editedAt = Date.now();

    Post.update({ id }, { markdownContent, editedAt }).exec( ( err, records ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'markdownContent' );
    })
  },
  updateKeywords( id, keywords, callback ) {
  
    Post.update({ id }, { keywords }).exec( ( err, records ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'keywords' );
    })
  },
  updatePrivate( id, isPrivate, callback ) {
  
    Post.update({ id }, { isPrivate }).exec( ( err, records ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'isPrivate' );
    })
  },

  sendPosts( err, posts, res ) {
    
    if( err )
      return util.err( res, err );

    // TODO sanitize
    return res.json( posts );
  }

}

module.exports = {
  
  appreciate( req, res ) {
    
    const idTitle = req.param( 'postid' )
        , userName = req.param( 'username' )
        , userId = req.session.userId

    User.findOne({ userName }).exec( ( err, user ) => {

      if( err )
        util.err( res, err );

      Post.findOne({ idTitle, owner: user.id }).exec( ( err, post ) => {
      
        if( err )
          return util.err( res, err );

        const appreciations = post.appreciations + 1;
        Post.update({ idTitle }, { appreciations }).exec( ( err, records ) => {
        
          if( err )
            return util.err( res, err );
        });
        
        Post.addToCollection( post.id, 'appreciatedBy' )
          .members( [ user.id ] )
          .exec( ( err ) => {

            if( err )
              return util.err( res, err );

            return res.ok( 'post appreciated' );
        });
      })
    })
  },

  createCustom( req, res ) {
  
    const title = req.param( 'postname' )
        , idTitle = req.param( 'postid' ) || title.split(' ').join('-').replace( /[\,\'\:]/g, '' ) + '-' + Math.random().toString().split('.')[1]
        , description = req.param( 'description' )
        , markdownContent = req.param( 'markdowncontent' )
        , ownerId = req.session.userId
        , keywords = req.param( 'keywords' )
        , isPrivate = req.param( 'isPrivate' )
        , editedAt = Date.now();

    Post.create({ title, idTitle, description, markdownContent, owner: ownerId, keywords, isPrivate, editedAt }).exec( ( err, post ) => {
    
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
        , keywords = req.param( 'keywords' )
        , isPrivate = req.param( 'isprivate' );

    const toGo = []
        , callback = ( err, errMessage, property ) => {

          if( err )
            return util.err( res, err );

          if( errMessage )
            return res.badRequest( errMessage )

          toGo.splice( toGo.indexOf( property ), 1 );

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
      if( keywords ) {
        toGo.push( 'keywords' );
        util.updateKeywords( id, keywords, callback );
      }
      if( isPrivate !== post.isPrivate ) {
        toGo.push( 'isPrivate' );
        util.updatePrivate( id, isPrivate, callback );
      }
    });
  },

  request( req, res ) {
  
    const idTitle = req.param( 'postid' )
        , userName = req.param( 'username' );

    User.findOne({ userName })
      .populate( 'profileAsset' )
      .exec( ( err, user ) => {

      if( err )
        util.err( res, err );

      Post.findOne({ idTitle, owner: user.id }).exec( ( err, post ) => {
       
          if( err )
            return util.err( res, err );

          if( !req.session.seenPost )
            req.session.seenPost = {};

          if( !req.session.seenPost[ user.id ] )
            req.session.seenPost[ user.id ] = {};

          if( !req.session.seenPost[ user.id ][ post.id ] ) {

            req.session.seenPost[ user.id ][ post.id ] = true;

            const views = post.views + 1;
            Post.update({ idTitle }, { views }).exec( ( err, records ) => {
            
              if( err )
                return util.err( res, err );

            });

            if( req.session.isAuthenticated ) {
            
              const userId = req.session.userId;
              Post.addToCollection( post.id, 'seenBy' )
                .members([ userId ])
                .exec( ( err ) => {

                  if( err )
                    return util.err( res, err );

                });

            }
          }

          const response = MC.map( post, {
            idTitle: I,
            title: I,
            description: I,
            markdownContent: I,
            keywords: I,
            isPrivate: I,
            views: I,
            appreciations: I,
            createdAt: I,
            editedAt: I,
            owner: () => MC.map( user, {
              userName: I,
              name: I,
              description: I,
              onlineStatus: I,
              privilegeStatus: I,
              profileAsset: ( asset ) => {
                if( !asset )
                  return undefined;

                return MC.map( asset, {
                  path: I,
                  idName: I
                });
              }
            })
          });

          res.json( response );
        });
    })
  },

  delete( req, res ) {
    
    const idTitle = req.param( 'postid' )
        , ownerId = req.session.userId;

    Post.destroy({ idTitle, owner: ownerId }).exec( ( err ) => {
      
      if( err )
        return util.err( res, err );

      res.ok( 'post deleted' );
    })
  },

  search( req, res ) {
  
    const keywords = req.param( 'keywords' )
        , mode = req.param( 'mode' )
        , page = req.param( 'page' ) || 0;

    const pageSize = 6
        , searchQuery = keywords ? { 
          and: keywords.map( keyword => ({ keywords: { 'contains': keyword } }) )
        } : {};

    switch( mode ) {

      case 'recent':
        Post.find(Object.assign( searchQuery, {
          skip: page * pageSize,
          limit: pageSize,
          sort: 'createdAt DESC'
        })).exec( ( err, posts ) => util.sendPosts( err, posts, res ) );
        break;

      case 'following':
        const userId = req.session.userId;
        Post.find(Object.assign( searchQuery, {
          where: { owner: { followedBy: { 'contains': userId }}},
          skip: page * pageSize,
          limit: pageSize,
          sort: 'createdAt DESC'
        })).exec( ( err, posts ) => util.sendPosts( err, posts, res ) );
        break;
        
      case 'popular':
        Post.find(Object.assign( searchQuery, {
          skip: page * pageSize,
          limit: pageSize,
          sort: 'popularity DESC'
        })).exec( ( err, posts ) => util.sendPosts( err, posts, res ) );
        break;
    }
  }

};

