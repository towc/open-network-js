module.exports = ( req, res, next ) => {

  const email = req.param( 'email' );

  User.findOne({ email }).exec( ( err, user ) => {
  
    if( err )
      return res.serverError( 'error finding user' );

    if( user )
      return res.badRequest( 'user already exists' );

    return next();

  })
}
