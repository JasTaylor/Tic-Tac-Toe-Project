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

let turn = 'O'

const switchTurn = function () {
  if (turn === 'O') {
    (turn = 'X')
  } else { turn = 'O' }
  return turn
}

const onClick = function (index, value) {
  console.log('clicked!!')
  const cell = $(event.target)
  const cellIndex = $(event.target).index()
  if (cell.text() === 'X' || cell.text() === 'O') {
    ui.stopClick()
    $('#messageTwo').text('Invalid Click')
  } else {
    (cell).text(switchTurn())
    $('#messageTwo').text('Next Players Turn')
    console.log('this is', cellIndex)
  }
}

const cells = ['', '', '', '', '', '', '', '', '']

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8]
]
// if each cell contains and X AND the cell index is
// equal to an array in
// the wins array, then it is a win

const gameOver = function () {
  if ((cells[0] === 'X' && cells[1] === 'X' && cells[2] === 'X') ||
      (cells[3] === 'X' && cells[4] === 'X' && cells[5] === 'X') ||
      (cells[6] === 'X' && cells[7] === 'X' && cells[8] === 'X') ||
      (cells[0] === 'X' && cells[4] === 'X' && cells[8] === 'X') ||
      (cells[0] === 'X' && cells[3] === 'X' && cells[6] === 'X') ||
      (cells[1] === 'X' && cells[4] === 'X' && cells[7] === 'X') ||
      (cells[2] === 'X' && cells[4] === 'X' && cells[6] === 'X') ||
      (cells[2] === 'X' && cells[5] === 'X' && cells[8] === 'X')) {
    console.log('player one has won')
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
  } else if (
    (cells[0] === ('O' || 'X')) && (cells[1] === ('O' || 'X')) &&
    (cells[2] === ('O' || 'X')) && (cells[3] === ('O' || 'X')) &&
    (cells[4] === ('O' || 'X')) && (cells[5] === ('O' || 'X')) &&
    (cells[6] === ('O' || 'X')) && (cells[7] === ('O' || 'X')) &&
    (cells[8] === ('O' || 'X'))) {
    console.log('Its a tie!')
  } else {
    console.log('Keep Playing')
  }
}

const onUpdateGame = (event) => {
  api.updateGame()
    .then(ui.onUpdateGameSuccessful)
    .catch(ui.onUpdateGameFailure)
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
  cells,
  turn,
  switchTurn,
  onClick,
  onUpdateGame,
  gameOver,
  win
}
