'use strict'
const store = require('../store')
const authEvents = require('./events.js')
const api = require('./api')

const gameOver = function () {
  console.log('this is gameOver function', store.game.cells)
  const cells = store.game.cells
  if ((cells[0] === 'X' && cells[1] === 'X' && cells[2] === 'X') ||
      (cells[3] === 'X' && cells[4] === 'X' && cells[5] === 'X') ||
      (cells[6] === 'X' && cells[7] === 'X' && cells[8] === 'X') ||
      (cells[0] === 'X' && cells[4] === 'X' && cells[8] === 'X') ||
      (cells[0] === 'X' && cells[3] === 'X' && cells[6] === 'X') ||
      (cells[1] === 'X' && cells[4] === 'X' && cells[7] === 'X') ||
      (cells[2] === 'X' && cells[4] === 'X' && cells[6] === 'X') ||
      (cells[2] === 'X' && cells[5] === 'X' && cells[8] === 'X')) {
    console.log('player one has won')
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
    console.log('player two has won')
    return true
  } else if (
    (cells[0] === ('O' || 'X')) && (cells[1] === ('O' || 'X')) &&
    (cells[2] === ('O' || 'X')) && (cells[3] === ('O' || 'X')) &&
    (cells[4] === ('O' || 'X')) && (cells[5] === ('O' || 'X')) &&
    (cells[6] === ('O' || 'X')) && (cells[7] === ('O' || 'X')) &&
    (cells[8] === ('O' || 'X'))) {
    console.log('Its a tie!')
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
  // to clear out our forms
  $('#changePassword').removeClass('hide')
  $('#sign-out').removeClass('hide')
  $('#game').removeClass('hide')
  $('[data-id]').removeClass('hide')
  $('#newgame-buttons').removeClass('hide')
  $('#sign-up').addClass('hide')
  $('#sign-in').addClass('hide')
  $('#getgame-buttons').removeClass('hide')
  $('form').trigger('reset')
}
const failureMessage = message => {
  $('#message').text(message)
  $('#message').removeClass('success')
  $('#message').addClass('failure')
  $('form').trigger('reset')
}

const signUpSuccessful = responseData => {
  successMessage('You have signed up succesfully, have fun!')
  store.user = responseData.user
}

const signUpFailure = () => {
  failureMessage('You have not signed up, please try again.')
}

const signInSuccessful = responseData => {
  console.log(responseData)
  successMessage('You have signed in, have fun!')
  // below lets us have the user sign in and TOKEN for API,
  // STORE LETS US ACCESS THE TOKEN IN ANY FILE
  store.user = responseData.user
}

const signInFailure = () => {
  failureMessage('You have not signed in, please try again.')
}
const changePasswordSuccessful = responseData => {
  successMessage('You have changed your password succesfully')
}

const changePasswordFailure = () => {
  failureMessage('Failed to change password')
}
const signOutSuccessful = responseData => {
  successMessage('You have signed out succesfully')
  $('form').trigger('reset')
}

const signOutFailure = () => {
  failureMessage('Failed to sign out')
}

const createGameSuccessful = (responseData) => {
  store.game = responseData.game
  store.over = false
  console.log('game created somehow')
  console.log(store)
  $('#message').text('New Game!')
  $('#message').addClass('success')
  $('.box').html('')
  $('#messageTwo').text('')
  $('form').trigger('reset')
}
const createGameFailure = () => {
  failureMessage('You have not created a new game')
}
const stopClick = function () {
  console.log('no more clicking')
}

const updateGameSuccessful = (responseData) => {
  store.game = responseData.game
  $('#message').text('Successfully updated game')
  console.log('responseData is:', responseData)
  if (gameOver()) {
    api.updateGame(null, null, true)
      .then(console.log)
      .catch(console.log)
  }
}

const updateGameFailure = () => {
  failureMessage('You have not created a new game')
}

const getGameSuccessful = (responseData) => {
  const game = responseData.games
  $('#messageFour').text(`you have played this many: ${game.length}`)
}
const getGameFailure = (responseData) => {
  const game = responseData.games
  $('#messageFour').text(`you have played this many: ${game.length}`)
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
