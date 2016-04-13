'use strict'
const path = require('path')
const fs = require('vigour-fs-promised')
const templateDir = path.join(process.cwd(), 'template')

const pack = (platforms) => {
	
	let promisesArray = [
		clear(),
		createBasicStructure(platforms),
		createPlatformFolders(platforms),
		createIndexHtml(platforms)
	]

	Promise.all(promisesArray).then((a) => {
		console.log(a, 'good')
	}).catch((err) => {
		console.log('errr', err)
	})
	
}

const clear = () => {
	let location = path.join(process.cwd(), '/packed/')
	return fs.removeAsync(location)
}

const createIndexHtml = (platforms) => {
	let currentDir = path.join(process.cwd(), '/packed/')
	return platforms.forEach((p) => {
		fs.createReadStream(templateDir + 'index.html').pipe(fs.createWriteStream(currentDir + p))
	})
}

const createBasicStructure = (platforms) => {
	let location = path.join(process.cwd())
	return createFolder(platforms,'packed',location)
}

const createPlatformFolders = (platforms) => {
	let location = path.join(process.cwd(), '/packed')
	return platforms.forEach((p) => {
		createFolder(platforms, p, location)	
	})
}

const createFolder = (platforms, folderName, path) => {
	let currentDir =  path || process.cwd()

	return new Promise((resolve, reject) => {
		fs.mkdir(currentDir+'/'+folderName, (err, data) => {
			if(err) reject(err)
			resolve()
		})		
	})
}



module.exports = pack