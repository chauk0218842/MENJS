'use strict';

export default {
  fetch: function (req, res) {
    res.send('Fetch posts');
  },
  fetchById: function (req, res) {
    res.send('Fetch posts by id');
  },
  deleteById: function (req, res) {
    res.send('Delete posts by id');
  },
  create: function (req, res) {
    res.send('Create post');
  },
  updateById: function (req, res) {
    res.send('Update post by id');
  }
};
