#! /usr/bin/env node
const yargs = require('yargs');
const { execSync } = require('child_process');
//parse the command-line arguments

const {
  _: [name],
  path,
} = yargs.argv;

//construct the migration path
const migrationPath = `src/database/migrations/${name}`;

//run the typeorm command

execSync(`typeorm migration:create ${migrationPath}`, { stdio: 'inherit' });
