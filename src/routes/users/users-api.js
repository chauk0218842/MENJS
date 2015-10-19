'use strict';

export default {
  fetch: function (req, res) {
    res.send('Fetch users');
  },
  fetchById: function (req, res) {
    res.send('Fetch users by id');
  },
  deleteById: function (req, res) {
    res.send('Delete users by id');
  },
  create: function (req, res) {
    res.send('Create user');
  },
  updateById: function (req, res) {
    res.send('Update user by id');
  }
};
