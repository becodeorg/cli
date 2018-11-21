### Database: PostgreSQL

#### What is PostgreSQL?

PostgreSQL, often simply "Postgres", is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards-compliance. As a database server, its primary function is to store data, securely and supporting best practices, and retrieve it later, as requested by other software applications, be it those on the same computer or those running on another computer across a network (including the Internet). It can handle workloads ranging from small single-machine applications to large Internet-facing applications with many concurrent users. Recent versions also provide replication of the database itself for security and scalability.

PostgreSQL implements the majority of the SQL:2011 standard, is ACID-compliant and transactional (including most DDL statements) avoiding locking issues using multiversion concurrency control (MVCC), provides immunity to dirty reads and full serializability; handles complex SQL queries using many indexing methods that are not available in other databases; has updateable views and materialized views, triggers, foreign keys; supports functions and stored procedures, and other expandability, and has a large number of extensions written by third parties. In addition to the possibility of working with the major proprietary and open source databases, PostgreSQL supports migration from them, by its extensive standard SQL support and available migration tools. And if proprietary extensions had been used, by its extensibility that can emulate many through some built-in and third-party open source compatibility extensions, such as for Oracle.

* **Website:** [postgresql.org](https://www.postgresql.org/)
* **Documentation:** [postgresql.org/docs/](https://www.postgresql.org/docs/)

#### Container

* **Image used:** [library/postgres](https://hub.docker.com/_/postgres/)

##### Usage

**IMPORTANT:** the first startup of this container is long : the db server needs to be initialized.

**NOTE:** the container create a default `dev` database at startup - but you can create another within your code if you need it (or with pgAdmin)

###### Access from another container

You can access the database **from another container** with the following informations:

* **host:** `postgres`
* **port:** `5432`
* **user:** `dev`
* **pass:** `dev`

###### Access from your host

You can access the database  **from your host** with the following informations:

* **host:** `postgres`
* **port:** `5432`
* **user:** `dev`
* **pass:** `dev`

