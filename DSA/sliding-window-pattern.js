const arr = [2, 4, 48, 23, 8, 33, 90, 12, 54, 134];
const availableWindow = 3;

function getSlidingWindowOutput() {
	let prevValue = arr.slice(0, availableWindow).reduce((prev, cur) => prev + cur, 0);
	let maxSum = prevValue;

	for (let i = 1; i <= arr.length - availableWindow; i++) {
		const currSum = prevValue - arr[i - 1] + arr[i + availableWindow - 1];
		prevValue = currSum;
		maxSum = Math.max(currSum, maxSum);
	}

	return maxSum;
}

console.log(getSlidingWindowOutput());

// ============================================================
// 📘 DSA: Fixed-Size Sliding Window (Maximum Sum Subarray)
// ============================================================
//
// 🔹 Name: Sliding Window Pattern (Fixed Window Size)
//
// 🔹 Description:
//    The Fixed-Size Sliding Window technique maintains a "window"
//    of a fixed number of consecutive elements and slides it across
//    the array one position at a time. Instead of recalculating
//    the sum from scratch for each window position, it subtracts
//    the element leaving the window and adds the element entering it.
//    This reduces time from O(n*k) brute force to O(n).
//
// ============================================================
// 🔹 Code Explanation:
// ============================================================
//
//  1. Input:
//     - arr = [2, 4, 48, 23, 8, 33, 90, 12, 54, 134]
//     - availableWindow = 3 (window size / number of consecutive elements)
//
//  2. getSlidingWindowOutput():
//     - First, compute the sum of the initial window (first 3 elements):
//       → arr.slice(0, 3).reduce(...) = 2 + 4 + 48 = 54
//       → prevValue = 54, maxSum = 54
//
//     - Then slide the window from index 1 to (arr.length - availableWindow):
//       → For each new position i:
//         currSum = prevValue - arr[i - 1] + arr[i + availableWindow - 1]
//         (subtract the element that left, add the element that entered)
//       → Update prevValue = currSum
//       → Update maxSum = Math.max(currSum, maxSum)
//
//     - Return maxSum (the maximum sum found across all windows).
//
//  3. Key Insight:
//     - arr[i - 1] is the element LEAVING the window (left side).
//     - arr[i + availableWindow - 1] is the element ENTERING (right side).
//     - This "slide" operation is O(1) per step instead of O(k).
//
// ============================================================
// 🔹 Dry Run (Step-by-Step):
// ============================================================
//
//  arr = [2, 4, 48, 23, 8, 33, 90, 12, 54, 134]
//  Index: 0  1   2   3  4   5   6   7   8    9
//  Window size = 3
//
//  Step 0 (Initial window):
//    Window: [2, 4, 48] (indices 0-2)
//    prevValue = 2 + 4 + 48 = 54
//    maxSum = 54
//
//  Step 1 (i=1): Slide window to indices 1-3
//    Remove arr[0]=2, Add arr[3]=23
//    currSum = 54 - 2 + 23 = 75
//    Window: [4, 48, 23]
//    prevValue = 75, maxSum = max(75, 54) = 75
//
//  Step 2 (i=2): Slide window to indices 2-4
//    Remove arr[1]=4, Add arr[4]=8
//    currSum = 75 - 4 + 8 = 79
//    Window: [48, 23, 8]
//    prevValue = 79, maxSum = max(79, 75) = 79
//
//  Step 3 (i=3): Slide window to indices 3-5
//    Remove arr[2]=48, Add arr[5]=33
//    currSum = 79 - 48 + 33 = 64
//    Window: [23, 8, 33]
//    prevValue = 64, maxSum = max(64, 79) = 79
//
//  Step 4 (i=4): Slide window to indices 4-6
//    Remove arr[3]=23, Add arr[6]=90
//    currSum = 64 - 23 + 90 = 131
//    Window: [8, 33, 90]
//    prevValue = 131, maxSum = max(131, 79) = 131
//
//  Step 5 (i=5): Slide window to indices 5-7
//    Remove arr[4]=8, Add arr[7]=12
//    currSum = 131 - 8 + 12 = 135
//    Window: [33, 90, 12]
//    prevValue = 135, maxSum = max(135, 131) = 135
//
//  Step 6 (i=6): Slide window to indices 6-8
//    Remove arr[5]=33, Add arr[8]=54
//    currSum = 135 - 33 + 54 = 156
//    Window: [90, 12, 54]
//    prevValue = 156, maxSum = max(156, 135) = 156
//
//  Step 7 (i=7): Slide window to indices 7-9
//    Remove arr[6]=90, Add arr[9]=134
//    currSum = 156 - 90 + 134 = 200
//    Window: [12, 54, 134]
//    prevValue = 200, maxSum = max(200, 156) = 200
//
//  Return: 200
//  Output: 200 (the max sum of any 3 consecutive elements)
//
// ============================================================
// 🔹 When to Use:
// ============================================================
//
//  - Maximum/minimum sum of k consecutive elements.
//  - Average of all subarrays of size k.
//  - Finding a specific pattern within a fixed-length substring.
//  - Any problem where a fixed-size contiguous block slides over data.
//
// ============================================================
// 🔹 Real-Life Applications:
// ============================================================
//
//  - Stock market: best 3-day / 7-day moving average.
//  - Network monitoring: max throughput over a fixed time window.
//  - Weather: average temperature over the last N days.
//  - Gaming: highest score across N consecutive rounds.
//  - Streaming: buffering metrics over fixed time intervals.
//
// ============================================================
// 🔹 Time & Space Complexity:
// ============================================================
//
//  - Time:  O(n) — single pass after initial window sum
//  - Space: O(1) — only a few variables used
//  - vs. Brute Force: O(n*k) → this is a major improvement
//
// ============================================================
