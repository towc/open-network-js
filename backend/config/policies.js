
module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // TODO switch to res.unauthorized

  UserController: {
    login: [ 'isNotAuthenticated', 'hasUserNameOrEmail', 'hasPassword' ],
    logout: [ 'isAuthenticated' ],
    delete: [ 'isAuthenticated' ],

    createCustom: [ 'hasUserName', 'hasPassword', 'hasEmail', 'userNameNotExists', 'emailNotExists' ],
    updateCustom: [ 'isAuthenticated' ],
    request: [ 'userNameExists' ],

    follow: [ 'isAuthenticated', 'userNameExists' ],

    socketCallIn: [ 'isAuthenticated' ],
    socketLogin: [ 'isAuthenticated' ],
    socketLogout: [ 'isAuthenticated' ]
  },

  PostController: {
    appreciate: [ 'isAuthenticated', 'userNameExistsAndHasPostId', 'userDoesNotAlreadyAppreciate' ],

    createCustom: [ 'isAuthenticated', 'hasPostName' ],
    updateCustom: [ 'isAuthenticated', 'hasPostId', 'postIdExists' ],
    request: [ 'userNameExistsAndHasPostId' ],
    delete: [ 'isAuthenticated', 'postIdExists' ]
  },

  AssetController: {
    createCustom: [ 'isAuthenticated', 'hasAssetName' ],
    updateCustom: [ 'isAuthenticated', 'hasAssetId' ],
    request: [ 'userNameExistsAndHasAssetId' ],
    delete: [ 'isAuthenticated' ]
  }

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
  // UserController: {
  //
  //   // We might mandate that requests come from a logged-in user for
  //   // most actions in this controller.
  //   '*': 'isLoggedIn',
  //
  //   // But we'll let anyone access the 'login' and 'signup' actions
  //   login: true,
  //   signup: true,
  //
  //   // And we'll only let admins delete users.
  //   destroy: 'isAdmin',
  //
  // },

};
