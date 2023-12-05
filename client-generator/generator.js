const swaggerTools = require('@apidevtools/swagger-parser');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fsPromises = require('fs').promises;
const fs = require('fs');
const axios = require('axios');


const args = process.argv.slice(2);
const envConfigName = args.length === 1 ? args[0] : 'local';
const envPath = `${__dirname}/config/${envConfigName}`;
const outputPath = `${__dirname}/generated`;

//For converting enums
//  const betterEnums = (swaggerFile, serviceName) => {
//     const api = 
//  }