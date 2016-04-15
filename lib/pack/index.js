'use strict'
const path = require('path')
const fs = require('vigour-fs-promised')
const templateDir = path.join(process.cwd(), '../template/')
const filesToLink = ['build.css','build.js']

const pack = (options) => {
	let promisesArray = [
		createPackedFolder(options),
		createBasicStructure(options),
		// createIndexHtml(options),
		symlinkFiles(options)
	]

	Promise.all(promisesArray).then((a) => {
		// let p = require('./'+options.platforms[2])
		console.log('Goood')
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
	removeDir(path.join(location,options.platforms[1])) 
	createFolder(location, options.platforms[1])
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
		if(!fs.existsSync(folder)) {
			fs.mkdir(folder, (err, data) => {
				if(err && err.code !== 'EEXIST') {
					reject(err)
				}
				resolve()
			})		
		}
		resolve()
	})
}

const removeDir = (dirPath) => {

  try { var files = fs.readdirSync(dirPath) }
  catch(e) { return }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i]
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath)
      else
        rmDir(filePath)
    }
  fs.rmdirSync(dirPath)
}


const symlinkFiles = (options) => {
	let currentDir = path.join(options.output,options.platforms[1],'/')
	let targetDir = path.join(options.input,options.platforms[0],'/')
	return new Promise((resolve, reject) => {
		filesToLink.map((file) => {
			fs.symlink(path.join(targetDir,file),path.join(currentDir,file), (err,data) => {
				if(err) reject(err)
				resolve()
			})
		})
	})
}

module.exports = pack