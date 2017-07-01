module.exports = ( req, res, next ) => {
  
  if( req.param( 'assetname' ) )
    return next();

  return res.badRequest( 'no assetname' );
}
