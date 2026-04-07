class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
	}

	append(value) {
		if (!this.head) {
			this.head = new Node(value);

			return;
		}

		let lastNode = this.head;

		while (lastNode.next) {
			lastNode = lastNode.next;
		}

		lastNode.next = new Node(value);
	}

	prepend(value) {
		if (!this.head) {
			this.head = new Node(value);

			return;
		}

		let prevHead = this.head;
		this.head = new Node(value);
		this.head.next = prevHead;
	}

	find(value) {
		if (!this.head) return console.log({ res: false, message: "No item exists" });

		let position = 0;

		let currentItem = this.head;
		while (currentItem) {
			position++;
			if (currentItem.value === value) {
				return console.log({ data: value, res: true, position });
			}

			currentItem = currentItem.next;
		}

		console.log({ res: false, message: "No item exists" });
	}

	remove(value) {
		if (!this.head) return { is_removed: false, message: "No item is exist for deletion" };

		let prevItem = null;
		let currentItem = this.head;

		while (currentItem) {
			if (currentItem.value === value) {
				prevItem.next = currentItem.next;

				return { is_removed: true };
			}

			prevItem = currentItem;
			currentItem = currentItem.next;
		}

		return { is_removed: false, message: "Item doesn't exists" };
	}

	view() {
		const resArr = [];

		let currentItem = this.head;

		while (currentItem) {
			resArr.push(currentItem.value);
			currentItem = currentItem.next;
		}

		console.log(resArr.join(" ---> "));
	}
}

const baseLinkedList = new LinkedList();

baseLinkedList.append(54);
baseLinkedList.prepend(34);
baseLinkedList.append(43);
baseLinkedList.prepend(99);
baseLinkedList.view();

baseLinkedList.find(34);
baseLinkedList.remove(54);

baseLinkedList.view();

