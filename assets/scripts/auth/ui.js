'use strict'
const store = require('../store')

const successMessage = message => {
  $('#message').text(message)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
  // to clear out our forms
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
}

const signOutFailure = () => {
  failureMessage('Failed to sign out')
}
const createGameSuccessful = (responseData) => {
  store.game = responseData.game
  store.user.token = responseData.user
  console.log('store is', store)
  $('#message').text('New Game!')
  $('#message').removeClass()
  $('#message').addClass('success')
}
const createGameFailure = () => {
  failureMessage('You have not created a new game')
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
  createGameFailure
}
