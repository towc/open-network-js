module.exports = ( req, res, next ) => {

  if( req.session.isAuthenticated )
    return next();

  return res.forbidden( 'not authenticated' );

}
