/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    userName: {
      type: 'string',
      unique: true,
      required: true
    },
    name: {
      type: 'string',
      defaultsTo: 'Open Blogger'
    },
    description: {
      type: 'string',
      defaultsTo: 'I write and read :D'
    },
    profileAsset: {
      model: 'Asset'
    },

    posts: {
      collection: 'Post',
      via: 'owner'
    },
    seenPosts: {
      collection: 'Post',
      via: 'seenBy'
    },
    appreciatedPosts: {
      collection: 'Post',
      via: 'appreciatedBy'
    },

    follows: {
      collection: 'User',
      via: 'followedBy'
    },
    followedBy: {
      collection: 'User',
      via: 'follows'
    },

    assets: {
      collection: 'Asset',
      via: 'owner'
    },
    
    hash: {
      type: 'string'
    },
    lastLogin: {
      type: 'number'
    },
    lastLogout: {
      type: 'number'
    },
    onlineStatus: {
      type: 'string',
      isIn: [ 'online', 'offline', 'inactive' ],
      defaultsTo: 'offline'
    },
    privilegeStatus: {
      type: 'string',
      isIn: [ 'admin', 'moderator', 'user' ],
      defaultsTo: 'user'
    }
  },

};

