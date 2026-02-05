#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, 'package.json');

fs.readFile(packageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading package.json:', err);
    process.exit(1);
  }

  try {
    const packageJson = JSON.parse(data);
    const version = packageJson.version;

    if (!version) {
      console.error('No version found in package.json');
      process.exit(1);
    }

    // Version format to production only "a.b.c". 
    // No valid others versions "a.b.c"
    const versionRcRegex = /^\d+\.\d+\.\d+$/;

    if (!versionRcRegex.test(version)) {
      console.error(`Invalid version format in package.json: ${version}, Version format to production only format: "a.b.c".`);
      process.exit(1);
    }

    console.log('Version format is valid:', version);
  } catch (parseError) {
    console.error('Error parsing package.json:', parseError);
    process.exit(1);
  }
});
