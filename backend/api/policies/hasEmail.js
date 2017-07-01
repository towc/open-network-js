module.exports = ( req, res, next ) => {

  if( req.param( 'email' ) )
    return next();

  return res.badRequest( 'no email' );

}
