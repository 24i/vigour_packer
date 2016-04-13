'use strict'
const path = require('path')
const fs = require('vigour-fs-promised')
const templateDir = path.join(process.cwd(), '../template/')
const defaultPlatforms = ['main', 'tv']
let filesToLink = ['build.css','build.js','assets']

const pack = (options) => {
	let promisesArray = [
		clear(),
		createPackedFolder(options),
		createBasicStructure(options),
		createIndexHtml(options),
		symlinkFiles(options)
	]

	Promise.all(promisesArray).then((a) => {
		console.log('good')
	}).catch((err) => {
		console.log('errr', err)
	})
}

const createPackedFolder = (options) => {
	let location = options.output
	return createFolder(location)
}


const createBasicStructure = (options) => {
	let location = options.output
	return options.platforms.map((platform) => {
		createFolder(location, platform)
	})
}

const createIndexHtml = (options) => {
	let location = options.output
	return options.platforms.map((platform) => {	
		fs.createReadStream(templateDir + 'index.html').pipe(fs.createWriteStream(location +'/'+ platform + '/index.html'))	
	})
}


const createFolder = (location, folderName) => {
	folderName = folderName || ''

	let folder = path.join(location,folderName)

	return new Promise((resolve, reject) => {
		fs.mkdir(folder, (err, data) => {
			if(err) reject(err)
			resolve()
		})		
	})
}


const symlinkFiles = (options) => {

	let currentDir = path.join(options.output)
	let targetFile = path.join(options.input)

	return new Promise ((resolve, reject) => {
		defaultPlatforms.map((p, i) => {	
			Promise.all([
				fs.symlink(path.join(targetFile, p,'/',filesToLink[0]),path.join(currentDir,p,'/',filesToLink[0]), (err,data) => {
					if(err) reject(err)
					resolve()
				}),
				fs.symlink(path.join(targetFile, p,'/',filesToLink[1]),path.join(currentDir,p,'/',filesToLink[1]), (err,data) => {
					if(err) reject(err)
					resolve()
				})
			])
		})
	}) 
}

const clear = () => {
	let location = path.join(process.cwd(), '/packed/')
	return fs.removeAsync(location)
}

module.exports = pack