# Nestjs base

## Git
Run `yarn prepare` to setup husky (pre-commit)

## Setup database (Docker)
Requirements:
- docker, docker-compose

Config: please edit database/.env.database

Command:
- Start database: `yarn database:up`
- Stop database: `yarn database:down`

## Debug
Run project with command `yarn start:debug` and press `f5` key to debug

## Build docker image
Run `docker build -t nestjs-base .` to build docker imagse
