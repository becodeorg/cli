# Docker Survival Guide

1. [Introduction](#Introduction)
1. [The big picture about Docker](#the-big-picture-about-docker)
1. [And now let's use docker-compose](#and-now-lets-use-docker-compose)
1. [Just gimme the damn commands!](#just-gimme-the-damn-commands)

## Introduction

[Docker](https://www.docker.com/) has now become an unavoidable tool in many development environments as well as in modern server hosting.

There are very good reasons to this. Well used it can greatly simplify deployment of multiple servers both for development and production.

Unfortunately it's not the easiest tool to master, far from it. Here is a non-exhaustive list of the skills you would need to fully master Docker:

* Very good knowledge of Linux **command line**.
* Extensive experience with Linux **processes and servers**.
* Experience with **application deployment automation**.
* Good knowledge of **Docker itself** but also **with the various tools used around it** (like docker-compose or Kubernetes).

The problem is that knowing everything will probably take your multiple years of learning and multiple big projects to gather sufficient experience. And still you will have to start using Docker right now for your day-to-day development environment.

So this guide's purpose is to teach you what you need to know in order to start using Docker as soon as possible. You won't know *everything* but you should know just enough to use it for some useful purpose.

## The big picture about Docker

### It's all about containers

Docker's purpose is all about running what we call **containers**.

Do you know what is a virtual machine ? Did you run one on your PC before ? OK, a container is *a little bit* like a virtual machine, with some differences.

A virtual machine will create a whole environment mimicking a real computer and then let a complete operating system inside the virtual machine run *believing* it is running on a real computer. A container will run *only one program* inside a minimal virtual environment. The real operating system is still your normal one. In fact, when running a container Docker will only mimic a few components of a real computer:

* The filesystem
* The network
* ... and not much more in fact

The result is that containers are *much faster to run* (a container can start in less than a second) and are *much more ressource efficient* (they don't consume more memory than the contained program needs) than virtual machines.

Note that containers are a specific feature of the **Linux Kernel**. There are efforts to offer similar features on Windows and Mac but it's not super advanced right now compared to what we can do actually on Linux. So when we're speaking about Docker we are mostly speaking about **Linux**.

**Pro tip**: Now that you know the difference between a container and a virtual machine never say to a Docker expert that it's running virtual machines. He might spit on your face without warnings.

### Program and process, image and container

Do you know the difference between a **program** and a **process**?

It's completely unrelated to Docker and it's just a question of naming: a *program* is a bunch of code that resides somewhere on your filesystem. It's not run by your processor, it's just inert, doing nothing. A *process* is the copy of your program in the RAM of your computer that is actually running. You can of course have multiple processes coming from the same program at the same time. You just have to launch it multiple times.

If you want to see which processes are currently running on your Linux system you can try this command:

```bash
top
```

Now that this differenciation is established, it's easy to speak about the terms **image** and **container** in the context of Docker. An *image* is like a program: it's a bunch of stuff that are on your filesystem doing nothing. A *container* is like a process: it's a copy of an image that is actually running. And just like with processes you can have as much containers as you want coming from the same image. You just have to run them multiple times.

### Where to find Docker images ?

OK, if I want to start a container I need an image. But where the hell can I find one ?

Well, you *could* create your own image with what we call a *[Dockerfile](https://docs.docker.com/engine/reference/builder/)*. That's basically a script explaining how to create a Docker image, most of the time starting from another existing image. But creating Dockerfiles is a little bit complex and is not 100% necessary for someone that just want to use Docker to launch a few servers.

Instead what almost everyone does is to use [Docker Hub](https://hub.docker.com/search/?type=image&image_filter=official) to download existing Docker images. Want a PostgreSQL image ready to run ? [There's one](https://hub.docker.com/_/postgres). Want an environment to run your Node.js application ? [There's one too](https://hub.docker.com/_/node).

**Docker Hub** and its ready-to-use images are an important part of what makes Docker a useful tool. Due to this using Docker mostly relies around using existing work made by other people to avoid loosing time yourself.

### Some practice

#### Installation on Ubuntu 18.04

To install docker type this command:

```bash
sudo apt install docker.io docker-compose
```

Here we also install `docker-compose` which is an important tool we'll use later.

But that's not finished yet. Currently Docker can only be run using `sudo`. This is both boring and error prone. We'll add some configuration to allow your user to use Docker directly:

```bash
sudo usermod -aG docker $USER
```

Then restart your computer. (Yeah, it's boring as hell but it's the simpler way.)

#### Example run

Type this:

```bash
docker run --rm hello-world
```

In order this command will:

* Check in your local Docker installation to see if it contains an image named `hello-world`.
* Due to the fact you don't have that image it will look at *Docker Hub* to download that image.
* Then it will create a *container* from the `hello-world` *image* and run it.
* After running that container (that only displays a message) it will remove it due to the usage of the `--rm` command line option. (The default behavior of Docker is to retain all containers even when they have finished their task.)

#### Second example: a command line interpreter

Type this:

```bash
docker run --rm -t -i alpine sh
```

Here we use an image named `alpine` and we ask it to launch a command named `sh`. We also specify additionnal arguments which are `-t ` and `-i` to explain to Docker that we want to launch that command in interactive mode.

The result is that we now have a command line interpreter *inside a Docker container*. You can try commands like `ls` and `cd`. You won't find your usual files and won't have access to the same commands because your only have access to the filesystem of the container.

When you're done playing you can exit dans command line interpreter by typing `exit`.

## And now let's use docker-compose

OK, you now have the possibility to run commands with Docker. But it's not particularly easy or intuitive and it's easy to assume you don't really see how it could be helpful.

That's because we usually don't use Docker directly. Most use cases involve using and automation tool to orchestrate its usage. The most used one for development purposes is named `docker-compose`.

### Sample usage

Create a new folder, then a file named `docker-compose.yml` in it and copy-paste the following content:

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
    - "8080:80"
```

Finally type the following command in that folder:

```bash
docker-compose up
```

You'll see that docker will download an image then will launch something. Using your web browser go to the website `http://localhost:8080` and you will see a welcome message from nginx.

What we did here was to use reference an image containing the [nginx](https://www.nginx.com/) web server (a well-known web server), launched it as a container and redirected the local `8080` port to have access to it.

See how easy it was? We just had to copy-paste some configuration and use one command.

Now, **with another command line interpreter**, type this command:

```bash
docker ps -a
```

You will see something like this:

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
2df6feefb5b0        nginx               "nginx -g 'daemon of…"   16 hours ago        Up 5 seconds        0.0.0.0:8080->80/tcp   dockersamples_web_1
```

The last command gives you a list of the current containers on your machine. As you can see there is one container running nginx.

To stop that container go back to the terminal where you launched `docker-compose up` and hit `Ctrl C`.

### How to read a docker-compose.yml

OK, we *could* just copy-paste some pre-made configuration here. In fact we will frequently do that as a lot of projects, notably on Docker Hub, give sample `docker-compose.yml` configurations.  But just copy-pasting without understanding anything will inevitably pose problems on the long run. So, even if we *can't* teach you every aspect of a `docker-compose.yml` file (there is [the official documentation](https://docs.docker.com/compose/overview/) for that) we can show you some interesting tricks.

#### Declaring a service

A service can simply be declared by putting some key with an artitrary name under `services`:

```yaml
version: '3'
services:
  web:
    image: nginx
  db:
    image: postgres
```

Here we declare two services. One is named `web` (it's using the `nginx` image) and the other `db` (using the `postgres` image). The only requirement for a service is to specify the image it will be using.

#### Setting port redirection

When a container is launched it exists in a virtual environment (virtual filesystem and virtual network stack) and is basically unreachable (except by other containers). To open ports on your machine we use the `ports` key:

```yaml
version: '3'
services:
  web:
    image: postgres
    ports:
    - "5432:5432"
```

We redirect the port `5432` inside the container to the port `5432` on the local machine. We know that's an interesting port to forward for PostgreSQL because its specified in its documentation that `5432` is its default port. Now we could connect to PostgreSQL with any compatible client using `localhost:5432`.

#### Setting env vars

Environment variables (env vars for short) are a type of variables that are passed implicitely to all programs. This is not new stuff, they exist since at least 40 years and work exactly the same on all operating systems (including Windows). Every programming language has some functions to access them. Some program may prefer to use more of less complex configuration files or other means to store their configuration but these are not super practical to use with Docker.

So, due to their general availability, env vars are, by convention, the go-to solution to configure programs inside containers. They can be configured by service using the `environment` key:

```yaml
version: '3'
services:
  db:
    image: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: thisisapassword
      MYSQL_DATABASE: mydb
      MYSQL_USER: myuser
      MYSQL_PASSWORD: thisisanotherpassword
    ports:
    - "3306:3306"
```

Here we pass some env vars to a MariaDB instance (MariaDB is a fork of the MySQL project). We give it some configuration like the root password, a default database it should create, a user and that user's password. We know we can give those parameters because they are documented in [the mariadb image on Docker Hub](https://hub.docker.com/_/mariadb).

#### Volumes

As we said before when you launch a container it is initialized with a virtual file system. When the container is removed everything in that filesystem is erased. The files inside it are called *transient*, they are not meant to be persisted. This is a design decision that is completely assumed by Docker as it allows to always start from a fresh new filesystem each time we launch a container.

Of course this behavior will cause problems in cases like running a database due to the fact databases are precisely meant to store data on the long term. To solve that issue Docker proposes **volumes**. Their goal is to allow a small piece of the virtual file system inside a Docker container to be persisted even if we remove the container.

There are 3 types of volumes:

##### Unnamed volumes

These are volumes declared implicitely by Docker when launching a container from certain images. These images contain a specific configuration to tell to Docker they need some part of their filesystem to be a volume. Example with mariadb:

```yaml
version: '3'
services:
  db:
    image: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: thisisapassword
      MYSQL_DATABASE: mydb
      MYSQL_USER: myuser
      MYSQL_PASSWORD: thisisanotherpassword
```

When launching this docker-compose with `docker-compose up` it will implicitely create a volume because the `mariadb` image tells him to. We can see that volume using the following command:

```bash
docker volume ls
```

It will display something like this:

```
DRIVER              VOLUME NAME
local               66c3d1fe30c355807175addf123a03d3cd0d4987396d515ef325185f0bc31185
```

##### Named volumes

As we've seen volumes can be created automatically. But when they do so they will have a random name which is quite hard to use. To solve that it is a good practice to name your volumes this way:

```yaml
version: '3'
services:
  db:
    image: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: thisisapassword
      MYSQL_DATABASE: mydb
      MYSQL_USER: myuser
      MYSQL_PASSWORD: thisisanotherpassword
    volumes:
      - saveddb:/var/lib/mysql
      
volumes:
  saveddb:
```

When we execute `docker volume ls` it will give use this result:

```
DRIVER              VOLUME NAME
local               dockersamples_saveddb
```

See? Much clearer isn't it?

##### Bind mounts

The last possibility is to just redirect some part of the virtual file system inside a container to a concrete folder on your machine's filesystem. This is called a bind mount:

```yaml
version: '3'
services:
  db:
    image: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: thisisapassword
      MYSQL_DATABASE: mydb
      MYSQL_USER: myuser
      MYSQL_PASSWORD: thisisanotherpassword
    volumes:
      - ./saveddb:/var/lib/mysql
```

Now you can go take a look at the `./saveddb` and see it contains all the files related to your MariaDB database.

**Beware**: when you use Docker to create bind mounts it will usually create them with the root user and your current user can not modify them as you want. In the above example you will not be able to remove the `./saveddb` folder normally. You will have to use `sudo rm -r ./saveddb`.

#### Network links

This feature is not something we will explicitely write in a `docker-compose.yml`. It's just a very useful feature that is implicitely created by docker-compose to ease our lives.

We can now create a lot of services inside a docker-compose file but what happens when we want them to communicate ? (Which is the case like 90% of the time by the way.) When a container is launched it is initialized with a random IP address so it's not so easy to get that IP to make them communicate. To help you with that docker-compose creates some kind of a small DNS server for its containers to get to know each other. Example:

```yaml
version: '3'
services:
  db:
    image: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: thisisapassword
      MYSQL_DATABASE: mydb
      MYSQL_USER: myuser
      MYSQL_PASSWORD: thisisanotherpassword
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    depends_on: 
      - db
    ports:
      - 8000:80
    environment:
      PMA_HOST: db
```

Here we re-use the MariaDB configuration and try to add a PHPMyAdmin (some useful tool to work with MariaDB). But PHPMyAdmin is useless if it doesn't know how to communicate with a database. So we add a key to its configuration named `PMA_HOST` to indicate which server it should contact and give it the value `db`, the name of our service containing a MariaDB instance. Due to this one line of configuration PHPMyAdmin can communicate with MariaDB.

*Note*: as you can see we also used a special configuration key named `depends_on`. This is only to tell Docker it should not try to launch the `phpmyadmin` service before it has finished the setup of the `db` service. This is important for PHPMyAdmin because it tries to contact its database as soon as it launch and crashes if it can't find it. If we didn't added the `depends_on` key this service would crash randomly on startup.

## Just gimme the damn commands!

OK, OK, enough with the boring theory. If you just want commands to do stuff here they are:

### Starting and stopping

#### Starting in the foreground

```bash
docker-compose up
```

It will launch all your services and you will see the logs of each of them.

Hit `Ctrl C` when you when to kill everything.

#### Starting in the background

```bash
docker-compose up -d
```

You won't see any logs this way and you will have to remember to kill your services.

#### Stopping all services

```bash
docker-compose down
```

It will stop and remove all containers.

### Gathering information

#### See all the services of a docker-compose file

```bash
docker-compose ps
```

#### See all the containers on the machine

```bash
docker ps -a
```

The `-a` parameter is useful to see even stopped containers.

#### See the logs of the services in a docker-compose file

```bash
docker-compose logs
```

#### See the images currently stored on the machine

```bash
docker images
```

#### See all volumes on the machine

```bash
docker volume ls
```

### Cleaning stuff

#### Stopping all containers

```bash
docker stop $(docker ps -a -q)
```

#### Removing all stopped containers on the machine

```bash
docker system prune
```

It will remove:

- all stopped containers
- all networks not used by at least one container
- all dangling images
- all build cache

#### Removing all images

```bash
docker rmi $(docker images -q)
```

It will fail if some images are currently in use by a container.

#### Removing all unused volumes

```bash
docker volume prune
```
