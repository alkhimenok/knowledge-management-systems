const path = require('path')
const config = require('config')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = config.get('port')
const URL = config.get('databaseURL')

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'templates'))

app.use(express.static(path.resolve(__dirname, 'client', 'dist')))

app.use('/', require('./routes/main'))

const start = async () => {
	try {
		// await mongoose.connect(URL)
		app.listen(PORT, () => console.log(`server started on port ${PORT}`))
	} catch (e) {
		console.log(`Server error: ${e.message}`)
		process.exit(1)
	}
}
start()
// start().then(console.log('database conecked!'))