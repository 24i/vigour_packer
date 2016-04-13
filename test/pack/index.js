'use strict'

let test = require('tape')
let proxyquire = require('proxyquire')


var readFileFake = function (input) {
	return ['main','tv'];
}

let pack = Pack()

test('Createing the Pack object ', (assert) => {
	assert.plan(1)

	assert.equals(, 'Should have a run function')
	assert.end()
})