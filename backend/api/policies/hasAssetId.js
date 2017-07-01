module.exports = ( req, res, next ) => {
  
  if( req.param( 'assetid' ) )
    return next();

  return res.badRequest( 'no assetid' );
}
