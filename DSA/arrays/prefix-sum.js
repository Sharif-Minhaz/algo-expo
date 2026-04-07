function buildPrefix(arr) {
	const prefixArr = [0];

	for (let i = 0; i < arr.length; i++) {
		prefixArr.push(arr[i] + prefixArr[i]);
	}

	return prefixArr;
}

function sumRange(arr, lefIndex, rightIndex) {
	const result = arr[rightIndex + 1] - arr[lefIndex];

	return result;
}

const prefix = buildPrefix([1, 4, 2, 5, 6, 3, 9]);
console.log(prefix);

const sum = sumRange(prefix, 2, 5);

console.log(sum);

// ============================================================
// DSA Name: Prefix Sum (Cumulative Sum)
// ============================================================
//
// Description:
// Prefix Sum is a technique where we precompute a cumulative sum
// array so that any range sum query (sum of elements from index
// L to R) can be answered in O(1) time. The prefix array stores
// the running total of all elements up to (but not including)
// each index, with a leading 0 to simplify boundary calculations.
//
// ============================================================
// Code Explanation:
// ============================================================
//
// buildPrefix(arr):
//   - Initializes prefixArr with [0] (a sentinel element so that
//     prefixArr[i] = sum of arr[0..i-1]).
//   - Iterates through arr; at each step, pushes the sum of the
//     current element arr[i] plus the previous prefix prefixArr[i].
//   - Returns an array of length arr.length + 1.
//
// sumRange(arr, lefIndex, rightIndex):
//   - Takes the precomputed prefix array and two indices (L, R)
//     representing a range in the ORIGINAL array.
//   - Returns arr[rightIndex + 1] - arr[lefIndex], which equals
//     the sum of original elements from index L to R (inclusive).
//   - This works because:
//       prefix[R+1] = arr[0] + arr[1] + ... + arr[R]
//       prefix[L]   = arr[0] + arr[1] + ... + arr[L-1]
//       prefix[R+1] - prefix[L] = arr[L] + arr[L+1] + ... + arr[R]
//
// ============================================================
// Step-by-Step Dry Run:
// ============================================================
//
// Input array: [1, 4, 2, 5, 6, 3, 9]
//               0  1  2  3  4  5  6    (indices)
//
// --- buildPrefix([1, 4, 2, 5, 6, 3, 9]) ---
//
// Start: prefixArr = [0]
//
// i=0: arr[0]=1, prefixArr[0]=0  → push 1+0 = 1   → [0, 1]
// i=1: arr[1]=4, prefixArr[1]=1  → push 4+1 = 5   → [0, 1, 5]
// i=2: arr[2]=2, prefixArr[2]=5  → push 2+5 = 7   → [0, 1, 5, 7]
// i=3: arr[3]=5, prefixArr[3]=7  → push 5+7 = 12  → [0, 1, 5, 7, 12]
// i=4: arr[4]=6, prefixArr[4]=12 → push 6+12 = 18 → [0, 1, 5, 7, 12, 18]
// i=5: arr[5]=3, prefixArr[5]=18 → push 3+18 = 21 → [0, 1, 5, 7, 12, 18, 21]
// i=6: arr[6]=9, prefixArr[6]=21 → push 9+21 = 30 → [0, 1, 5, 7, 12, 18, 21, 30]
//
// Result: prefix = [0, 1, 5, 7, 12, 18, 21, 30]
//                   0  1  2  3   4   5   6   7   (prefix indices)
//
// --- sumRange(prefix, 2, 5) ---
//
// We want the sum of original arr[2..5] = 2 + 5 + 6 + 3 = 16
//
// result = prefix[5 + 1] - prefix[2]
//        = prefix[6] - prefix[2]
//        = 21 - 5
//        = 16  ✓
//
// --- Additional dry run: sumRange(prefix, 0, 6) — full array sum ---
//
// result = prefix[6 + 1] - prefix[0]
//        = prefix[7] - prefix[0]
//        = 30 - 0
//        = 30  (1+4+2+5+6+3+9 = 30)  ✓
//
// --- Additional dry run: sumRange(prefix, 3, 3) — single element ---
//
// result = prefix[3 + 1] - prefix[3]
//        = prefix[4] - prefix[3]
//        = 12 - 7
//        = 5  (arr[3] = 5)  ✓
//
// ============================================================
// When to Use:
// ============================================================
//
// - When you need to answer multiple range sum queries on a
//   static (non-changing) array.
// - When brute-force repeated summation would be too slow
//   (e.g., Q queries on an array of size N → O(N*Q) vs O(N+Q)).
// - Problems involving subarray sums, cumulative totals, or
//   checking whether a subarray with a given sum exists.
//
// ============================================================
// Real-Life Applications:
// ============================================================
//
// - Financial data: quickly computing total revenue/expenses
//   over any date range from daily records.
// - Image processing: summed-area tables (2D prefix sums) for
//   fast region-sum queries in pixel grids.
// - Network monitoring: cumulative packet/byte counts to find
//   traffic volume over any time interval.
// - Gaming/leaderboards: cumulative score arrays for fast
//   range-based ranking queries.
// - Database engines: precomputed aggregations for fast
//   analytical queries over ordered data.
//
// ============================================================
// Time & Space Complexity:
// ============================================================
//
// buildPrefix:
//   Time:  O(n)  — single pass through the array
//   Space: O(n)  — prefix array of size n+1
//
// sumRange:
//   Time:  O(1)  — single subtraction
//   Space: O(1)  — no extra space
//
// Overall for Q queries on array of size N:
//   Without prefix sum: O(N * Q)
//   With prefix sum:    O(N + Q)  — O(N) build + O(1) per query
// ============================================================
