/**
 * Asset.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    owner: {
      model: 'User'
    },
    name: {
      type: 'string',
      required: true
    },
    idName: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      defaultsTo: 'asset to be used in a post'
    },
    path: {
      type: 'string',
      required: true
    },
  },

};

