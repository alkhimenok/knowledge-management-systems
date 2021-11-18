import './index.html'
import './styles/main.scss'
import 'normalize.css'

const str: string = 'Hello world!'
const num: number = 42

class Person {
	constructor() {}

	logName() {
		console.log(this)
	}
}

const obj = {
	name: 'kirill',
}

const user = new Person()

console.log(user.logName())

console.log(obj.name)
console.log('sdaf')

console.log(str)
console.log(num)
