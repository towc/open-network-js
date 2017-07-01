module.exports = ( req, res, next ) => {
  
  if( req.param( 'username' ) || req.param( 'email' ) )
    return next();

  return res.badRequest( 'no username or email' );
}
