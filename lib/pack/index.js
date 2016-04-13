'use strict'
const path = require('path')
const fs = require('vigour-fs-promised')
const templateDir = path.join(process.cwd(), '../template/')

const pack = (platforms) => {
	
	let promisesArray = [
		clear(),
		createBasicStructure(platforms),
		createPlatformFolders(platforms),
		createIndexHtml(platforms),
		symlinkFiles(platforms)
	]

	Promise.all(promisesArray).then((a) => {
		console.log('good')
	}).catch((err) => {
		console.log('errr', err)
	})
	
}


const symlinkFiles = (platforms, file) => {

	let files = ['build.css','build.js','assets']

	let currentDir = path.join(process.cwd(), '/packed/')
	let targetFile = path.join(process.cwd(), "build/")

	return new Promise ((resolve, reject) => {
		platforms.map((p, i) => {	
			Promise.all([
				fs.symlink(path.join(targetFile,p,'/',files[0]),path.join(currentDir,p,'/',files[0]), (err,data) => {
					if(err) reject(err)
					resolve()
				}),
				fs.symlink(path.join(targetFile,p,'/',files[1]),path.join(currentDir,p,'/',files[1]), (err,data) => {
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

const createIndexHtml = (platforms) => {
	let currentDir = path.join(process.cwd(), '/packed/')
	return platforms.forEach((p) => {	
		fs.createReadStream(templateDir + 'index.html').pipe(fs.createWriteStream(currentDir + p + '/index.html'))
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