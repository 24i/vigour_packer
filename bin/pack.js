#!/usr/bin/env node
'use strict'

let Config = require('vigour-config')
let path = require('path')
let selected = process.argv[2]
let Packer = require('../lib/pack/'.concat(selected))

let config = new Config()

let defaultOutputPath = path.join(process.cwd(), 'fakeFolder')
let defaultInputPath = path.join(process.cwd(), 'differentEntry')


let data = {
	packer: {
    "chromecast" : {
      "receiver": "platform/chromecast/receiver.js"
    }
  }

}


let test = Packer(data, selected)
test.run()