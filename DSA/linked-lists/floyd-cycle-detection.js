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
				slow = this.head;

				while (slow !== fast) {
					slow = slow.next;
					fast = fast.next;
				}

				return slow.value;
			}
		}

		return null;
	}
}

const aLL = new AssumedLinkedList();
console.log(aLL.view());
console.log(aLL.hasCircular());
console.log(aLL.getStartCircularPoint());

/*
================================================================================
DSA NAME: Floyd's Cycle Detection Algorithm (Tortoise and Hare Algorithm)
================================================================================

BASIC DESCRIPTION:
------------------
Floyd's Cycle Detection is a pointer-based algorithm to detect a cycle/loop in a
linked list (or any sequence that follows a "next" function) using two pointers
moving at different speeds. The slow pointer moves 1 step at a time, and the
fast pointer moves 2 steps at a time. If a cycle exists, the fast pointer will
eventually meet the slow pointer inside the loop. If no cycle exists, the fast
pointer will reach `null` (the end).

The algorithm has two phases:
  Phase 1: Detect whether a cycle exists (slow == fast inside the loop).
  Phase 2: Find the start node of the cycle (reset slow to head, then both
           pointers move 1 step at a time until they meet — that meeting point
           is the cycle's start).

================================================================================
FULL CODE EXPLANATION:
================================================================================

1) class Node { value, next }
   - Standard singly linked list node with a value and a pointer `next`.

2) class AssumedLinkedList
   - Constructor builds a hardcoded list with values 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6.
   - Then INTENTIONALLY creates a cycle:
       this.tail.next = this.head.next;
     This makes node 6's `next` point back to node 1 (the second node).
     Resulting structure:
         0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6
                  ^-------------------|
     So node 1 is the start of the cycle.

3) view()
   - Custom traversal to print the list WITHOUT infinite loop.
   - Uses the `tail` reference as a stop guard — when `current` equals `tail`,
     it pushes nothing more and breaks.
   - Note: it pushes values BEFORE the equality check inside the loop because
     the check at the bottom (`if (tail === current) break;`) happens after
     advancing `current`. So all nodes 0..6 get printed once.

4) hasCircular()  — Phase 1 only
   - slow = head, fast = head.
   - Loop while fast && fast.next exist:
       slow = slow.next         (1 step)
       fast = fast.next.next    (2 steps)
       if slow === fast -> cycle exists, return true.
   - If fast reaches null/undefined -> no cycle, return false.

5) getStartCircularPoint()  — Phase 1 + Phase 2
   - Phase 1: same as above; once slow === fast, cycle confirmed.
   - Phase 2 (the math trick):
       Reset slow = head.
       Move both slow and fast one step at a time.
       The node where they meet is the START of the cycle.
   - Returns the value at that start node.

WHY PHASE 2 WORKS (math intuition):
   Let L = distance from head to cycle start.
   Let C = length of the cycle.
   Let m = distance from cycle start to the meeting point.
   When slow and fast first meet inside the loop, slow has traveled L + m
   steps, fast has traveled 2(L + m) steps, and the difference 2(L+m)-(L+m)=L+m
   is a multiple of C. So L ≡ -m (mod C), i.e. moving L more steps from the
   meeting point lands on the cycle start. Therefore restarting slow at head
   and advancing both by 1 makes them meet exactly at the cycle start.

================================================================================
STEP-BY-STEP DRY RUN (this exact list):
================================================================================

List built: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> (back to 1)
Cycle start node value: 1

--- view() ---
Walk from head (0). Push values: [0,1,2,3,4,5,6]. When current advances to
tail (node 6) again? Actually: starts at head(0), pushes 0, current=1; push 1,
current=2; ... push 6, current=tail.next=node1; check `tail === current` ->
node6 !== node1, loop continues. push 1 again? Let's trace carefully:
   Iteration: push current.value, then current=current.next, then break check.
   - current=0 -> push 0 -> current=1 -> 1!==tail -> continue
   - current=1 -> push 1 -> current=2 -> 2!==tail -> continue
   - current=2 -> push 2 -> current=3 -> 3!==tail -> continue
   - current=3 -> push 3 -> current=4 -> 4!==tail -> continue
   - current=4 -> push 4 -> current=5 -> 5!==tail -> continue
   - current=5 -> push 5 -> current=6 -> 6===tail -> BREAK
   Output: [0,1,2,3,4,5]   (note: 6 is never pushed because the break fires
   before the next iteration's push)

--- hasCircular() ---
slow=0, fast=0
 step1: slow=1, fast=2 (1!==2)
 step2: slow=2, fast=4 (2!==4)
 step3: slow=3, fast=6 (3!==6)
 step4: slow=4, fast=2 (fast: 6->1->2) (4!==2)
 step5: slow=5, fast=4 (5!==4)
 step6: slow=6, fast=6 -> MATCH -> return true

--- getStartCircularPoint() ---
Phase 1 same as above; meeting at node 6.
Phase 2: slow = head (0), fast = node 6.
 step1: slow=1, fast=1 (fast: 6->1) -> MATCH -> return slow.value = 1
Correct: cycle starts at node with value 1.

NO-CYCLE CASE (hypothetical):
If tail.next stayed null:
 hasCircular: fast eventually becomes null/undefined -> while exits -> return false.
 getStartCircularPoint: same -> returns null.

================================================================================
WHEN TO USE:
================================================================================
- Detect cycles in singly linked lists.
- Detect cycles in any iterated function f(x) that maps a value to a "next"
  value (e.g. Happy Number problem, finding duplicate in array via index
  redirection — LeetCode 287).
- Constant-extra-memory cycle detection (better than hash-set approach when
  memory is constrained).

REAL-LIFE APPLICATIONS:
- Detecting infinite loops in pointer-based data structures.
- Detecting duplicate entries in arrays where values are within [1..n] using
  index chasing (LeetCode "Find the Duplicate Number").
- Pseudo-random number generator cycle detection.
- Detecting deadlock-like cycles in dependency graphs treated as next-function
  iterations.
- Cryptographic / number-theoretic algorithms (Pollard's rho factorization
  uses Floyd's cycle detection at its core).
- Detecting loops in object reference chains during serialization.

================================================================================
TIME & SPACE COMPLEXITY:
================================================================================
hasCircular():
  Time:  O(N) where N = number of nodes. Worst case fast pointer traverses
         the non-cyclic prefix once and goes around the cycle at most once.
  Space: O(1) — only two pointers.

getStartCircularPoint():
  Time:  O(N) — Phase 1 is O(N), Phase 2 walks at most N more nodes.
  Space: O(1).

Compared to a HashSet-based detector (O(N) time, O(N) space), Floyd's wins on
memory while matching asymptotic time.
================================================================================
*/
