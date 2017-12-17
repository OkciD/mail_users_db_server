FROM ubuntu:16.04

RUN apt-get -y update

ENV PGVER 9.5
RUN apt-get install -y postgresql-$PGVER && apt-get clean all

USER postgres

RUN /etc/init.d/postgresql start &&\
    psql --command "CREATE USER mail_users_db_user WITH SUPERUSER PASSWORD 'mail.ru';" &&\
    createdb -E UTF8 -T template0 -O mail_users_db_user mail_users_db &&\
    /etc/init.d/postgresql stop

RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/$PGVER/main/pg_hba.conf

RUN echo "listen_addresses='*'" >> /etc/postgresql/$PGVER/main/postgresql.conf
RUN echo "synchronous_commit = off" >> /etc/postgresql/$PGVER/main/postgresql.conf


EXPOSE 5432
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

USER root

#RUN apt-get install -y nodejs=8.9.3 npm && apt-get clean all
RUN apt-get install -y curl && apt-get clean all
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs && apt-get clean all
RUN echo "node version: $(node -v)"
RUN echo "npm version: $(npm -v)"

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD service postgresql start && npm start