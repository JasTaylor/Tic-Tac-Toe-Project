#!/bin/bash
curl "https://tic-tac-toe-wdi.herokuapp.com/games" \
  --include \
  --request POST \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{''}'

echo
#! DATA="x" sh curl-scripts/createGame.sh
