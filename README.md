# BeCode: CLI

> ⚙️ CLI Utils at BeCode. Useful for everyone.

* * *

[![npm version](https://badge.fury.io/js/%40becode%2Fcli.svg)](https://badge.fury.io/js/%40becode%2Fcli)
[![License: MIT](https://img.shields.io/github/license/becodeorg/cli.svg)](https://github.com/becodeorg/cli/blob/develop/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/becodeorg/cli.svg)](https://github.com/becodeorg/cli/issues)

* * *

**BeCode CLI** is a command-line based util, with useful tools to automate some of your dev tasks at BeCode.

## About

*Junior* or *Coach*, introducing **BeCode CLI**: a small util tool, giving you some great commands without leaving your terminal.  
For now, this tool allows you to navigate to our different GitHub repositories, generate complete *docker dev environments* or generate `README.md` files according to BeCode standards.

But remember: **BeCode CLI** is *yours*. Feel free to [contribute](./CONTRIBUTING.md), add new features or [requests new ones](https://github.com/becodeorg/cli/issues).

### Use cases

#### Generating docker environment for your projects

The BeCode CLI can generate a `docker-compose.yml` file to handle the dev env for your project.  
Simply run `becode generate env` from *inside a git repository* and answer the questions.

You can either install predefined application environment (like **Wordpress**, **Drupal**, **Ghost**…), or build a custom environment, by choosing your main language, your database and tools.

The BeCode CLI will generate two files: a complete, *ready-to-use* `docker-compose.yml` file ; and a `docker-readme.md` file, containing all the information about docker (how to install and configure), and the containers of your app.

#### Generating complete `README.md` template files

The BeCode CLI can generate a `README.md` respecting our [internal guidelines](https://github.com/becodeorg/Central/tree/master/templates/readme).

Simply run `becode generate readme` from *inside a git repository* and answer the questions.

* * *

## Installation

You must have [**node.js**](https://nodejs.org/en/) installed on your machine.

Simply run the following command to install the **BeCode CLI**:

	npm install -g @becode/cli

## Usage

The command use this syntax:

    becode [command] [args...]

If you need help, use the `help` command:

    becode help

or

    becode help [command]
    
### 🤟 _Recommanded:_ use `npx`

While the command can be a bit longer, it's better to use `npx` instead of installing packages globally.

To do so, instead of using `becode` command, use `npx @becode/cli`:

	npx @becode/cli [command] [args...]

### Available commands

#### configure

    becode configure

Ask you some questions to setup the cli tool.  
Should be run once, possibly right after installing the cli tool.

#### open

    becode open [target] [...options]

Open the selected target in your default browser.

##### Available targets

- `central`: open the [Central](https://github.com/becodeorg/Central) repository
- `watch`: open the [Watch](https://github.com/becodeorg/The-Watch) repository
- `promo`: open the repository of your promo - you must have run the command `configure` once before
- `github`: open your GitHub profile (or, if you haven't configured your tool, the GitHub homepage)
- `my` or `mybecode`: open the **MyBeCode** platform

##### Available options

- `-c` `--choose` : Choose promo in a list instead of using the configured one

#### generate

    becode generate [target] [...options]

Use interactive process to generate useful files for your projects.

##### Available targets

- `readme`: generate a `README.md` file that conforms with the BeCode's conventions
- `ignore`: generate a common `.gitignore` file
- `env`: generate a **docker compose** env, after some questions

##### Available options

- `-o  <path>`, `--output <path>` : Generate target files at specified path (defaults to current git repo root) - *not supported for the `ignore` target*

## Contribute

Feel free to _hack_ the tool, suggest any modification and/or implement it by yourself and submit a _pull request_ !

The contribution guide is in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

### Any idea? Suggestions?

You don't want (or can't) help, but you have some ideas to improve BeCode CLI?  
Please, [create an issue](https://github.com/becodeorg/cli/issues) and tell us everything.

* * *

October 2018, [leny](https://leny.me)@[BeCode](https://becode.org).
Licensed under the [MIT License](./LICENSE).
