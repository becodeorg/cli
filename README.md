# BeCode: CLI

> ⚙️ CLI Utils at BeCode. Useful for everyone.

* * *

[![npm version](https://badge.fury.io/js/%40becode%2Fcli.svg)](https://badge.fury.io/js/%40becode%2Fcli)
[![License: MIT](https://img.shields.io/github/license/becodeorg/cli.svg)](https://github.com/becodeorg/cli/blob/develop/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/becodeorg/cli.svg)](https://github.com/becodeorg/cli/issues)

* * *

**BeCode CLI** is a command-line based util, with useful tools to automate some of your dev tasks at BeCode.

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

* * *

October 2018, [leny](https://leny.me)@[BeCode](https://becode.org).
Licensed under the [MIT License](./LICENSE).
