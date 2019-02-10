### Static Files (with apache2)

#### What is apache2?

The Apache HTTP Server, colloquially called Apache, is a Web server application notable for playing a key role in the initial growth of the World Wide Web. Originally based on the NCSA HTTPd server, development of Apache began in early 1995 after work on the NCSA code stalled. Apache quickly overtook NCSA HTTPd as the dominant HTTP server, and has remained the most popular HTTP server in use since April 1996.

* **Website:** [httpd.apache.org](https://httpd.apache.org)
* **Documentation:** [apache2 docs](https://httpd.apache.org/docs/2.4/)

#### Container

* **Image used:** [library/httpd:latest](https://hub.docker.com/_/httpd/)

##### Usage

Place your static files in `./static` folder, access it with your browser at address [localhost](http://localhost).

