module.exports =  ( req, res, next ) => {

  if( req.param( 'password' ) )
    return next();

  return res.badRequest( 'no password' );
}
