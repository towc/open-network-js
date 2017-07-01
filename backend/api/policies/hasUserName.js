module.exports = ( req, res, next ) => {

  if( req.param( 'username' ) )
    return next();

  return res.badRequest( 'no username' );

}
