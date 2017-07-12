module.exports = ( req, res, next ) => {

  const userId = req.session.userId
      , idName = req.param( 'assetid' );

  Asset.findOne({ idName, owner: userId }).exec( ( err, asset ) => {
  
    if( err )
      return res.serverError( 'error fetching the asset' );

    if( !asset )
      return res.badRequest( 'user does not have asset' );

    return next();
  })
}