// ============================================================
// DSA Name: Singly Linked List
// ============================================================
//
// Description:
// A Singly Linked List is a linear data structure where each
// element (node) contains a value and a pointer (reference) to
// the next node in the sequence. Unlike arrays, linked list
// elements are not stored in contiguous memory — each node can
// live anywhere in memory and is connected via its "next"
// pointer. The list is accessed starting from the "head" node
// and traversed one node at a time until the end (null).
//
// ============================================================
// Code Explanation:
// ============================================================
//
// Node class:
//   - constructor(value): Creates a node with the given value
//     and sets next to null (no successor yet).
//
// LinkedList class:
//   - constructor(): Initializes an empty list with head = null.
//
//   - append(value):
//     Adds a new node at the END of the list.
//     • If the list is empty (no head), the new node becomes
//       the head.
//     • Otherwise, traverse from head to the last node (the one
//       whose .next is null), then set lastNode.next to the new
//       node.
//     • Time: O(n) — must walk to the end each time.
//
//   - prepend(value):
//     Adds a new node at the BEGINNING of the list.
//     • If the list is empty, the new node becomes the head.
//     • Otherwise, save the current head, create a new node as
//       the head, and point its .next to the old head.
//     • Time: O(1) — direct access to head.
//
//   - find(value):
//     Searches for a node with the given value.
//     • If the list is empty, logs "No item exists".
//     • Otherwise, traverses from head, tracking position (1-based).
//       If found, logs the data, result, and position.
//       If not found after full traversal, logs "No item exists".
//     • Time: O(n) — may need to check every node.
//
//   - remove(value):
//     Removes the first node with the given value.
//     • If the list is empty, returns not removed.
//     • Traverses with two pointers: prevItem (previous node)
//       and currentItem (node being checked).
//     • When found, bypasses the node: prevItem.next = currentItem.next,
//       effectively unlinking it from the chain.
//     • Note: This implementation assumes the target is NOT the
//       head node (prevItem starts as null, so removing head
//       would cause an error).
//     • Time: O(n) — may need to traverse the full list.
//
//   - view():
//     Displays the entire list in a readable format.
//     • Traverses from head, collecting all values into an array.
//     • Joins them with " ---> " and logs the result.
//     • Time: O(n) — visits every node.
//
// ============================================================
// Step-by-Step Dry Run:
// ============================================================
//
// --- Building the list ---
//
// baseLinkedList.append(54):
//   List is empty (head = null)
//   → head = Node(54)
//   List: 54 → null
//
// baseLinkedList.prepend(34):
//   List has head = Node(54)
//   → Save prevHead = Node(54)
//   → head = Node(34)
//   → head.next = Node(54)
//   List: 34 → 54 → null
//
// baseLinkedList.append(43):
//   List has head = Node(34)
//   → Traverse: lastNode = Node(34), .next exists → move
//   → lastNode = Node(54), .next is null → stop
//   → Node(54).next = Node(43)
//   List: 34 → 54 → 43 → null
//
// baseLinkedList.prepend(99):
//   List has head = Node(34)
//   → Save prevHead = Node(34)
//   → head = Node(99)
//   → head.next = Node(34)
//   List: 99 → 34 → 54 → 43 → null
//
// baseLinkedList.view():
//   Traverse: 99 → 34 → 54 → 43
//   Output: "99 ---> 34 ---> 54 ---> 43"
//
// --- Finding a value ---
//
// baseLinkedList.find(34):
//   currentItem = Node(99), position=1, value=99 ≠ 34 → move
//   currentItem = Node(34), position=2, value=34 === 34 → FOUND
//   Output: { data: 34, res: true, position: 2 }
//
// --- Removing a value ---
//
// baseLinkedList.remove(54):
//   prevItem = null, currentItem = Node(99)
//   99 ≠ 54 → prevItem = Node(99), currentItem = Node(34)
//   34 ≠ 54 → prevItem = Node(34), currentItem = Node(54)
//   54 === 54 → FOUND!
//     prevItem.next = currentItem.next
//     Node(34).next = Node(43)
//   → Node(54) is unlinked
//   List: 99 → 34 → 43 → null
//   Returns: { is_removed: true }
//
// baseLinkedList.view():
//   Traverse: 99 → 34 → 43
//   Output: "99 ---> 34 ---> 43"
//
// --- Dry run: find a non-existent value ---
//
// baseLinkedList.find(100):
//   currentItem = Node(99), 99 ≠ 100 → move
//   currentItem = Node(34), 34 ≠ 100 → move
//   currentItem = Node(43), 43 ≠ 100 → move
//   currentItem = null → loop ends
//   Output: { res: false, message: "No item exists" }
//
// --- Dry run: remove from empty list ---
//
// emptyList.remove(5):
//   head is null → return { is_removed: false, message: "No item is exist for deletion" }
//
// ============================================================
// When to Use:
// ============================================================
//
// - When you need frequent insertions/deletions at the beginning
//   of a collection (O(1) prepend vs O(n) array unshift).
// - When the size of the collection is unknown or changes
//   frequently (no need to pre-allocate or resize).
// - When you don't need random access by index (no arr[i]).
// - As a building block for other data structures: stacks,
//   queues, hash table chaining, adjacency lists for graphs.
// - When memory allocation needs to be flexible — nodes can be
//   scattered in memory, no contiguous block required.
//
// ============================================================
// Real-Life Applications:
// ============================================================
//
// - Browser history (back button): each page visited is a node,
//   navigating back follows the chain.
// - Music playlist: each song points to the next song to play.
// - Undo functionality: each action is a node, undo pops from
//   the front of the chain.
// - Memory allocation: operating systems use free lists (linked
//   lists of available memory blocks).
// - Hash table collision handling: separate chaining stores
//   colliding entries in a linked list at each bucket.
// - Task scheduling / job queues: tasks linked together and
//   processed in order.
//
// ============================================================
// Time & Space Complexity:
// ============================================================
//
//  Operation     | Time     | Notes
//  --------------|----------|-------------------------------
//  append        | O(n)     | Must traverse to the end
//  prepend       | O(1)     | Direct head insertion
//  find          | O(n)     | Linear search through nodes
//  remove        | O(n)     | Linear search + pointer update
//  view          | O(n)     | Visits every node
//
//  Space complexity: O(n) for storing n nodes
//
//  Note: append can be made O(1) by maintaining a "tail"
//  pointer in addition to "head".
// ============================================================
