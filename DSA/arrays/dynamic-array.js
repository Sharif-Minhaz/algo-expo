class DynamicArray {
	constructor(arr, capacity) {
		this.capacity = capacity;
		this.size = arr.length;
		this.arr = arr;
	}

	add(value) {
		if (this.capacity === this.size) {
			this.resize(value);
			console.log("Array resized!");
			return;
		}

		this.size++;
		this.arr.push(value);
	}

	pop() {
		this.size--;
		this.arr.pop();
	}

	search(value) {
		return this.arr.findIndex((item) => item === value);
	}

	resize(value) {
		this.arr = new Array(this.size + this.capacity, ...this.arr, value);
		this.size = this.arr.length;
	}

	getConfig() {
		return { capacity: this.capacity, size: this.size };
	}
}

const myArr = [];
const capacity = 2;
const dynamicArray = new DynamicArray(myArr, capacity);

dynamicArray.add(34);
console.log(dynamicArray.getConfig());
dynamicArray.add(9);
console.log(dynamicArray.getConfig());
dynamicArray.add(3);

// ============================================================
// 📘 DSA: Dynamic Array
// ============================================================
//
// 🔹 Name: Dynamic Array (Resizable Array)
//
// 🔹 Description:
//    A Dynamic Array is a data structure that automatically grows
//    in size when its capacity is exceeded. Unlike fixed-size arrays,
//    it handles overflow by creating a new, larger array and copying
//    existing elements into it. This allows flexible storage without
//    needing to know the final size upfront.
//
// ============================================================
// 🔹 Code Explanation:
// ============================================================
//
//  1. constructor(arr, capacity):
//     - Takes an initial array and a capacity limit.
//     - Sets `this.capacity` = max items before a resize is needed.
//     - Sets `this.size` = current number of elements.
//     - Sets `this.arr` = the underlying array.
//
//  2. add(value):
//     - Checks if the array is full (size === capacity).
//     - If full → calls `resize(value)` to expand and add the item.
//     - If not full → increments size and pushes the value.
//
//  3. pop():
//     - Decrements size by 1.
//     - Removes the last element using Array.pop().
//
//  4. search(value):
//     - Uses `findIndex` to return the index of the first match.
//     - Returns -1 if the value is not found.
//
//  5. resize(value):
//     - Creates a new array with size = (current size + capacity).
//     - Spreads old elements and appends the new value into it.
//     - Updates `this.size` to the new array's length.
//     Note: `new Array(size, ...elements)` is used here — the first
//     argument sets length, and spread adds existing elements + new value.
//
//  6. getConfig():
//     - Returns an object with current `capacity` and `size`.
//
// ============================================================
// 🔹 Dry Run (Step-by-Step):
// ============================================================
//
//  Initial State:
//    myArr = [], capacity = 2
//    dynamicArray → { arr: [], size: 0, capacity: 2 }
//
//  Step 1: dynamicArray.add(34)
//    - size (0) !== capacity (2) → not full
//    - size becomes 1, arr becomes [34]
//    - State: { arr: [34], size: 1, capacity: 2 }
//
//  Step 2: console.log(dynamicArray.getConfig())
//    - Output: { capacity: 2, size: 1 }
//
//  Step 3: dynamicArray.add(9)
//    - size (1) !== capacity (2) → not full
//    - size becomes 2, arr becomes [34, 9]
//    - State: { arr: [34, 9], size: 2, capacity: 2 }
//
//  Step 4: console.log(dynamicArray.getConfig())
//    - Output: { capacity: 2, size: 2 }
//
//  Step 5: dynamicArray.add(3)
//    - size (2) === capacity (2) → FULL! Resize triggered.
//    - resize(3) is called:
//      → new Array(2 + 2, ...[34, 9], 3)
//      → Creates a new array of length 4 with elements spread in.
//      → arr updates, size updates to new array length.
//    - Console logs: "Array resized!"
//    - State: resized array with increased capacity
//
// ============================================================
// 🔹 When to Use:
// ============================================================
//
//  - When you don't know the number of elements ahead of time.
//  - When elements are frequently added/removed from the end.
//  - When you need O(1) average-time insertion at the end.
//
// ============================================================
// 🔹 Real-Life Applications:
// ============================================================
//
//  - JavaScript's built-in Array is essentially a dynamic array.
//  - ArrayList in Java, vector in C++ — all use this concept.
//  - Browser DOM node lists that grow as elements are added.
//  - Chat message lists that keep growing as new messages arrive.
//  - Shopping cart items where users add/remove products dynamically.
//
// ============================================================
// 🔹 Time Complexity:
// ============================================================
//
//  - add()    → O(1) average, O(n) worst case (when resize happens)
//  - pop()    → O(1)
//  - search() → O(n)
//  - resize() → O(n) (copies all elements to new array)
//
// ============================================================
