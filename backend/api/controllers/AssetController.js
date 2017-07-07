/**
 * AssetController
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

  updateName( id, name, callback ) {
  
    Asset.update({ id }, { name }).exec( ( err, asset ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'name' );
    })
  },

  updateIdName( id, idName, ownerId, callback ) {
  
    Asset.findOne({ idName, owner: ownerId }).exec( ( err, asset ) => {
    
      if( err )
        return callback( err );

      if( asset )
        return callback( false, 'used already has asset with that id' );

      Asset.update({ id }, { idName }).exec( ( err, asset ) => {
      
        if( err )
          return callback( err );

        return callback( false, false, 'idName' );
      })
    })
  },

  updateDescription( id, description, callback ) {
  
    Asset.update({ id }, { description }).exec( ( err, asset ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'description' );
    })
  },

  updatePath( id, path, callback ) {
  
    Asset.update({ id }, { path }).exec( ( err, asset ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'path' );
    })
  },

  updateKeywords( id, keywords, callback ) {
  
    Asset.update({ id }, { keywords }).exec( ( err, asset ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'keywords' );
    })
  },

  updateIsPrivate( id, isPrivate, callback ) {
  
    Asset.update({ id }, { isPrivate }).exec( ( err, asset ) => {
    
      if( err )
        return callback( err );

      return callback( false, false, 'isPrivate' );
    })
  },
};

module.exports = {
  
  createCustom( req, res ) {
    
    const userId = req.session.userId
        , name = req.param( 'assetname' )
        , idName = req.param( 'assetid' ) || name.replace( / /g, '-' ).replace( /[\,\:\@\/\\]/g, '' )
        , description = req.param( 'description' )
        , path = req.param( 'assetpath' );

    Asset.create({ name, idName, description, path, owner: userId }).exec( ( err, asset ) => {
    
      if( err )
        return util.err( res, err );

      return res.ok( 'asset created: ' + idName );

    });

  },

  updateCustom( req, res ) {
  
    const userId = req.session.userId
        , idName = req.param( 'assetid' )
        , name = req.param( 'assetname' )
        , newIdName = req.param( 'newassetid' ) || ( name && req.param( 'updateassetid' ) && name.replace( / /g, '-' ).replace( /[\,\:\@\/\\]/g, '') )
        , description = req.param( 'description' )
        , path = req.param( 'assetpath' )
        , isPrivate = req.param( 'isprivate' )
        , keywords = req.param( 'keywords' )

        , toGo = []
        , callback = ( err, errMessage, property ) => {
        
          if( err )
            return util.err( res, err );

          if( errMessage )
            return util.badRequest( errMessage );

          toGo.splice( toGo.indexOf( property ), 1 );

          if( toGo.length === 0 )
            return res.ok( 'parameters updated' );
        }

    Asset.findOne({ idName, owner: userId }).exec( ( err, asset ) => {
    
      if( err )
        return util.err( res, err );

      const id = asset.id;

      if( name ) {
        toGo.push( 'name' );
        util.updateName( id, name, callback );
      }
      if( newIdName ) {
        toGo.push( 'idName' );
        util.updateIdName( id, newIdName, userId, callback );
      }
      if( description ) {
        toGo.push( 'description' );
        util.updateDescription( id, description, callback );
      }
      if( path ) {
        toGo.push( 'path' );
        util.updatePath( id, path, callback );
      }
      if( keywords ) {
        toGo.push( 'keywords' );
        util.updateKeywords( id, keywords, callback );
      }
      if( isPrivate !== asset.isPrivate ) {
        toGo.push( 'isPrivate' );
        util.updatePrivate( id, isPrivate, callback );
      }
    })
  },

  request( req, res ) {

    const idName = req.param( 'assetid' )
        , userName = req.param( 'username' );
  
    User.findOne({ userName }).exec( ( err, user ) => {
    
      if( err )
        return util.err( res, err );

      const ownerId = user.id;

      Asset.findOne({ idName, owner: ownerId }).exec( ( err, asset ) => {
      
        if( err )
          return util.err( res, err );

        return res.redirect( asset.path );
      })
    })
  },

  delete( req, res ) {
  
    const userId = req.session.userId
        , idName = req.param( 'assetid' );

    Asset.destroy({ idName, owner: userId }).exec( ( err ) => {
    
      if( err )
        return util.err( res, err );

      return res.ok( 'asset deleted' );
    })
  }

};

