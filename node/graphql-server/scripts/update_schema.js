#!/usr/bin/env node

const fs = require('fs');
const scheme = require("../server/graphql/types/");

fs.writeFileSync('schema.graphql', scheme);
