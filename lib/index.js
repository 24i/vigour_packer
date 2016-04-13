'use strict'

let fs = require('fs')
let path = require('path')
let defaultOutputPath = path.join(process.cwd(), 'packed')
let defaultEntryPointPath = path.join(process.cwd(), 'build')
let defaultPlatforms = ['main','tv']

const Pack = (json, platform) => {

	let state = {}
	if (json) {
		state.output = json.packer.output || defaultOutputPath
		state.input = json.packer.input || defaultEntryPointPath
	}
	if (platform) {
		defaultPlatforms.push(platform)
		state.platforms = defaultPlatforms
	}

	return Object.assign({},
		Run(state)
	)
}

const Run = (state) => ({
	run : (commandlineArgs) => {

		// let specificPlatform = commandlineArgs[0]
		// let entrypoint = commandlineArgs[1] || path.join(process.cwd(), "build")
		// let outputFodler = commandlineArgs[2] || 'default'
		// // state.platforms.push(specificPlatform)
		// // 
		
		// // {
		// // 	"input":Path
		// 	// "output": "path"
		// 	// "platforms":[
		// 	// 
		// 	// ]
		// // }

		// if( !specificPlatform ) {
		// 	fs.readdirSync(entrypoint).filter((file) => {
		// 		if(fs.statSync(path.join(entrypoint, file)).isDirectory()){ 
		// 			state.platforms.push(file)
		// 		}
  // 		})	
		// }
		
		

  	require('./pack/')(state)
	}
})

module.exports = Pack



