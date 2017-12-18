# mail_users_db_server

## Description

A server that stores users info in database and provides it for testing [mail.ru]("https://mail.ru/") interface.

## API

| URL | Request method | Request body | Response body |
| --- | --- | --- | --- |
| /getuser | GET |  | {  "id": *number*, "email": *string*, "password": *string*  } |
| /freeuser | DELETE | { "id": *number* } | { "message": *string* } or { "error": *string* } |
| /freeall | DELETE |  | { "message": *string* } |

## Notice

User engagement timeout is **10 minutes**.

## How to run server
 1. [Install Docker](https://docs.docker.com/engine/installation/);
 2. `cd` to the project's directory and execute scripts below:
     - `sudo docker build -t "mail_users_db_server" ./` - build;
     - `sudo docker run -p 5000:5000 -d mail_users_db_server` - run.
