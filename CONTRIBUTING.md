# BeCode: CLI - Contributing

## About

### You are a student/coach at BeCode?

You work with us and want to contribute/improve this tool!  
Thanks! Follow the guidelines on this file and don't hesitate to ask for help or indications if you're lost somewhere.  
Contact me on Ryver (**@leny**) and I will be happy to help you help me 🤓

### You are *not* a student/coach at BeCode?

I'm glad to welcome you here! If you don't know BeCode, I strongly invite you to go learn more about us on [our website, becode.org](https://becode.org).

Anyway, if you want to contribute and/or improve this tool, follow the guidelines and feel free to submit a Pull Request!

* * *

## How to contribute

Before anything, **fork this repository**, then **clone** it on your computer.  
You will work on your local environment.

### Setup you environment

You need to have [**node.js**](https://nodejs.org/en/) installed on your machine.

Then, simply run `npm install` to install the dependencies of the project.

Build the project for the first time using the `npm run build` command, then *link* your local copy of the tool with the `npm link` command.

> **NOTE:** you will probably need to re-run the `npm link` command sometimes, please refer to the [npm documentation](https://docs.npmjs.com/cli/link)

Now, you can dig around the code.

### Working on the project

#### Langage & libs

The project is coded with **javascript**, transpiled with **Babel**, and use **[commander](https://www.npmjs.com/package/commander)** to set the cli app, and **[enquirer](https://www.npmjs.com/package/enquirer)** for the prompt parts.

#### Standards & linting

The code use the **ES2018** standard, is *formatted* with **[Prettier](https://prettier.io)** and *linted* with **[ESLint](https://eslint.org)**.

Refer to the config files at the root of the repository for the applied rules.

You can run the linter & formatter with the `npm run lint` command.  
This command is automatically runned by **[husky](https://www.npmjs.com/package/husky)** with a *precommit git hook*.

#### Structure

The main *entry point* for the project is the `index.js` file in the `src` folder.

Each command has its own module(s) in the `src/commands` folder.

The data used by the commands are stored in the `data` folder, mainly as **json** files.

### Submitting your changes

When your work is ready to be submitted, create a **Pull Request** from your repository to the [becodeorg/cli](https://github.com/becodeorg/cli) repo, targetting the **develop** branch (or, more clever, targetting a custom *feature branch*).

Fill your Pull Request with your motivation, what your changes brings to the project, be precise.

I'll try to review your Pull Request *ASAP*, and merge it when it's ok/ready to.

* * *

Thanks again to contribute!