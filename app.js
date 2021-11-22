const path = require('path')
const config = require('config')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = config.get('port')
const URL = config.get('databaseURL')

const start = async () => {
	try {
		await mongoose.connect(URL)
	} catch (e) {
		console.log(e.message)
		process.exit()
	}
}

start().then(console.log('database conecked!'))

app.use(express.static(path.resolve(__dirname, 'client', 'dist')))

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`)
})
