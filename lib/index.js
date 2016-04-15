'use strict'

let fs = require('fs')
let path = require('path')
let defaultOutputPath = path.join(process.cwd(), 'packed')
let defaultEntryPointPath = path.join(process.cwd(), 'build')

const Pack = (json, platforms) => {

	let state = {}
	if (json) {
		state.output = json.packer.output || defaultOutputPath
		state.input = json.packer.input || defaultEntryPointPath
	}
	if (platforms) {
	
		state.platforms = platforms
	}
	console.log(state.platforms)
	return Object.assign({},
		Run(state)
	)
}

const Run = (state) => ({
	run : (commandlineArgs) => {
  	require('./pack/')(state)
	}
})

module.exports = Pack



