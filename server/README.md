# Server

## Requirements

* [Node.js v >= 9.7.1](https://nodejs.org/en/)
* [PostgreSQL v 9.6](https://www.postgresql.org/download/)

## Installation

1. Create `.env` file in the root directory with the following entries:
  * PORT=3001
  * PGHOST=`PostgreSQL server host`
  * PGPORT=`PostgreSQL server port`
  * PGUSER=`PostgreSQL user`
  * PGPASSWORD=`PostgreSQL password`
  * PGDATABASE=`Name of database`
2. Run `npm install` from the root directory.
3. Run `npm start` from the root directiory.
4. Enjoy :)