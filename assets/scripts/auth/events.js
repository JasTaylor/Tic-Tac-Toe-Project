'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui.js')

const onSignUp = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signUp(formData)
    .then(ui.signUpSuccessful)
    .catch(ui.signUpFailure)
}

const onSignIn = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData)
    .then(ui.signInSuccessful)
    .catch(ui.signInFailure)
}

const onChangePassword = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.changePassword(formData)
    .then(ui.changePasswordSuccessful)
    .catch(ui.changePasswordFailure)
}

const onSignOut = event => {
  event.preventDefault()
  // event.target is the form!
  const form = event.target
  const formData = getFormFields(form)
  api.signOut(formData)
    .then(ui.signOutSuccessful)
    .catch(ui.signOutFailure)
}
const onCreateGame = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.createGame(formData)
    .then(ui.createGameSuccessful)
    .catch(ui.createGameFailure)
}

const gameBoard = ['', '', '', '', '', '', '', '', '']

const playerOne = 'X'
const playerTwo = 'O'

let turn = 'O'

const switchTurn = function () {
  if (turn === 'O') {
    turn = 'X'
  } else {
    turn = 'O'
  }
  return turn
}

const onClick = function (tileClick) {
  console.log('clicked!!')
  const form = event.target
  $(form).text(switchTurn())
}
const dontSwitch = function () {
  const form = event.target
  if ((form).text('X' || 'O')) {
    return dontSwitch
  } else {
    return console.log('stop!!!!!')
  }
}
// if ONE element has been clicked, it cant be changed
//  isVegetarian ? 'no meat for you' : 'eats meat'
// trying to have each data-id click have text inside
module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateGame,
  gameBoard,
  playerOne,
  playerTwo,
  turn,
  switchTurn,
  onClick,
  dontSwitch
}
