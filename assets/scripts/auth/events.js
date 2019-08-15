'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui.js')
const store = require('../store.js')

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
// const onGuestSignIn = event => {
//   event.preventDefault()
//   const guest = {
//     'credentials': {
//       'email': 'guestuser@gmail.com',
//       'password': 'guest'
//     }
//   }
//   api.signIn(guest)
// }

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
    .then(turn = 'X')
    .catch(ui.createGameFailure)
}

let turn = 'X'
const switchTurn = function () {
  if (turn === 'O') {
    (turn = 'X')
  } else { turn = 'O' }
}

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
    $('#messageThree').text('')
    store.game.over = true
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
    $('#messageThree').text('')
    store.game.over = true
  } if (
    (cells[0] !== ('')) && (cells[1] !== ('')) &&
    (cells[2] !== ('')) && (cells[3] !== ('')) &&
    (cells[4] !== ('')) && (cells[5] !== ('')) &&
    (cells[6] !== ('')) && (cells[7] !== ('')) &&
    (cells[8] !== (''))) {
    $('#messageFour').text('its a tie!')
    $('#messageThree').text('')
    store.game.over = true
  } else {
    return false
  }
}
const onClick = function () {
  const cell = $(event.target)
  const cellIndex = $(event.target).index()
  if (cell.text() === '') {
    if (!store.game.over) {
      const gameIsOver = gameOver()
      api.updateGame(cellIndex, turn, gameIsOver)
        .then(function (data) {
          cell.text(turn)
          ui.updateGameSuccessful(data)
          switchTurn()
          $('#messageThree').text(`${turn} - its your move`)
          gameOver()
        })
        .catch(ui.updateGameFailure)
    }
  } else if (cell.text() === 'X' || cell.text() === 'O') {
    ui.stopClick()
    $('#messageTwo').text('Invalid Click')
  }
}

const onGetGame = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.getGame(formData)
    .then(ui.getGameSuccessful)
    .catch(ui.getGameFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateGame,
  gameOver,
  onClick,
  onGetGame
  // onGuestSignIn
}
// things for tomorrow
// create a way to update cells array with X or O
// link gameOver fcn
// have new game always start with X
// change pass isnt working
// figure out the GET method for stored games
// README
// deploy
