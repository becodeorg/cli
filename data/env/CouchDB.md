### Database: CouchDB

#### What is CouchDB?

Apache CouchDB™ lets you access your data where you need it by defining the Couch Replication Protocol that is implemented by a variety of projects and products that span every imaginable computing environment from globally distributed server-clusters, over mobile phones to web browsers.

* **Website:** [couchdb.apache.org](http://couchdb.apache.org)
* **Documentation:** [docs.couchdb.org](http://docs.couchdb.org)

#### Container

* **Image used:** [library/couchdb](https://hub.docker.com/_/couchdb/)

##### Usage

⚠️ **WARNING:** by default, CouchDB is disallowing [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), which is kinda boring when used within a front-end app. You can fix that by hand, but you can also use the following command, once, to fix it: `npx add-cors-to-couchdb http://dev:dev@localhost:5984 -u dev -p dev`

**NOTE:** the container don't create a database at startup - create it within your code (or using the [embedded admin, Fauxton](http://localhost:5984/_utils))

###### Access from another container

You can access the database **from another container** with the following informations:

* **host:** `couchdb`
* **port:** `5984`
* **user:** `dev`
* **pass:** `dev`

###### Access from your host

You can access the database **from your host** with the following informations:

* **host:** `localhost`
* **port:** `5984`
* **user:** `dev`
* **pass:** `dev`

You can also use the embedded admin, [Fauxton](http://couchdb.apache.org/fauxton-visual-guide/), using the following address: [localhost:5984/\_utils](http://localhost:5984/_utils)