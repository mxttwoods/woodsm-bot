---
title: Project
description: 'Project Usage'
position: 2
category: 'Documentation'
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD030 -->

Installation and Usage of the [WoodsM-Bot](/)

- [Source](https://github.com/mxttwoods/woodsm-bot)
- [Docker Image](https://hub.docker.com/repository/docker/mtwoods/woodsm-bot)

## Commands

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

Then, to `./woodsm/package.json` one will notice there are several more commands:

```json
{
  "name": "woodsm",
  "version": "1.1.0",
  "scripts": {
    "start": "node src/main.js",
    "format": "cd .. && npx prettier --write ."
  },
  "dependencies": {
    "discord.js": "12.5.1",
    "dotenv": "8.2.0",
    "mongoose": "5.11.16",
    "node-fetch": "2.6.1"
  }
}
```
