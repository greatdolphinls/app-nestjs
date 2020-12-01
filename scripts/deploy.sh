#!/bin/sh
if [ ${1} == 'Heroku' ]; then
curl -X PATCH https://api.heroku.com/apps/${2}/formation -d '{ "updates": [ { "type": "web", "docker_image": "'$(cat imageid.txt)'" } ] }' -H "Content-Type: application/json" -H "Accept: application/vnd.heroku+json; version=3.docker-releases" -H "Authorization: Bearer ${3}"
fi
