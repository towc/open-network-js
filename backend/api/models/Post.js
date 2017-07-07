/**
 * Post.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    idTitle: {
      type: 'string',
      required: true,
      unique: true
    },
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      defaultsTo: 'This is a post'
    },
    markdownContent: {
      type: 'string',
      defaultsTo: '# You can use markdown!'
    },

    owner: {
      model: 'User'
    },

    seenBy: {
      collection: 'User',
      via: 'seenPosts'
    },
    views: {
      type: 'number',
      defaultsTo: 0
    },
    appreciatedBy: {
      collection: 'User',
      via: 'appreciatedPosts'
    },
    appreciations: {
      type: 'number',
      defaultsTo: 0
    },
    popularity: {
      type: 'number',
      defaultsTo: 1
    },

    editedAt: {
      type: 'number'
    },

    keywords: {
      type: 'string',
      defaultsTo: ''
    },

    isPrivate: {
      type: 'boolean',
      defaultsTo: false
    }


  },

};

