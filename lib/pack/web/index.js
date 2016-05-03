'use strict'

let fs = require('fs')
let path = require('path')
let Packer = require('../')
let defaultOutputPath = path.join(process.cwd(), 'packed')
let defaultEntryPointPath = path.join(process.cwd(), 'build')

const WebPacker = (json, platforms) => {
	let state = json
	if (json) {
		state.packer.output = json.packer.output || defaultOutputPath
		state.packer.input = json.packer.input || defaultEntryPointPath
	}
	if (platforms) {
		state.platform = platforms
	}

	create(state)

	return Object.assign({},
		Run(state)
	)
}

const Run = (state) => ({
	run : (commandlineArgs) => {
		console.log('Web Done!')
	}
})


const create = (state) => {
	require('../')(state)
}

module.exports = WebPacker



