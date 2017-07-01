module.exports = ( req, res, next ) => {
  
  if( req.param( 'postname' ) )
    return next();

  return res.badRequest( 'no postname' );
}
