#!/usr/bin/env node
'use strict'

let Config = require('vigour-config')
let path = require('path')
let Pack = require('../lib')
let supportedPlatforms = {
	chromecast:'tv',
	webostv:'tv',
	web:'main'
}
let config = new Config()

let commandLineArgs = []

// 1st = Platform
// 2nd = EntryPoint folder
// 3rd = Output folder

commandLineArgs.push(supportedPlatforms[process.argv[2]], process.argv[2])


let defaultOutputPath = path.join(process.cwd(), 'fakeFolder')
let defaultInputPath = path.join(process.cwd(), 'differentEntry')
let data = {
	packer: {
    "chromecast" : {
      "receiver": "platform/chromecast/receiver.js"
    }
  }

}


let pack = Pack(data, commandLineArgs)
pack.run()
