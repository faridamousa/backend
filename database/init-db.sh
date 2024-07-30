#!/bin/bash
set -e

# Connect to PostgreSQL and create the database
psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE DATABASE bookstore;
EOSQL
