'use strict'

const config = require('../config.js')
const store = require('../store.js')

// set up AJAX request
const signUp = function (formData) {
  return $.ajax({
    // the config file in here has access to our URL
    url: config.apiUrl + '/sign-up',
    data: formData,
    method: 'POST'
  })
}
const signIn = function (formData) {
  return $.ajax({
    // the config file in here has access to our URL
    url: config.apiUrl + '/sign-in',
    data: formData,
    method: 'POST'
  })
}
const changePassword = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    data: formData,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const signOut = function (formData) {
  return $.ajax({
    // the config file in here has access to our URL
    url: config.apiUrl + '/sign-out',
    data: formData,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const createGame = function (data) {
  return $.ajax({
    url: config.apiUrl + '/games',
    data: data,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const updateGame = function (cellIndex, value, over) {
  return $.ajax({
    url: config.apiUrl + `/games/${store.game.id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    contentType: 'application/json',
    data:
    {
      'game': {
        'cell': {
          'index': cellIndex,
          'value': value
        },
        'over': over
      }
    }
  })
}// const getGame = function () {
// return $.ajax({
//  url: config.apiUrl + `/games/${store.id}`,
// method: 'SHOW',
// headers: {
//   Authorization: `Token token=${store.user.token}`
//  },
// contentType: 'application/json',
//   data: {//   'game': {
//   'id': 1,
//   'cells': ['','','','','','','','',''],
//   'over': true,
//   'player_x': {
//     'id': 1,
//     'email': 'and@and.com'
//   },
//   'player_o': null//   }//  }//  }
module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  createGame,
  updateGame
}
