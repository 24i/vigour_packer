'use strict'
const path = require('path')
const fs = require('vigour-fs-promised')
// const templateDir = path.join(process.cwd(), '../template/')
// const filesToLink = ['build.css','build.js','assets']
const pkg = require('../../package.json')

const Packer = (options) => {
	let promisesArray = [
		createPackedFolder(options),
		createBasicFolder(options),
		// copyTemplate(options),
		copyFiles(options)
	]
	Promise.all(promisesArray).then((a) => {
		console.log('Goood')
	}).catch((err) => {
		console.log('errr', err)
	})
}

const createPackedFolder = (options) => {
	let location = options.packer.output
	return createFolder(location)
}


const createBasicFolder = (options) => {
	let location = options.packer.output
	removeDir(path.join(location,options.platform)) 
	createFolder(location, options.platform)
}

// const copyTemplate = (options) => {
// 	let location = options.packer.output
// 	return options.platforms.map((platform) => {	
// 		fs.createReadStream(templateDir + 'index.html').pipe(fs.createWriteStream(location +'/'+ platform + '/index.html'))	
// 	})
// }


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
      if (fs.statSync(filePath))
        fs.unlinkSync(filePath)
      else
        rmDir(filePath)
    }
  fs.rmdirSync(dirPath)
}


const copyFiles = (options) => {
	let currentDir = path.join(options.packer.output,options.platform,'/')
	let targetDir = path.join(options.packer.input,options.platform,'/')


	console.log('copying ' ,currentDir, targetDir)
	return new Promise((resolve, reject) => {

		for (var p in pkg.vigour) {
			fs.symlink(path.join(targetDir,pkg.vigour[p]),path.join(currentDir,pkg.vigour[p]), (err,data) => {
				if(err) reject(err)
				resolve()
			})
		}
	})
}

module.exports = Packer