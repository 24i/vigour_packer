'use strict'

let fs = require('fs')
let path = require('path')
let platforms = {
	chromecast:'chromecast',
	tv:'tv',
	main:'main'
}

const Pack = (options) => {
	let state = {
		options,
		platforms:[]
	}
	
	return Object.assign({},
		Run(state)
	)
}

const Run = (state) => ({
	run : (commandlineArgs) => {


		let specificPlatform = commandlineArgs[0]
		let entrypoint = commandlineArgs[1] || path.join(process.cwd(), "build")
		let outputFodler = commandlineArgs[2] || 'default'
		// state.platforms.push(specificPlatform)

		if( !specificPlatform ) {
			fs.readdirSync(entrypoint).filter((file) => {
				if(fs.statSync(path.join(entrypoint, file)).isDirectory()){ 
					state.platforms.push(file)
				}
  		})	
		}
		
		

  	require('./pack/')(state.platforms)
	}
})

module.exports = Pack



