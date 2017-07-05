module.exports = ( req, res, next ) => {
  
  User.findOne({ userName: req.param( 'username') }).populate( 'posts' ).exec( ( err, user ) => {
    
    if( err )
      return res.serverError( 'internal error while finding a user' );

    if( !user )
      return res.badRequest( 'user does not exist' );

    for( let i = 0; i < user.posts.length; ++i )
      if( user.posts[ i ].idTitle === req.param( 'postid' ) )
        return next();

    return res.badRequest( 'user does not have post' );

  })
}
