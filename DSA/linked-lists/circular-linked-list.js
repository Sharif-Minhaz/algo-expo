class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class CircularLinkedList {
	constructor() {
		this.tail = null;
	}

	append(value) {
		if (!this.tail) {
			this.tail = new Node(value);
			this.tail.next = this.tail;

			return;
		}

		const oldTail = this.tail;
		const newNode = new Node(value);

		newNode.next = oldTail.next;
		this.tail = newNode;

		oldTail.next = newNode;
	}

	find(value) {
		let currentNode = this.tail.next;
		let position = 0;

		do {
			if (currentNode.value === value) {
				return position;
			}

			position++;
			currentNode = currentNode.next;
		} while (this.tail.next != currentNode);

		return -1;
	}

	view() {
		const res = [];
		let currentNode = this.tail.next;

		do {
			res.push(currentNode.value);
			currentNode = currentNode.next;
		} while (this.tail.next != currentNode);

		console.log(res.join("---->"));
	}
}

const cLL = new CircularLinkedList();
cLL.append(120);
cLL.append(23);
cLL.append(253);

console.log(cLL.find(253));

cLL.view();

// =============================================================================
// DSA: Circular Linked List (Singly Circular)
// =============================================================================
//
// DESCRIPTION:
// A Circular Linked List is a variation of a linked list where the last node
// points back to the first node instead of null, forming a closed loop.
// This implementation is a singly circular linked list — each node has only
// a `next` pointer (no `prev`). The list maintains a `tail` reference;
// the head is always accessible via `tail.next`.
//
// =============================================================================
// CODE EXPLANATION
// =============================================================================
//
// Node class:
//   - Each node stores a `value` and a `next` pointer (initially null).
//
// CircularLinkedList class:
//   - Only maintains a `tail` pointer (starts as null).
//   - Head is derived as `tail.next` — the node after the tail wraps
//     around to the first node.
//
// append(value):
//   - If list is empty: create a node, set it as tail, point its `next`
//     to itself (self-loop — one node is both head and tail).
//   - Otherwise:
//     1. Save reference to old tail.
//     2. Create new node.
//     3. New node's `next` = old tail's `next` (which is the head).
//        This makes the new tail still point back to the head.
//     4. Set `tail` to new node.
//     5. Old tail's `next` = new node (link old tail to new tail).
//     Result: the new node is inserted at the END, and the circular
//     link is preserved (new tail → head).
//   - Time: O(1)
//
// find(value):
//   - Starts at `tail.next` (the head node), position = 0.
//   - Uses a `do...while` loop — necessary because in a circular list,
//     the start and end condition is the same node. A regular `while`
//     would never enter the loop or never exit.
//   - Iterates through each node, checking if `value` matches.
//   - Returns the 0-based position if found, -1 if not found.
//   - Loop ends when we circle back to `tail.next` (head).
//   - Time: O(n)
//
// view():
//   - Starts at `tail.next` (head), collects values using `do...while`.
//   - Prints them joined by "---->" to show the circular flow.
//   - Note: does NOT show the wrap-around arrow back to head in output.
//   - Time: O(n)
//
// =============================================================================
// STEP-BY-STEP DRY RUN
// =============================================================================
//
// Initial state: tail = null
//
// 1. append(120)
//    List empty → create node(120)
//    tail = node(120), tail.next = tail (self-loop)
//    Circular: [120] → points back to 120
//    tail → 120 ──┐
//           ↑     │
//           └─────┘
//
// 2. append(23)
//    oldTail = node(120)
//    newNode = node(23)
//    newNode.next = oldTail.next = node(120)  ← new node points to head
//    tail = node(23)
//    oldTail.next = node(23)  ← old tail links to new tail
//    Circular: 120 → 23 → back to 120
//    head(120) → 23(tail) → back to 120
//
// 3. append(253)
//    oldTail = node(23)
//    newNode = node(253)
//    newNode.next = oldTail.next = node(120)  ← points to head
//    tail = node(253)
//    oldTail.next = node(253)  ← node(23) now links to node(253)
//    Circular: 120 → 23 → 253 → back to 120
//    head(120) → 23 → 253(tail) → back to 120
//
// 4. find(253)
//    currentNode = tail.next = node(120), position = 0
//    Iteration 1: node(120).value = 120 ≠ 253, position = 1, move to node(23)
//    Iteration 2: node(23).value = 23 ≠ 253, position = 2, move to node(253)
//    Iteration 3: node(253).value = 253 === 253 → return 2
//    Output: 2
//
// 5. view()
//    currentNode = tail.next = node(120)
//    Collect: 120, 23, 253
//    Loop exits when currentNode circles back to tail.next (node 120)
//    Output: "120---->23---->253"
//
// --- Additional dry run: find() when value NOT present ---
//
//    find(999):
//    currentNode = node(120), position = 0
//    Iteration 1: 120 ≠ 999, pos=1, → node(23)
//    Iteration 2: 23 ≠ 999, pos=2, → node(253)
//    Iteration 3: 253 ≠ 999, pos=3, → node(120) ← back to head
//    Loop condition: tail.next(120) == currentNode(120) → exit loop
//    return -1
//
// =============================================================================
// WHEN TO USE
// =============================================================================
//
// - Round-robin scheduling: processes/tasks that cycle continuously.
// - Any scenario where after reaching the last element, you need to
//   wrap around to the first without special-case logic.
// - Circular buffers: streaming data where old data wraps around.
// - Games: turn-based systems where players cycle (player 1 → 2 → 3 → 1).
// - When you need continuous looping traversal without null checks.
//
// =============================================================================
// REAL-LIFE APPLICATIONS
// =============================================================================
//
// - OS round-robin CPU scheduling: each process gets a time slice,
//   then the scheduler moves to the next, cycling back to the first.
// - Multiplayer games: turn rotation among players.
// - Music playlist on repeat: after the last song, play the first again.
// - Circular buffer / ring buffer: network packet buffering, audio streaming.
// - Hot potato / Josephus problem: classic elimination game solved with
//   circular linked list.
// - Traffic light systems: cycle through red → green → yellow → red.
//
// =============================================================================
// TIME & SPACE COMPLEXITY
// =============================================================================
//
// | Operation | Time   | Space  |
// |-----------|--------|--------|
// | append    | O(1)   | O(1)   |
// | find      | O(n)   | O(1)   |
// | view      | O(n)   | O(n)   |
//
// Overall space for the list: O(n) where n = number of nodes.
// Key advantage over singly linked list: no null-termination means
// traversal can loop indefinitely — useful for cyclic algorithms.
// Key advantage of tail-pointer design: O(1) access to both tail AND
// head (via tail.next), enabling O(1) append at end.
// =============================================================================
