const text = "abcdablmcbac";

let left = 0;
const seenList = new Map();
let max = 0;

for (let right = 0; right < text.length; right++) {
	const currentChar = text.charAt(right);

	if (seenList.has(currentChar) && seenList.get(currentChar) >= left) {
		left = seenList.get(currentChar) + 1;
	}

	max = Math.max(max, right - left + 1);
	seenList.set(currentChar, right);
}

console.log(max);

// ============================================================
// 📘 DSA: Variable-Size Sliding Window (Longest Substring Without
//         Repeating Characters)
// ============================================================
//
// 🔹 Name: Variable-Size Sliding Window with HashMap
//
// 🔹 Description:
//    This technique finds the longest substring without repeating
//    characters. It uses a sliding window (left/right pointers) combined
//    with a HashMap (Map) to track where each character was last seen.
//    When a repeat is detected within the current window, the left
//    pointer jumps past the previous occurrence, shrinking the window.
//
// ============================================================
// 🔹 Code Explanation:
// ============================================================
//
//  1. Input:
//     - text = "abcdablmcbac"
//
//  2. Variables:
//     - left = 0: left boundary of the current window
//     - seenList = new Map(): stores { character → last index seen }
//     - max = 0: tracks the longest valid window found
//
//  3. Algorithm:
//     - The `for` loop moves `right` from 0 to text.length - 1.
//     - At each step, get currentChar = text.charAt(right).
//     - Check if currentChar exists in seenList AND its stored index >= left:
//       → If YES: this char is a duplicate WITHIN the current window.
//         Move left to seenList.get(currentChar) + 1 (skip past the duplicate).
//       → If NO: the char is either new or its last occurrence is outside
//         the current window (before `left`), so no conflict.
//     - Update max = Math.max(max, right - left + 1).
//     - Store/update currentChar's position: seenList.set(currentChar, right).
//
//  4. Key Insight:
//     - The condition `seenList.get(currentChar) >= left` is crucial.
//       Without it, we'd falsely shrink the window for characters that
//       were seen before `left` (already excluded from the window).
//     - The left pointer only moves FORWARD, never backward → O(n).
//
// ============================================================
// 🔹 Dry Run (Step-by-Step):
// ============================================================
//
//  text = "abcdablmcbac"
//  Index:  0 1 2 3 4 5 6 7 8 9 10 11
//  left = 0, max = 0, seenList = {}
//
//  right=0, char='a':
//    'a' not in seenList → no conflict
//    max = max(0, 0-0+1) = 1
//    seenList = { a:0 }
//    Window: "a"
//
//  right=1, char='b':
//    'b' not in seenList → no conflict
//    max = max(1, 1-0+1) = 2
//    seenList = { a:0, b:1 }
//    Window: "ab"
//
//  right=2, char='c':
//    'c' not in seenList → no conflict
//    max = max(2, 2-0+1) = 3
//    seenList = { a:0, b:1, c:2 }
//    Window: "abc"
//
//  right=3, char='d':
//    'd' not in seenList → no conflict
//    max = max(3, 3-0+1) = 4
//    seenList = { a:0, b:1, c:2, d:3 }
//    Window: "abcd"
//
//  right=4, char='a':
//    'a' IS in seenList, index=0, 0 >= left(0) → DUPLICATE!
//    left = 0 + 1 = 1
//    max = max(4, 4-1+1) = 4
//    seenList = { a:4, b:1, c:2, d:3 }
//    Window: "bcda"
//
//  right=5, char='b':
//    'b' IS in seenList, index=1, 1 >= left(1) → DUPLICATE!
//    left = 1 + 1 = 2
//    max = max(4, 5-2+1) = 4
//    seenList = { a:4, b:5, c:2, d:3 }
//    Window: "cdab"
//
//  right=6, char='l':
//    'l' not in seenList → no conflict
//    max = max(4, 6-2+1) = 5
//    seenList = { a:4, b:5, c:2, d:3, l:6 }
//    Window: "cdabl"
//
//  right=7, char='m':
//    'm' not in seenList → no conflict
//    max = max(5, 7-2+1) = 6
//    seenList = { a:4, b:5, c:2, d:3, l:6, m:7 }
//    Window: "cdablm"
//
//  right=8, char='c':
//    'c' IS in seenList, index=2, 2 >= left(2) → DUPLICATE!
//    left = 2 + 1 = 3
//    max = max(6, 8-3+1) = 6
//    seenList = { a:4, b:5, c:8, d:3, l:6, m:7 }
//    Window: "dablmc"
//
//  right=9, char='b':
//    'b' IS in seenList, index=5, 5 >= left(3) → DUPLICATE!
//    left = 5 + 1 = 6
//    max = max(6, 9-6+1) = 6
//    seenList = { a:4, b:9, c:8, d:3, l:6, m:7 }
//    Window: "lmcb"
//
//  right=10, char='a':
//    'a' IS in seenList, index=4, 4 >= left(6)? NO (4 < 6)
//    → 'a' was seen before but OUTSIDE current window → no conflict!
//    max = max(6, 10-6+1) = 6
//    seenList = { a:10, b:9, c:8, d:3, l:6, m:7 }
//    Window: "lmcba"
//
//  right=11, char='c':
//    'c' IS in seenList, index=8, 8 >= left(6) → DUPLICATE!
//    left = 8 + 1 = 9
//    max = max(6, 11-9+1) = 6
//    seenList = { a:10, b:9, c:11, d:3, l:6, m:7 }
//    Window: "bac"
//
//  Loop ends. max = 6
//  Output: 6 (longest substring without repeating chars: "cdablm")
//
// ============================================================
// 🔹 When to Use:
// ============================================================
//
//  - Longest/shortest substring with unique characters.
//  - Longest substring with at most K distinct characters.
//  - Finding the smallest window containing all characters of a pattern.
//  - Any string problem where duplicates define window boundaries.
//
// ============================================================
// 🔹 Real-Life Applications:
// ============================================================
//
//  - Password validation: ensuring no repeating character sequences.
//  - DNA sequencing: finding longest unique nucleotide sequences.
//  - Text editors: auto-complete suggesting unique character runs.
//  - Network security: detecting unique packet sequences in streams.
//  - URL slug generation: finding the longest unique substring for slugs.
//
// ============================================================
// 🔹 Time & Space Complexity:
// ============================================================
//
//  - Time:  O(n) — single pass, left pointer only moves forward
//  - Space: O(min(n, m)) — where m is the character set size
//           (e.g., 26 for lowercase English, 128 for ASCII)
//  - The Map stores at most one entry per unique character.
//
// ============================================================
