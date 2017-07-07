module.exports = ( req, res, next ) => {

  const id = req.session.userId;

  User.findOne({ id })
    .populate( 'appreciatedPosts' )
    .exec( ( err, user ) => {

      if( err )
        return res.serverError( 'internal error while finding logged in user' );

      User.findOne({ userName: req.param( 'username' ) }).exec( ( err, owner ) => {
        
        if( err )
          return res.serverError( 'internal error while finding post owner' );

        if( user.appreciatedPosts.find( post =>
          post.owner === owner.id &&
          post.idTitle === req.param( 'postid' ) ))

          return res.badRequest( 'user already appreciates post' );

        return next();

      })
    
    });
}
