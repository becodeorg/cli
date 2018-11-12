# DEV env: docker-compose

This is a generated README by the [BeCode CLI tool](https://github.com/becodeorg/cli).

## Install `docker` & `docker-compose`

### For macOS

Follow the procedure on [this page](https://docs.docker.com/docker-for-mac/install/)

### For Windows

Follow the procedure on [this page](https://docs.docker.com/docker-for-windows/install/)

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