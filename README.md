# BeCode: CLI

> ⚙️ CLI Utils at BeCode. Useful for everyone.

* * *

> **NOTE:** this is an heavy work in progress. Please be patient. Will worth the wait.

* * *

**BeCode CLI** is a command-line based util, with useful tools to automate some of your dev tasks at BeCode.

## About

*TODO*

## Installation

*TODO*

## Usage

The command use this syntax:

    becode [command] [args...]

If you need help, use the `help` command:

    becode help

or

    becode help [command]

### Available commands

#### configure

    becode configure

Ask you some questions to setup the cli tool.
Should be run once, possibly right after installing the cli tool.

#### open

    becode open [target]

Open the selected target in your default browser.

##### Available targets

- `central`: open the [Central](https://github.com/becodeorg/Central) repository
- `watch`: open the [Watch](https://github.com/becodeorg/The-Watch) repository
- `promo`: open the repository of your promo - you must have run the command `configure` once before

#### generate

    becode generate [target] [...options]

Use interactive process to generate useful files for your projects.

##### Available targets

- `readme`: generate a `README.md` file that conforms with the BeCode's conventions
- `ignore`: generate a common `.gitignore` file
- `file`: generate a code file with an appropriate header, using personnal informations from the `configure` command
- `docker-compose`: generate a **docker compose** env, after some questions

## TODO

- [x] tooling
- [x] structure
- [x] basic `open` command
- [x] `configure` command
- [x] `open` command for `repo` target
- [ ] `generate` command for `readme` target
- [ ] `generate` command for `ignore` target
- [ ] `generate` command for `file` target
- [ ] `generate` command for `docker-compose` target
- [ ] `help` command
- [ ] auto-completion
- [ ] check for update process

* * *

October 2018, [leny](https://leny.me)@[BeCode](https://becode.org).
Licensed under the [MIT License](./LICENSE).
