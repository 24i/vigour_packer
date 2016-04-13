#!/usr/bin/env node
'use strict'

let Config = require('vigour-config')
let path = require('path')
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


let Platform = argumentData[0]


// let defaultOutputPath = path.join(process.cwd(), 'packedFake')
let data = {
	packer: {
    "chromecast" : {
      "receiver.js": "platform/chromecast/receiver.js"
    }
  }
}

let pack = Pack(data,Platform)
pack.run()
