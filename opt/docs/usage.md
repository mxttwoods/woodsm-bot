---
nav:
  title: Usage
  description: 'Project Usage'
  order: 2
  category: 'Documentation'
---

<!-- markdownlint-disable MD025 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD030 -->

# Usage

Installation and Usage of the [discord-bot](/)

- [Source](https://github.com/mxttwoods/woodsm-bot)

Common NPM commands:
<code-block label="NPM" active>

```bash
# Installing the project:

npm install # install

# Building the project:

npm run build

# Running the project:

npm run start # start node

# Getting help:

node --help # node help

npm <command> -h # npm quick help on <command>

npm -l # display full npm usage info

npm help <term> # search npm for help on <term>

npm help npm # npm involved overview
```

</code-block>

## Scripts

Then, to `./bot/package.json` one will notice there are several more commands:

```json
{
  "name": "discord-bot",
  "version": "0.0.1",
  "main": "src/main.js",
  "scripts": {
    "start": "node .",
    "format": "standard --fix"
  },
  "dependencies": {
    "discord.js": "12.5.3",
    "dotenv": "8.2.0",
    "mongoose": "5.12.7",
    "node-fetch": "2.6.1"
  },
  "devDependencies": {
    "standard": "16.0.3"
  }
}
```
