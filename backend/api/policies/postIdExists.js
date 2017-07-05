module.exports = ( req, res, next ) => {

  const userId = req.session._id
      , idTitle = req.param( 'postid' );

  Post.findOne({ idTitle, owner: userId }).exec( ( err, post ) => {
  
    if( err )
      return res.serverError( 'issue finding the post' );

    if( !post )
      return res.badRequest( 'post not found' );

    return next();
  })
}
