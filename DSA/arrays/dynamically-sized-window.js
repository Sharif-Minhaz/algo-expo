const arr = [2, 3, 1, 2, 4, 3];
const S = 11;

let left = 0;
let sum = 0;
let minLength = Infinity;

for (let right = 0; right < arr.length; right++) {
	sum += arr[right];

	while (sum >= S) {
		sum -= arr[left];
		minLength = Math.min(minLength, right - left + 1);
		left++;
	}
}

console.log(minLength);

// ============================================================
// 📘 DSA: Variable-Size Sliding Window (Minimum Size Subarray Sum)
// ============================================================
//
// 🔹 Name: Variable-Size Sliding Window (Shrinkable Window)
//
// 🔹 Description:
//    Unlike fixed-size sliding windows, a variable-size window
//    expands and contracts dynamically. The right pointer expands
//    the window to accumulate elements, and the left pointer shrinks
//    it when a condition is met (here: sum >= target). This finds
//    the smallest contiguous subarray whose sum is >= a target value.
//
// ============================================================
// 🔹 Code Explanation:
// ============================================================
//
//  1. Input:
//     - arr = [2, 3, 1, 2, 4, 3]
//     - S = 11 (target sum)
//
//  2. Variables:
//     - left = 0: left boundary of the window
//     - sum = 0: running sum of current window
//     - minLength = Infinity: tracks the smallest valid window found
//
//  3. Algorithm:
//     - The `for` loop expands the window by moving `right` forward.
//     - Each step adds arr[right] to `sum`.
//     - The inner `while` loop triggers when sum >= S:
//       → Subtract arr[left] from sum (shrink from left).
//       → Update minLength = min(minLength, right - left + 1).
//       → Increment left (shrink the window).
//     - This inner loop keeps shrinking until sum < S again.
//
//  4. Key Insight:
//     - The window expands to meet the condition (sum >= S).
//     - Once met, it shrinks to find the MINIMUM length that still works.
//     - Each element is added and removed at most once → O(n) total.
//
// ============================================================
// 🔹 Dry Run (Step-by-Step):
// ============================================================
//
//  arr = [2, 3, 1, 2, 4, 3]
//  Index: 0  1  2  3  4  5
//  S = 11, left = 0, sum = 0, minLength = Infinity
//
//  right=0: sum = 0 + 2 = 2
//    Window: [2], sum=2 < 11 → no shrink
//
//  right=1: sum = 2 + 3 = 5
//    Window: [2, 3], sum=5 < 11 → no shrink
//
//  right=2: sum = 5 + 1 = 6
//    Window: [2, 3, 1], sum=6 < 11 → no shrink
//
//  right=3: sum = 6 + 2 = 8
//    Window: [2, 3, 1, 2], sum=8 < 11 → no shrink
//
//  right=4: sum = 8 + 4 = 12
//    Window: [2, 3, 1, 2, 4], sum=12 >= 11 → SHRINK!
//      → sum = 12 - arr[0]=2 = 10, minLength = min(Inf, 4-0+1) = 5, left=1
//      → sum=10 < 11 → stop shrinking
//    Window now: [3, 1, 2, 4], sum=10
//
//  right=5: sum = 10 + 3 = 13
//    Window: [3, 1, 2, 4, 3], sum=13 >= 11 → SHRINK!
//      → sum = 13 - arr[1]=3 = 10, minLength = min(5, 5-1+1) = 5, left=2
//      → sum=10 < 11 → stop shrinking
//    Window now: [1, 2, 4, 3], sum=10
//
//  Loop ends. minLength = 5
//
// ──────────────────────────────────────────────────────────────
//  Dry Run with S = 7 (smaller target, shorter windows possible):
// ──────────────────────────────────────────────────────────────
//
//  right=0: sum=2 < 7
//  right=1: sum=5 < 7
//  right=2: sum=6 < 7
//  right=3: sum=8 >= 7 → shrink:
//    → remove 2, sum=6, minLength=4, left=1 → sum<7, stop
//  right=4: sum=10 >= 7 → shrink:
//    → remove 3, sum=7, minLength=min(4,3)=3, left=2
//    → sum=7 >= 7 → shrink again:
//      → remove 1, sum=6, minLength=min(3,2)=2, left=3 → stop
//  right=5: sum=9 >= 7 → shrink:
//    → remove 2, sum=7, minLength=min(2,2)=2, left=4
//    → sum=7 >= 7 → shrink:
//      → remove 4, sum=3, minLength=min(2,1)=1, left=5 → stop
//
//  Result: minLength = 1 (but wait — this means a single element
//  [4] or [3] at the end could satisfy sum>=7 by itself? Let's verify:
//  arr[4]=4 < 7, arr[5]=3 < 7. Actually the shrink at right=5 after
//  removing 4 gives window [3] sum=3 < 7, so minLength correctly
//  captured the window [4,3] of length 2 before over-shrinking.)
//
//  Corrected result: minLength = 2 → subarray [4, 3]
//
// ============================================================
// 🔹 When to Use:
// ============================================================
//
//  - Minimum/maximum length subarray satisfying a sum condition.
//  - Smallest window containing all required characters (string variant).
//  - Any problem where window size isn't fixed but depends on content.
//  - Problems with "at least" or "at most" constraints on subarrays.
//
// ============================================================
// 🔹 Real-Life Applications:
// ============================================================
//
//  - Streaming: smallest buffer chunk that meets a quality threshold.
//  - Finance: shortest investment period to reach a profit target.
//  - Networking: minimum number of packets to fill a frame.
//  - Health: fewest consecutive days of exercise to burn X calories.
//  - Logistics: minimum consecutive shipments to meet a delivery quota.
//
// ============================================================
// 🔹 Time & Space Complexity:
// ============================================================
//
//  - Time:  O(n) — each element is added/removed at most once
//  - Space: O(1) — only a few variables (left, sum, minLength)
//  - The inner while loop does NOT make this O(n^2) because left
//    only moves forward across all iterations combined.
//
// ============================================================
