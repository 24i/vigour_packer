'use strict'
let fs = require('fs')
let path = require('path')

const defaultReceiverPath = path.join(__dirname,'templates/receiver.js')


const chromecast = (options) => {

	console.log(options.packer.chromecast, 'before')
	let state = options

	if(!state.packer.chromecast || !state.packer.chromecast.receiver) {
		state.packer.chromecast	= defaultReceiverPath		
	} else {
		state.packer.chromecast = path.join(process.cwd(),options.packer.chromecast.receiver)
	}
	
	return Object.assign({},
		pack(state)
	)

}

const pack = (options) => ({
	pack : () => {
		console.log('Chromecast started')

		let promisesArray = [
			// copyHtml(options),
			linkReceiverJs(options)
		]

		Promise.all(promisesArray).then((a) => {
			console.log('Chromecast ended')

		}).catch((err) => {
			console.log('errr', err)
		})	
	}
})

const copyHtml = (options) => {
	console.log('Copy html')
}

const linkReceiverJs = (options) => {

	let currentDir = path.join(options.packer.output,options.platforms[1],'/receiver.js')
	let targetDir = options.packer.chromecast


	return new Promise((resolve, reject) => {
		fs.symlink(path.join(targetDir),path.join(currentDir), (err,data) => {
			if(err) reject(err)
			resolve()
		})
	})

}

module.exports = chromecast