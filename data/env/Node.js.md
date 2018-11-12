### Service - Langage: Node.js

#### What is Node.js?

Node.js is a software platform for scalable server-side and networking applications. Node.js applications are written in JavaScript and can be run within the Node.js runtime on Mac OS X, Windows, and Linux without changes.

Node.js applications are designed to maximize throughput and efficiency, using non-blocking I/O and asynchronous events. Node.js applications run single-threaded, although Node.js uses multiple threads for file and network events. Node.js is commonly used for real-time applications due to its asynchronous nature.

Node.js internally uses the Google V8 JavaScript engine to execute code; a large percentage of the basic modules are written in JavaScript. Node.js contains a built-in, asynchronous I/O library for file, socket, and HTTP communication. The HTTP and socket support allows Node.js to act as a web server without additional software such as Apache.

* **Website:** [nodejs.org](https://nodejs.org)
* **Documentation:** [nodejs.org/en/docs/](https://nodejs.org/en/docs/)

* * *

#### Container

* **Image used:** [becodeorg/node](https://hub.docker.com/r/becodeorg/node/) (derived from [library/node](https://hub.docker.com/_/node/))

##### Usage

Place your JS files in `./bin` folder, access it your browser at address [localhost](http://localhost).

The container use [nodemon](https://github.com/remy/nodemon) to watch and reload your app on changes.  
You can change the `nodemon` command within your **docker-compose.yml** file according your needs.

**IMPORTANT:** your entry point **must** be defined in your **package.json** `scripts.start` property, and your app's server **must** listen the `12345` port.

**NOTE:** the container expose the debugger on port `9229` to use with [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/)

