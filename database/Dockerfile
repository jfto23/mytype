FROM mysql:5.7

ENV MYSQL_DATABASE mytype_database
ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_PASSWORD password
ENV DATABASE_HOST app-db

EXPOSE 3306

COPY ./sql-scripts /docker-entrypoint-initdb.d/
