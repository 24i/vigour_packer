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
	run : (commandline) => {
		let formatsPath = path.join(process.cwd(), "build")
		fs.readdirSync(formatsPath).filter(function(file) {
			if(fs.statSync(path.join(formatsPath, file)).isDirectory()){ 
				state.platforms.push(file)
			}
  	})
  	require('./pack/')(state.platforms)
	}
})


// const pack = (platform) => {

// 	platform.forEach((p)=> {
// 		let platformName = p
// 		require('./pack/'+platforms[p])()
// 	})
// }

module.exports = Pack



