#!/usr/bin/env node
'use strict'

let Config = require('vigour-config')
let Pack = require('../lib')

let config = new Config()
let pack = Pack()
pack.run()
