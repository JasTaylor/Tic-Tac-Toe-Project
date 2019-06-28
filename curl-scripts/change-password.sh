#!/bin/bash

curl "https://tic-tac-toe-wdi.herokuapp.com/change-password" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'

const gameBoard = {
  id: `${id}`,
  cells: ['', '', '', '', '', '', '', '', ''],
  over: false,
  player_x: {
    id: `${TOKEN}`

  }
}
echo
