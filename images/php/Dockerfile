FROM php:apache

RUN apt-get update && apt-get install -y libxml2-dev libpq-dev && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-install mysqli pdo_mysql pdo_pgsql pgsql session soap
