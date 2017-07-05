module.exports = ( req, res, next ) => {

  User.findOne({ userName: req.param( 'username' ) }).exec( ( err, user ) => {
    
    if( err )
      return res.serverError( 'internal error while finding a user' );

    if( user )
      return next();

    return res.badRequest( 'user not found' );
  })

}
