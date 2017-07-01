/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const vuePaths = [ 
  '/',
  '/auth',
  '/user/:username',
  '/user/:username/post/:postname'
    ]
    , vueRoutes = vuePaths.reduce( ( obj, path ) => { obj[ path ] = 'Vue.serve'; return obj }, {} );

module.exports.routes = Object.assign( vueRoutes, {


  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'post /api/user/login': 'User.login',
  'get /api/user/logout': 'User.logout',
  'delete /api/user/': 'User.delete',

  'post /api/user/create': 'User.createCustom',
  'post /api/user/update': 'User.updateCustom',
  'get /api/user/request/:username': 'User.request',

  'get /api/user/status': 'User.status',

  'get /api/user/follow/:username': 'User.follow',
  'get /api/post/appreciate/:username/:postid': 'Post.appreciate',

  'post /api/post/create': 'Post.createCustom',
  'post /api/post/update': 'Post.updateCustom',
  'get /api/post/:username/:postid': 'Post.request',
  'delete /api/post/:postid': 'Post.delete',
  
  'post /api/asset/create': 'Asset.createCustom',
  'post /api/asset/update': 'Asset.updateCustom',
  'get /api/asset/:username/:assetid': 'Asset.request',
  'get /asset/:username/:assetid': 'Asset.request',
  'delete /asset/:assetid': 'Asset.delete',

  'get /socket/call-in/:token': 'User.socketCallIn',
  'get /socket/login': 'User.socketLogin',
  'get /socket/logout': 'User.socketLogout'


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

});
