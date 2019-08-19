'use strict'
const store = require('../store')
const authEvents = require('./events.js')
const api = require('./api')

const gameOver = function () {
  const cells = store.game.cells
  if ((cells[0] === 'X' && cells[1] === 'X' && cells[2] === 'X') ||
      (cells[3] === 'X' && cells[4] === 'X' && cells[5] === 'X') ||
      (cells[6] === 'X' && cells[7] === 'X' && cells[8] === 'X') ||
      (cells[0] === 'X' && cells[4] === 'X' && cells[8] === 'X') ||
      (cells[0] === 'X' && cells[3] === 'X' && cells[6] === 'X') ||
      (cells[1] === 'X' && cells[4] === 'X' && cells[7] === 'X') ||
      (cells[2] === 'X' && cells[4] === 'X' && cells[6] === 'X') ||
      (cells[2] === 'X' && cells[5] === 'X' && cells[8] === 'X')) {
    $('#messageTwo').text('player one has won')
    return true
  } else if (
    (cells[0] === 'O' && cells[1] === 'O' && cells[2] === 'O') ||
      (cells[3] === 'O' && cells[4] === 'O' && cells[5] === 'O') ||
      (cells[6] === 'O' && cells[7] === 'O' && cells[8] === 'O') ||
      (cells[0] === 'O' && cells[4] === 'O' && cells[8] === 'O') ||
      (cells[0] === 'O' && cells[3] === 'O' && cells[6] === 'O') ||
      (cells[1] === 'O' && cells[4] === 'O' && cells[7] === 'O') ||
      (cells[2] === 'O' && cells[4] === 'O' && cells[6] === 'O') ||
      (cells[2] === 'O' && cells[5] === 'O' && cells[8] === 'O')) {
    $('#messageTwo').text('player two has won')
    return true
  } else if (
    (cells[0] === ('O' || 'X')) && (cells[1] === ('O' || 'X')) &&
    (cells[2] === ('O' || 'X')) && (cells[3] === ('O' || 'X')) &&
    (cells[4] === ('O' || 'X')) && (cells[5] === ('O' || 'X')) &&
    (cells[6] === ('O' || 'X')) && (cells[7] === ('O' || 'X')) &&
    (cells[8] === ('O' || 'X'))) {
    $('#message').text('tie!')
    return true
  } else {
    return false
  }
}
const hideMessaging = function () {
  setTimeout(function () {
    $('#message').text('')
    $('#message').hide('')
  }, 3000
  )
}
const successMessage = message => {
  $('#message').text(message)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
  $('.cpModal').removeClass('hide')
  $('#sign-out').removeClass('hide')
  $('[data-id]').removeClass('hide')
  $('#newgame-buttons').removeClass('hide')
  $('#modalButton').addClass('hide')
  $('#getgame-buttons').removeClass('hide')
  $('form').trigger('reset')
  hideMessaging()
}

const failureMessage = message => {
  $('#message').text(message)
  $('#message').removeClass('success')
  $('#message').addClass('failure')
  hideMessaging()
}

const signUpSuccessful = responseData => {
  store.user = responseData.user
  $('#messageFive').text('You have signed up succesfully, please now sign in and have fun!')
}

const signUpFailure = () => {
  failureMessage('You have not signed up, please try again.')
}

const signInSuccessful = responseData => {
  store.user = responseData.user
  successMessage('You have signed in, have fun!')
  $('.myModal').modal('hide')
  $('#guest').addClass('hide')
  $('#cpModal').removeClass('hide')
}

const signInFailure = () => {
  failureMessage('You have not signed in, please try again.')
}
const changePasswordSuccessful = responseData => {
  $('#messageSix').text('You have changed your password succesfully')
  $('.cpModal').modal('hide')
  $('form').trigger('reset')
}
const changePasswordFailure = () => {
  $('#messageSix').text('Failed to change password')
}
const signOutSuccessful = responseData => {
  $('#message').text('You have signed out succesfully')
  $('#changePassword').addClass('hide')
  $('#sign-out').addClass('hide')
  $('[data-id]').addClass('hide')
  $('#newgame-buttons').addClass('hide')
  $('#getgame-buttons').addClass('hide')
  $('#messageTwo').addClass('hide')
  $('#messageThree').addClass('hide')
  $('#messageFour').addClass('hide')
  $('#sign-up').removeClass('hide')
  $('#sign-in').removeClass('hide')
  $('#modalButton').removeClass('hide')
  $('#guest').removeClass('hide')
  $('.cpModal').addClass('hide')
  $('form').trigger('reset')
}

const signOutFailure = () => {
  failureMessage('Failed to sign out')
}

const createGameSuccessful = (responseData) => {
  store.game = responseData.game
  store.over = false
  $('#message').text('New Game!')
  $('#message').addClass('success')
  $('.box').html('')
  $('#messageTwo').text('')
  $('#messageThree').text('')
  $('#game').removeClass('hide')
  $('form').trigger('reset')
}
const createGameFailure = () => {
  failureMessage('You have not created a new game')
}
const stopClick = function () {
  $('#messageThree').text('cell occupied!')
}

const updateGameSuccessful = (responseData) => {
  store.game = responseData.game
  if (gameOver()) {
    api.updateGame(null, null, true)
      .then()
      .catch()
  }
}

const updateGameFailure = () => {
  failureMessage('You have not created a new game')
}

const getGameSuccessful = (responseData) => {
  const game = responseData.games
  $('#messageFour').text(`you have played this many times: ${game.length}`)
}
const getGameFailure = (responseData) => {
  const game = responseData.games
  $('#messageFour').text(`you have played this many times: ${game.length}`)
}
module.exports = {
  signUpSuccessful,
  signUpFailure,
  signInSuccessful,
  signInFailure,
  changePasswordSuccessful,
  changePasswordFailure,
  signOutSuccessful,
  signOutFailure,
  createGameSuccessful,
  createGameFailure,
  stopClick,
  updateGameSuccessful,
  updateGameFailure,
  hideMessaging,
  authEvents,
  gameOver,
  api,
  getGameSuccessful,
  getGameFailure
}
