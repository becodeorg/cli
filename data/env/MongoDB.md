### Database: MongoDB

#### What is MongoDB?

MongoDB is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses (JSON)[https://en.wikipedia.org/wiki/JSON]-like documents with schemata. MongoDB is developed by MongoDB Inc., and is published under a combination of the Server Side Public License and the Apache License.

* **Website:** [mongodb.com](https://www.mongodb.com)
* **Documentation:** [docs.mongodb.com](https://docs.mongodb.com)

#### Container

* **Image used:** [library/mongo](https://hub.docker.com/_/mongo/)

##### Usage

The db files will be saved in `./db/mongo` for persistance. Simply delete the folder to delete your database.

**IMPORTANT:** the first startup of this container is long : the db server needs to be initialized.

**NOTE:** the container don't create a database at startup - create it within your code (or with MongoExpress)

###### Access from another container

You can access the database **from another container** with the following informations:

* **host:** `mongo`
* **port:** `27017`
* **user:** `dev`
* **pass:** `dev`

###### Access from your host

You can access the database  **from your host** with the following informations:

* **host:** `localhost`
* **port:** `27017`
* **user:** `dev`
* **pass:** `dev`

