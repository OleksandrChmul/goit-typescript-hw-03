class Key {
	private signature: number
	constructor() {
		this.signature = Math.floor(Math.random() * 1000000000)
	}

	getSignature(): number {
		return this.signature
	}
}

class Person {
	constructor(private key: Key) {}

	getKey(): Key {
		return this.key
	}
}

abstract class House {
	protected door: boolean = false
	protected tenants: Person[] = []

	constructor(protected key: Key) {}

	public comeIn(person: Person): void {
		if (this.door) this.tenants.push(person)
		else console.log('First you have to open the door!')
	}

	public abstract openDoor(key: Key): void
}

class MyHouse extends House {
	public openDoor(key: Key): void {
		if (this.door) return // door is already open

		if (key.getSignature() === this.key.getSignature()) this.door = true
		else console.log('Sorry, this is invalid key!')
	}
}

const key = new Key()

const house = new MyHouse(key)
const person = new Person(key)

house.openDoor(person.getKey())

house.comeIn(person)

export {}
