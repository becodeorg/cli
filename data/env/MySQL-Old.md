### Service - Database: MySQL

#### What is MySQL?

MySQL is the world's most popular open source database. With its proven performance, reliability and ease-of-use, MySQL has become the leading database choice for web-based applications, covering the entire range from personal projects and websites, via e-commerce and information services, all the way to high profile web properties including Facebook, Twitter, YouTube, Yahoo! and many more.

* **Website:** [mysql.com](https://www.mysql.com)
* **Documentation:** [dev.mysql.com/doc/](https://dev.mysql.com/doc/)

* * *

#### Container

* **Image used:** [library/mysql:5](https://hub.docker.com/_/mysql/)

##### Usage

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

