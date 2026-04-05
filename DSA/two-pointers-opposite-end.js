const arr = [2, 23, 33, 37, 43, 59];

function getTwoPointerOutput(value) {
	if (!value || typeof value !== "number") return [];

	let leftIndex = 0;
	let rightIndex = arr.length - 1;

	while (leftIndex !== rightIndex) {
		const sum = arr[leftIndex] + arr[rightIndex];
		if (sum > value) {
			rightIndex--;
		} else if (sum < value) {
			leftIndex++;
		} else if (sum === value) {
			return [arr[leftIndex], arr[rightIndex]];
		}
	}

	return [];
}

console.log(getTwoPointerOutput(66));

// ============================================================
// 📘 DSA: Two Pointers — Opposite End (Two Sum in Sorted Array)
// ============================================================
//
// 🔹 Name: Two Pointers Technique (Opposite Direction / Converging Pointers)
//
// 🔹 Description:
//    This variant of the Two Pointers technique places one pointer
//    at the start (left) and one at the end (right) of a SORTED array.
//    The pointers move toward each other based on whether the current
//    sum is too large or too small compared to the target. This finds
//    a pair of elements that sum to a given target value in O(n) time.
//
// ============================================================
// 🔹 Code Explanation:
// ============================================================
//
//  1. Input:
//     - arr = [2, 23, 33, 37, 43, 59] (sorted in ascending order)
//     - Target value is passed as parameter (e.g., 66)
//
//  2. getTwoPointerOutput(value):
//     - Guard clause: returns [] if value is falsy or not a number.
//     - leftIndex starts at 0 (smallest element).
//     - rightIndex starts at arr.length - 1 (largest element).
//     - Loop runs while leftIndex !== rightIndex:
//       → Compute sum = arr[leftIndex] + arr[rightIndex].
//       → If sum > value: the sum is too big, move rightIndex left (decrease sum).
//       → If sum < value: the sum is too small, move leftIndex right (increase sum).
//       → If sum === value: found the pair! Return both elements.
//     - If no pair found, return [].
//
//  3. Why it works:
//     - Array MUST be sorted for this to work.
//     - Moving left pointer right increases the sum.
//     - Moving right pointer left decreases the sum.
//     - This guarantees we explore all possible pairs efficiently.
//
// ============================================================
// 🔹 Dry Run (Step-by-Step):
// ============================================================
//
//  arr = [2, 23, 33, 37, 43, 59]
//  Index: 0   1   2   3   4   5
//  Target = 66
//
//  Initial: leftIndex = 0, rightIndex = 5
//
//  Iteration 1:
//    sum = arr[0] + arr[5] = 2 + 59 = 61
//    61 < 66 → sum too small → leftIndex++ → leftIndex = 1
//
//  Iteration 2:
//    sum = arr[1] + arr[5] = 23 + 59 = 82
//    82 > 66 → sum too big → rightIndex-- → rightIndex = 4
//
//  Iteration 3:
//    sum = arr[1] + arr[4] = 23 + 43 = 66
//    66 === 66 → MATCH FOUND!
//    Return [23, 43]
//
//  Output: [23, 43]
//
// ──────────────────────────────────────────────────────────────
//  Dry Run with NO match (target = 100):
// ──────────────────────────────────────────────────────────────
//
//  Initial: leftIndex = 0, rightIndex = 5
//
//  Iteration 1: 2 + 59 = 61 < 100 → leftIndex = 1
//  Iteration 2: 23 + 59 = 82 < 100 → leftIndex = 2
//  Iteration 3: 33 + 59 = 92 < 100 → leftIndex = 3
//  Iteration 4: 37 + 59 = 96 < 100 → leftIndex = 4
//  Iteration 5: 43 + 59 = 102 > 100 → rightIndex = 4
//
//  leftIndex (4) === rightIndex (4) → loop ends
//  Return []  (no pair sums to 100)
//
// ============================================================
// 🔹 When to Use:
// ============================================================
//
//  - Finding two numbers in a sorted array that sum to a target.
//  - Checking if a pair satisfies a condition (sum, difference, product).
//  - Problems involving palindrome checking on strings/arrays.
//  - Container with most water, trapping rain water problems.
//
// ============================================================
// 🔹 Real-Life Applications:
// ============================================================
//
//  - Financial: finding two transactions that sum to a specific amount.
//  - E-commerce: finding two items whose prices add up to a budget.
//  - Scheduling: finding two time slots that together fill a gap.
//  - Chemistry: finding two reagent quantities that reach a target mass.
//  - Gaming: matching two players whose skill ratings sum to a threshold.
//
// ============================================================
// 🔹 Time & Space Complexity:
// ============================================================
//
//  - Time:  O(n) — each pointer moves at most n steps total
//  - Space: O(1) — only two index variables used
//  - Prerequisite: array must be sorted (sorting is O(n log n))
//
// ============================================================
