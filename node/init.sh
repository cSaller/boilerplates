#/bin/bash

mv .env.example .env
docker compose up -d
yarn
yarn db:update > /dev/null
yarn db:seed
