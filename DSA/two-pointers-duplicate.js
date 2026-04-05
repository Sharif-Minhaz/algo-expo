const myArr = [2, 4, 15, 4, 4, 9, 1, 5, 15, 5, 6, 7, 7, 9, 9]; // unsorted

function removeDuplicatePlaceItems(arr) {
	let slow = 0;

	for (let fast = 1; fast < arr.length; fast++) {
		if (arr[slow] !== arr[fast]) {
			slow++;
			arr[slow] = arr[fast];
		}
	}

	return slow + 1;
}

const sortedArray = [...myArr].sort((a, b) => a - b);

const slow = removeDuplicatePlaceItems(sortedArray);
console.log(sortedArray.slice(0, slow));

console.log([...new Set(sortedArray)]);

// ============================================================
// 📘 DSA: Two Pointers — Remove Duplicates (Same Direction)
// ============================================================
//
// 🔹 Name: Two Pointers Technique (Fast & Slow Pointer)
//
// 🔹 Description:
//    The Two Pointers technique uses two indices that move through
//    the array in the same direction. A "slow" pointer tracks the
//    position of the last unique element, while a "fast" pointer
//    scans ahead to find the next unique value. This is used to
//    remove duplicates from a sorted array in-place (O(1) extra space).
//
// ============================================================
// 🔹 Code Explanation:
// ============================================================
//
//  1. Input Array:
//     - myArr = [2, 4, 15, 4, 4, 9, 1, 5, 15, 5, 6, 7, 7, 9, 9]
//     - This is unsorted, so it's first sorted before processing.
//     - sortedArray = [1, 2, 4, 4, 4, 5, 5, 6, 7, 7, 9, 9, 9, 15, 15]
//
//  2. removeDuplicatePlaceItems(arr):
//     - `slow` starts at index 0 (first element is always unique).
//     - `fast` starts at index 1 and scans through the entire array.
//     - If arr[slow] !== arr[fast]:
//       → A new unique element is found.
//       → Increment `slow`.
//       → Place arr[fast] at arr[slow] (overwrite duplicate zone).
//     - If arr[slow] === arr[fast]:
//       → It's a duplicate, skip it (only `fast` advances).
//     - Returns `slow + 1` = count of unique elements.
//
//  3. Output:
//     - sortedArray.slice(0, slow) gives the unique portion.
//     - [...new Set(sortedArray)] is shown as an alternative approach.
//
// ============================================================
// 🔹 Dry Run (Step-by-Step):
// ============================================================
//
//  sortedArray = [1, 2, 4, 4, 4, 5, 5, 6, 7, 7, 9, 9, 9, 15, 15]
//  Index:        0  1  2  3  4  5  6  7  8  9 10 11 12  13  14
//
//  Initial: slow = 0, fast = 1
//
//  fast=1:  arr[0]=1 !== arr[1]=2  → slow=1, arr[1]=2
//           Array: [1, 2, 4, 4, 4, 5, 5, 6, 7, 7, 9, 9, 9, 15, 15]
//
//  fast=2:  arr[1]=2 !== arr[2]=4  → slow=2, arr[2]=4
//           Array: [1, 2, 4, 4, 4, 5, 5, 6, 7, 7, 9, 9, 9, 15, 15]
//
//  fast=3:  arr[2]=4 === arr[3]=4  → duplicate, skip
//
//  fast=4:  arr[2]=4 === arr[4]=4  → duplicate, skip
//
//  fast=5:  arr[2]=4 !== arr[5]=5  → slow=3, arr[3]=5
//           Array: [1, 2, 4, 5, 4, 5, 5, 6, 7, 7, 9, 9, 9, 15, 15]
//
//  fast=6:  arr[3]=5 === arr[6]=5  → duplicate, skip
//
//  fast=7:  arr[3]=5 !== arr[7]=6  → slow=4, arr[4]=6
//           Array: [1, 2, 4, 5, 6, 5, 5, 6, 7, 7, 9, 9, 9, 15, 15]
//
//  fast=8:  arr[4]=6 !== arr[8]=7  → slow=5, arr[5]=7
//           Array: [1, 2, 4, 5, 6, 7, 5, 6, 7, 7, 9, 9, 9, 15, 15]
//
//  fast=9:  arr[5]=7 === arr[9]=7  → duplicate, skip
//
//  fast=10: arr[5]=7 !== arr[10]=9 → slow=6, arr[6]=9
//           Array: [1, 2, 4, 5, 6, 7, 9, 6, 7, 7, 9, 9, 9, 15, 15]
//
//  fast=11: arr[6]=9 === arr[11]=9 → duplicate, skip
//
//  fast=12: arr[6]=9 === arr[12]=9 → duplicate, skip
//
//  fast=13: arr[6]=9 !== arr[13]=15 → slow=7, arr[7]=15
//           Array: [1, 2, 4, 5, 6, 7, 9, 15, 7, 7, 9, 9, 9, 15, 15]
//
//  fast=14: arr[7]=15 === arr[14]=15 → duplicate, skip
//
//  Return: slow + 1 = 8 (8 unique elements)
//  Output: sortedArray.slice(0, 8) → [1, 2, 4, 5, 6, 7, 9, 15]
//  Set alternative: [1, 2, 4, 5, 6, 7, 9, 15] (same result)
//
// ============================================================
// 🔹 When to Use:
// ============================================================
//
//  - Removing duplicates from a sorted array in-place.
//  - When you need O(1) extra space (no new array/set allowed).
//  - Problems requiring partitioning an array by some condition.
//  - Moving specific elements (like zeros) to the end of an array.
//
// ============================================================
// 🔹 Real-Life Applications:
// ============================================================
//
//  - Database deduplication: removing duplicate rows after sorting.
//  - Contact list cleanup: merging duplicate entries.
//  - Log processing: filtering repeated log entries in sorted logs.
//  - Search suggestions: ensuring no duplicate terms appear.
//  - Playlist management: removing duplicate songs from a sorted list.
//
// ============================================================
// 🔹 Time & Space Complexity:
// ============================================================
//
//  - Time:  O(n) — single pass through the array
//  - Space: O(1) — in-place modification, no extra array
//  - (Sorting step is O(n log n), but the two-pointer part is O(n))
//
// ============================================================
