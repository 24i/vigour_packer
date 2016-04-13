#!/usr/bin/env node
'use strict'

let Config = require('vigour-config')
let Pack = require('../lib')
let argumentData = []
// 1st = Platform
// 2nd = EntryPoint folder
// 3rd = Output folder
process.argv.forEach(function (val, index, array) {
	if(index > 2) {
		argumentData.push(val)
	}
})

let config = new Config()
let pack = Pack()

console.log(argumentData)
pack.run(argumentData)
