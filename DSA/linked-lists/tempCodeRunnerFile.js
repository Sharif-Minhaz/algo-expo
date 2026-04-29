class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class AssumedLinkedList {
	constructor() {
		this.head = new Node(0);
		this.tail = this.head;

		// auto generated linked-list
		for (let i = 1; i < 7; i++) {
			const n = new Node(i);
			this.tail.next = n;
			this.tail = n;
		}

		// intensional circular
		this.tail.next = this.head.next;
	}

	view() {
		const tail = this.tail;
		let current = this.head;
		const res = [];
		while (current) {
			res.push(current.value);
			current = current.next;

			if (tail === current) break;
		}

		return res;
	}

	hasCircular() {
		let slow = this.head;
		let fast = this.head;

		while (fast && fast.next) {
			slow = slow.next;
			fast = fast.next.next;

			if (slow === fast) return true;
		}

		return false;
	}

	getStartCircularPoint() {
		let slow = this.head;
		let fast = this.head;

		while (fast && fast.next) {
			slow = slow.next;
			fast = fast.next.next;

			if (slow === fast) {
				// Phase 2: find start

				while (slow !== fast) {
					slow = this.head;
					fast = this.head;
				}

				return slow.value;
			}
		}
	}
}

const aLL = new AssumedLinkedList();
console.log(aLL.view());
console.log(aLL.hasCircular());
console.log(aLL.getStartCircularPoint());
