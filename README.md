# mail_users_db_server

## Description
A server that stores users info in database and provides it for testing [mail.ru](https://mail.ru/) interface.

## API

| URL | Request method | Request body | Response body |
| --- | --- | --- | --- |
| /getuser | GET |  | {  "id": *number*, "email": *string*, "password": *string*  } |
| /freeuser | DELETE | { "id": *number* } | { "message": *string* } or { "error": *string* } |
| /freeall | DELETE |  | { "message": *string* } |

## Run server
Since this application is dockerized, you need to execute the scripts below:
 - `sudo docker build -t "mail_users_db_server" ./` - build
 - `sudo docker run -p 5000:5000 -d mail_users_db_server` - run
