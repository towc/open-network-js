module.exports = ( req, res, next ) => {
  
  if( req.param( 'assetpath' ) )
    return next();

  return res.badRequest( 'no assetpath' );
}
