#/bin/bash

read -p "What's the project name? " PROJECT_NAME

mkdir -p $PROJECT_NAME
git clone git@github.com:cSaller/boilerplates.git
mv cSaller/boilerplates/node ./$PROJECT_NAME
rm -rf boilerplates

cd $PROJECT_NAME
mv .env.example .env
docker compose up -d
yarn
yarn db:update
yarn db:seed

yarn dev
