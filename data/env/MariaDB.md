### Database: MariaDB

#### What is MariaDB?

MariaDB is a community-developed fork of MySQL intended to remain free under the GNU GPL.

* **Website:** [mariadb.org](https://mariadb.org)
* **Documentation:** [mariadb.org/learn](https://mariadb.org/learn/)

#### Container

* **Image used:** [library/mariadb](https://hub.docker.com/_/mariadb/)

##### Usage

> **NOTE:** from dev POV, using MariaDB is strictly the same as using MySQL.

The db files will be saved in `./db/mysql` for persistance. Simply delete the folder to delete your database.

**IMPORTANT:** the first startup of this container is long : the db server needs to be initialized.

**NOTE:** the container don't create a database at startup - create it within your code (or with phpMyAdmin)

###### Access from another container

You can access the database **from another container** with the following informations:

* **host:** `mysql`
* **port:** `3306`
* **user:** `root`
* **pass:** `root`

###### Access from your host

You can access the database  **from you host** with the following informations:

* **host:** `localhost`
* **port:** `3306`
* **user:** `root`
* **pass:** `root`

