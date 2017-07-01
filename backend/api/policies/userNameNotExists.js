module.exports = ( req, res, next ) => {

  const userName = req.param( 'username' );

  User.findOne({ userName }).exec( ( err, user ) => {
  
    if( err )
      return res.serverError( 'error finding user' );

    if( user )
      return res.forbidden( 'user already exists' );

    return next();

  })
}
