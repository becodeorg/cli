# DEV env: docker-compose

This is a generated README by the [BeCode CLI tool](https://github.com/becodeorg/cli).

If you are completely new to Docker we recommend you to read the [Docker Survival Guide](https://github.com/becodeorg/cli/tree/develop/docs/docker-survival-guide).

## Install `docker` & `docker-compose`

### For macOS

Follow the procedure on [this page](https://docs.docker.com/docker-for-mac/install/)

### For Windows

> ⚠️ Check your Windows 10 version, do you use Pro or Home version ?

#### Pro, Enterprise or Education versions

Follow the procedure on [this page](https://docs.docker.com/docker-for-windows/install/)

#### Home version

To use docker on Windows Home, follow the procedure on [this page](https://docs.docker.com/docker-for-windows/install-windows-home/)

### For Linux

1. Follow the procedure on [this page](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
1. Run the following command to fix a possible right issue : `sudo usermod -a -G docker $USER`
1. Follow the procedure on [the page](https://docs.docker.com/compose/install/#install-compose)
1. Restart your computer

To test your installation, run the command `docker run hello-world`.

## Run `docker`

When starting your env for the first time, run the following command in yhour repo:

	docker-compose build
	
> **NOTE:** thus you don't need to run this command each time, it may be useful to *re*build your services when you change the configuration of your services.

Then, simply run the following command to get started:

    docker-compose up

The details for all your services is detailed bellow.

## Your services
