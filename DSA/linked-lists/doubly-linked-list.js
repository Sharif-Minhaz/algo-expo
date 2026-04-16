class Node {
	constructor(v) {
		this.value = v;
		this.prev = null;
		this.next = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	pushFront(v) {
		if (!this.head) {
			this.head = new Node(v);
			this.tail = this.head;
			return;
		}

		const prevHead = this.head;
		this.head = new Node(v);
		this.head.next = prevHead;

		prevHead.prev = this.head;
	}

	popFront() {
		if (!this.head) return;

		const currentHead = this.head;
		this.head = currentHead.next;
		this.head.prev = null;
	}

	pushBack(v) {
		const currentTail = this.tail;

		this.tail = new Node(v);
		currentTail.next = this.tail;
		this.tail.prev = currentTail;
	}

	popBack() {
		if (!this.tail) return;

		const currentTail = this.tail;
		this.tail = currentTail.prev;
		this.tail.next = null;
	}

	viewResult() {
		const res = [];
		let currentNode = this.head;

		while (currentNode) {
			res.push(currentNode.value);

			currentNode = currentNode.next;
		}

		console.log(res.join(" <---> "));
	}
}

const dLL = new DoublyLinkedList();
dLL.pushFront(54);
dLL.pushFront(34);
dLL.pushFront(230);
dLL.popFront();
dLL.pushBack(456);
dLL.pushBack(89);
dLL.popBack();
dLL.popBack();
dLL.pushFront(130);
dLL.pushBack(12);

dLL.viewResult();

// =============================================================================
// DSA: Doubly Linked List
// =============================================================================
//
// DESCRIPTION:
// A Doubly Linked List is a linear data structure where each node contains
// a value, a pointer to the next node, and a pointer to the previous node.
// Unlike a singly linked list, traversal is possible in both directions
// (forward and backward). It maintains both a `head` (first node) and a
// `tail` (last node) reference for O(1) access to both ends.
//
// =============================================================================
// CODE EXPLANATION
// =============================================================================
//
// Node class:
//   - Each node stores a `value`, a `prev` pointer, and a `next` pointer.
//   - On creation, both `prev` and `next` are null.
//
// DoublyLinkedList class:
//   - `head` → points to the first node.
//   - `tail` → points to the last node.
//   - Both start as null (empty list).
//
// pushFront(v):
//   - If list is empty: create a node, set it as both head and tail.
//   - Otherwise: create a new node, link its `next` to old head,
//     set old head's `prev` to new node, update `head` to new node.
//   - Time: O(1)
//
// popFront():
//   - If list is empty: return immediately.
//   - Otherwise: move `head` to `head.next`, sever the `prev` link
//     of the new head (set to null).
//   - Time: O(1)
//   - Note: if the list has only one node, `this.head` becomes null's
//     `.next` which would throw. This implementation assumes size > 1.
//
// pushBack(v):
//   - Create a new node, link old tail's `next` to it, set new node's
//     `prev` to old tail, update `tail` to new node.
//   - Time: O(1)
//   - Note: assumes the list is non-empty (tail exists).
//
// popBack():
//   - If list is empty: return immediately.
//   - Otherwise: move `tail` to `tail.prev`, sever the `next` link
//     of the new tail (set to null).
//   - Time: O(1)
//   - Note: if the list has only one node, same caveat as popFront.
//
// viewResult():
//   - Traverses head → tail, collecting values into an array.
//   - Prints them joined by " <---> " to visually show bidirectional links.
//   - Time: O(n)
//
// =============================================================================
// STEP-BY-STEP DRY RUN
// =============================================================================
//
// Initial state: head = null, tail = null
//
// 1. pushFront(54)
//    List empty → create node(54), head = tail = node(54)
//    List: [54]
//    head → 54 ← tail
//
// 2. pushFront(34)
//    prevHead = node(54)
//    head = node(34), head.next = node(54), node(54).prev = node(34)
//    List: [34 <---> 54]
//    head → 34 <---> 54 ← tail
//
// 3. pushFront(230)
//    prevHead = node(34)
//    head = node(230), head.next = node(34), node(34).prev = node(230)
//    List: [230 <---> 34 <---> 54]
//    head → 230 <---> 34 <---> 54 ← tail
//
// 4. popFront()
//    currentHead = node(230)
//    head = node(34), node(34).prev = null
//    List: [34 <---> 54]
//    head → 34 <---> 54 ← tail
//
// 5. pushBack(456)
//    currentTail = node(54)
//    tail = node(456), node(54).next = node(456), node(456).prev = node(54)
//    List: [34 <---> 54 <---> 456]
//    head → 34 <---> 54 <---> 456 ← tail
//
// 6. pushBack(89)
//    currentTail = node(456)
//    tail = node(89), node(456).next = node(89), node(89).prev = node(456)
//    List: [34 <---> 54 <---> 456 <---> 89]
//    head → 34 <---> 54 <---> 456 <---> 89 ← tail
//
// 7. popBack()
//    currentTail = node(89)
//    tail = node(456), node(456).next = null
//    List: [34 <---> 54 <---> 456]
//
// 8. popBack()
//    currentTail = node(456)
//    tail = node(54), node(54).next = null
//    List: [34 <---> 54]
//
// 9. pushFront(130)
//    prevHead = node(34)
//    head = node(130), head.next = node(34), node(34).prev = node(130)
//    List: [130 <---> 34 <---> 54]
//
// 10. pushBack(12)
//     currentTail = node(54)
//     tail = node(12), node(54).next = node(12), node(12).prev = node(54)
//     List: [130 <---> 34 <---> 54 <---> 12]
//
// 11. viewResult()
//     Traverse: 130 → 34 → 54 → 12
//     Output: "130 <---> 34 <---> 54 <---> 12"
//
// =============================================================================
// WHEN TO USE
// =============================================================================
//
// - Need O(1) insertion/deletion at BOTH ends (deque behavior).
// - Need to traverse in both directions (forward and backward).
// - Need to delete a node when you already have a reference to it (O(1)
//   delete without searching, since you can access both neighbors).
// - Implementing LRU cache (move recently used nodes to front in O(1)).
// - Implementing undo/redo functionality (navigate history both ways).
// - Browser forward/back navigation.
//
// =============================================================================
// REAL-LIFE APPLICATIONS
// =============================================================================
//
// - Browser history: back/forward navigation between pages.
// - Music/video players: previous/next track with bidirectional traversal.
// - Text editors: undo/redo stacks, cursor movement in both directions.
// - LRU Cache: doubly linked list + hash map for O(1) get/put.
// - OS task scheduler: process queues that need insertion/removal at both ends.
// - Deck of cards: deal from top or bottom.
//
// =============================================================================
// TIME & SPACE COMPLEXITY
// =============================================================================
//
// | Operation   | Time   | Space  |
// |-------------|--------|--------|
// | pushFront   | O(1)   | O(1)   |
// | popFront    | O(1)   | O(1)   |
// | pushBack    | O(1)   | O(1)   |
// | popBack     | O(1)   | O(1)   |
// | viewResult  | O(n)   | O(n)   |
// | Search      | O(n)   | O(1)   |
//
// Overall space for the list: O(n) where n = number of nodes.
// Each node uses O(1) extra space for prev/next pointers compared to
// a singly linked list.
// =============================================================================
