module.exports = ( req, res, next ) => {

  if( req.param( 'postid' ) )
    return next();

  return res.badRequest( 'no postid' );
}
