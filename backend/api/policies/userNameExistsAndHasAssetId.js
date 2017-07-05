module.exports = ( req, res, next ) => {
  
  User.findOne({ userName: req.param( 'username') }).populate( 'assets' ).exec( ( err, user ) => {
    
    if( err )
      return res.serverError( 'internal error while finding a user' );

    if( !user )
      return res.badRequest( 'user does not exist' );

    for( let i = 0; i < user.assets.length; ++i )
      if( user.assets[ i ].idName === req.param( 'assetid' ) )
        return next();

    return res.badRequest( 'user does not have asset' );

  })
}
