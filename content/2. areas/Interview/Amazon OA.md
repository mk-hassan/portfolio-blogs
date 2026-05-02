## Count Binary Substrings (Leetcode)

Given a binary string `s`, return the number of non-empty substrings that have the same number of `0`'s and `1`'s, and all the `0`'s and all the `1`'s in these substrings are grouped consecutively.
Substrings that occur multiple times are counted the number of times they occur.

```python
class Solution:
	def countBinarySubstrings(self, s: str) -> int:
		ans, prev, counter = 0, 0, 1
		for i in range(1, len(s)):
			if s[i] != s[i-1]:
				ans += min(prev, counter)
				prev, counter = counter, 0
			counter += 1

return ans + min(prev, counter)
```

## Number of Laser Beams in a Bank (Leetcode)

Anti-theft security devices are activated inside a bank. You are given a **0-indexed** binary string array `bank` representing the floor plan of the bank, which is an `m x n` 2D matrix. `bank[i]` represents the `ith` row, consisting of `'0'`s and `'1'`s. `'0'` means the cell is empty, while`'1'` means the cell has a security device.
There is **one** laser beam between any **two** security devices **if both** conditions are met:
- The two devices are located on two **different rows**: `r1` and `r2`, where `r1 < r2`.
- For **each** row `i` where `r1 < i < r2`, there are **no security devices** in the `ith` row.
Laser beams are independent, i.e., one beam does not interfere nor join with another.
Return _the total number of laser beams in the bank_.

```python
class Solution:
	def numberOfBeams(self, bank: list[str]) -> int:
	ans = 0
	prev, curr = 0, 0
	for floor in bank:
		for c in floor:
			if c == '1':
				curr += 1
	
		if curr != 0:
			ans += prev * curr
			prev, curr = curr, 0
	
	return ans
```

## Make Array Zero by Subtracting Equal Amounts (Leetcode)

You are given a non-negative integer array `nums`. In one operation, you must:
- Choose a positive integer `x` such that `x` is less than or equal to the **smallest non-zero** element in `nums`.
- Subtract `x` from every **positive** element in `nums`.
Return _the **minimum** number of operations to make every element in_ `nums` _equal to_ `0`.

```python
class Solution:
	def minimumOperations(self, nums: List[int]) -> int:
		return len(set(nums)) - (1 if 0 in nums else 0)
```

## [Length of the Longest Valid Substring](https://leetcode.com/problems/length-of-the-longest-valid-substring/)

```python
class Solution:
	def longestValidSubstring(self, word: str, forbidden: List[str]) -> int:
	setF=set(forbidden)
	res=left=0
	for i in range (len(word)):
		for j in range (max(left,i-9),i+1):
			if word[j:i+1] in setF:
				left=j+1
		res=max(res,i-left+1)
	
	return res
```
## [Get Minimum Number of Moves (A.K.A. Weight Lifting Equipments)](https://www.fastprep.io/problems/amazon-get-min-num-moves)

Imagine you are shopping on Amazon.com for some good weight lifting equipment. The equipment you want has blocks of many different weights that you can combine to lift.
The listing on Amazon gives you an array, `blocks`, that consists of `n` different weighted blocks, in kilograms. There are no two blocks with the same weight. The element `blocks[i]` denotes the weight of the `i`th block from the top of the stack. You consider weight lifting equipment to be good if the block at the top is the lightest, and the block at the bottom is the heaviest.
More formally, the equipment with array `blocks` will be called good weight lifting equipment if it satisfies the following conditions assuming the index of the array starts from 1:
- `blocks[1]` < `blocks[i]` for all `2 ≤ i ≤ n`
- `blocks[i]` < `blocks[n]` for all `1 ≤ i ≤ n-1`
In one move, you can swap the order of adjacent blocks. Find out the minimum number of moves required to form good weight lifting equipment.
**Function Description**
Complete the function `getMinNumMoves` in the editor.
`getMinNumMoves` has the following parameter:
- `int blocks[n]`: the distinct weights
**Returns**
`int`: the minimum number of operations required

```python
class Solution:
  def getMinNumMoves(self, blocks: List[int]) -> int:
    min_idx, max_idx = 0, 0

    for idx, block in enumerate(blocks):
      if block > blocks[max_idx]:
        max_idx = idx

      if block < blocks[min_idx]:
        min_idx = idx

    return min_idx + (len(blocks)-max_idx-1) - (min_idx > max_idx)
```

##  [Find Hash (Checksum)](https://www.fastprep.io/problems/amazon-find-hash)

The developers at AWS IAM are designing a new checksum logic for an authentication module. The checksum is calculated as an array hash where `hash[i] = secretKey[i] % param[i]`. There are `n` parameters for the checksum, where the ith parameter is represented by `param[i]`. The secret key consists of `n` values, with the ith value denoted as `secretKey[i]`.
A good secret key is one that results in more distinct values in the hash array.
Given the array `param` of size `n`, determine the maximum number of possible distinct values in the hash array by selecting an appropriate `secretKey`.
**Function Description**
Complete the function `findHash` in the editor.
`findHash` has the following parameter:
	1. `int param[n]`: the different parameters needed for the checksum logic
**Returns**
	int: the maximum number of distinct elements possible in hash.

```python
class Solution:
  def findHash(self, param: List[int]) -> int:
	param.sort()
	
	answer = 0
	current = 0
	for p in param:
		if p > current:
			answer += 1
			current += 1
	return answer
```

## [Find the Median of the Uniqueness Array](https://leetcode.com/problems/find-the-median-of-the-uniqueness-array/)

```python
class Solution:
    def medianOfUniquenessArray(self, nums: List[int]) -> int:        
        n = len(nums)
        lo, hi = 0, n
        while lo < hi: 
            mid = lo + hi >> 1
            val = ii = 0 
            freq = defaultdict(int)
            for i, x in enumerate(nums): 
                freq[x] += 1
                while len(freq) > mid: 
                    freq[nums[ii]] -= 1
                    if freq[nums[ii]] == 0: freq.pop(nums[ii])
                    ii += 1
                val += i-ii+1
            if val < (n*(n+1)//2+1)//2: lo = mid + 1
            else: hi = mid 
        return lo
```

## [Count number of valid substrings](https://stackoverflow.com/questions/79507460/count-number-of-valid-substrings)

A SUBSTRING OF IS VALID IF THE COUNT OF EACH CHARACTER OF THE SUBSTRING DOESN'T EXCEED THE NUMBER OF DISTINCT CHARACTER PRESENT. FIND THE TOTAL NUMBER OF VALID SUBSTRING.

_EXAMPLE_ S = "abaa" // 8  
VALID SUBSTRING ARE: ("a","ab","aba","b","ba","baa","a","a")

```java
public class Main {
    public static long solve(String s) {
        int n = s.length();
        long count = 0;

        for (int i = 0; i < n; i++) {
            int[] freq = new int[7];
            int distinct = 0;
            int maxFreq = 0;q

            for (int j = i; j < n && j < i + 49; j++) {
                int idx = s.charAt(j) - 'a';
                freq[idx]++;
                if (freq[idx] == 1) {
                    distinct++;  // new distinct character
                }
                maxFreq = Math.max(maxFreq, freq[idx]);
                if (maxFreq <= distinct) {
                    count++;
                }
            }
        }
        return count;
    }
}
```

## [Competing robots](https://leetcode.com/discuss/post/6517334/amazon-oa-test-sde-ii-by-mr_shah-daz3/)

```python
def solve(arr):
   indices = list(range(len(arr)))
   indices.sort(key=lambda x: arr[x])

   right_most_index = 0
   prefix_sum = 0
   n = len(arr)

   for i in range(n):
       if prefix_sum < arr[indices[i]]:
           right_most_index = i
       prefix_sum += arr[indices[i]]

   print("indices:", indices)

   ans = [indices[i] + 1 for i in range(right_most_index, n)]
   return ans
```

## Server chain partitioning

The data engineers at Amazon are working on partitioning their server chains. There is a linear chain of n servers numbered from 1 to n, where the cost parameter associated with the i-th server is represented by the array cost[i]. These servers need to be partitioned into exactly k different server chains. The cost of partitioning a server chain servers[i: j] is defined as cost[i] + cost[j]. The total cost is the sum of the partitioning cost of each server chain.

Given n servers, an array cost and an integer k, find the minimum and maximum possible total cost of the operations and return them in the form of an array of size 2: \[minimum cost, maximum cost].

Note: Partitioning of an array means splitting the array sequentially into two or more parts where each element belongs to exactly one partition. For an array \[1, 2, 3, 4, 5], a valid partition would be \[\[1], \[2, 3], \[4, 5]], while \[\[1, 2], \[2, 3], \[4, 5]] and \[\[1, 3], \[2, 4, 5]] would be considered invalid partitions.

```java
public static List<Integer> findPartitionCost(List<Integer> arr, int k) {
        List<Integer> costOfPartitions = new ArrayList<>();
        
        // Calculate the cost of each partition (arr[i-1] + arr[i])
        for (int i = 1; i < arr.size(); i++) {
            costOfPartitions.add(arr.get(i - 1) + arr.get(i));
        }
        
        // Sort the partition costs
        Collections.sort(costOfPartitions);
        
        int ends = arr.get(0) + arr.get(arr.size() - 1);
        
        // Calculate min cost: smallest k-1 partitions + ends
        int minCost = ends;
        for (int i = 0; i < k - 1; i++) {
            minCost += costOfPartitions.get(i);
        }
        
        // Calculate max cost: largest k-1 partitions + ends
        int maxCost = ends;
        for (int i = costOfPartitions.size() - (k - 1); i < costOfPartitions.size(); i++) {
            maxCost += costOfPartitions.get(i);
        }
        
        return Arrays.asList(minCost, maxCost);
    }
```

```python
def solve(arr, k):
	cost = sorted(arr[i-1] + arr[i] for i in range(1, len(arr)))
	ends = arr[0] + arr[-1]
	return [end + sum(cost[:(k-1)]), end + sum(cost[-(k-1):])]
```

## [Amazon Alexa team, idle skills](https://www.fastprep.io/problems/amazon-find-idle-skills-query)

```python
from collections import Counter

def findIdleSkillsQuery(numSkills, requestLogs, queryTime, timeWindow):
    requestLogs.sort(key=lambda x: x[1])
    indexedQueries = sorted(enumerate(queryTime), key=lambda x: x[1])

    result = [0] * len(queryTime)
    skillCounter = Counter()

    left = 0
    right = 0
    n = len(requestLogs)

    for i, endTime in indexedQueries:
        start = endTime - timeWindow

        # Move right to include logs <= t
        while right < n and requestLogs[right][1] <= endTime:
            skillCounter[requestLogs[right][0]] += 1
            right += 1

        # Move left to exclude logs < start
        while left < n and requestLogs[left][1] < start:
            skillCounter[requestLogs[left][0]] -= 1
            if skillCounter[requestLogs[left][0]] == 0:
                del skillCounter[requestLogs[left][0]]
            left += 1

        # Total idle = numSkills - number of unique skills in window
        result[i] = numSkills - len(skillCounter)

    return result
```

## Count Possible Winners

Amazon Shopping is running a reward collection event for its customers.

There are n customers and the i-th customer has collected initialRewards[i] points so far.

One final tournament is to take place where:

- The champion earns n additional points
- The second place earns n - 1 points
- The third place earns n - 2 points
- … and the last place earns 1 point

Given an integer array initialRewards of length n, representing the initial reward points of the customers before the final tournament:

Find the number of customers i (1 ≤ i ≤ n) such that, if the i-th customer wins the final tournament, they would have the highest total points.

**Note -**

The total points = initialRewards[i] + n (if they win). Other customers also get points in the tournament depending on their ranks (from n - 1 to 1). You must check if the i-th customer, upon winning, ends up with the highest total score, regardless of how others place.

```python
class Solution:
  def allAboutRewards(self, earnedPoints: List[int], n: int) -> int:
    if len(earnedPoints) < 2:
      return len(earnedPoints)
    highest = 0
    for p in earnedPoints:
      highest = max(highest, p + n - 1)
    ans = 0
    for p in earnedPoints:
      if p + n >= highest:
        ans += 1
    return ans
```

## Minimum Retailers

An online marketplace has onboarded n merchants, each operating within a designated geographical range. The operating zone of merchant i is defined by the interval spanning from zoneStart[i] to zoneEnd[i].

A set of k merchants is termed cohesive (inclusive) if there exists at least one merchant whose operational territory overlaps with (or touches) all the other (k-1) merchants’ operational zones.

The marketplace plans to relocate some merchants to new areas. Your goal is to determine the minimum number of merchants that need to be moved so that the remaining merchants form a cohesive subset.

**Function Description**

Complete the predefined function in the editor.

`minimumRetailers` has the following parameters:

1. `int zoneStart[n]`: the left ends of the operating regions
2. `int zoneEnd[n]`: the right ends of the operating regions

**Returns**

`int`: the smallest number of merchants that need to be relocated

**Constraints**

- `1 ≤ n ≤ 10^5`
- `1 ≤ zoneStart[i] ≤ zoneEnd[i] ≤ 10^9 (1 <= i < n)`
- All regions have regions with the same start and end points.

```java
public int minimumRetailers(int[] zoneStart, int[] zoneEnd) {
    int n = zoneStart.length;
    List<int[]> events = new ArrayList<>();

    for (int i = 0; i < n; i++) {
        events.add(new int[]{zoneStart[i], 1});  // start of interval
        events.add(new int[]{zoneEnd[i] + 1, -1}); // end of interval (+1 to avoid double count at same point)
    }

    // Sort by time. If same time, end (-1) goes before start (+1)
    events.sort((a, b) -> {
        if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
        return Integer.compare(a[1], b[1]);
    });

    int maxOverlap = 0;
    int current = 0;
    for (int[] event : events) {
        current += event[1];
        maxOverlap = Math.max(maxOverlap, current);
    }

    return n - maxOverlap;
}
```

The main idea is to sort by start_time then loop and get the maximum group
then return the n - length of maximum group

## Servers replacement

Developers at Amazon have their applications deployed on n servers. Initially, the ith server has an id serverlif and can handle serverli requests at a time.  
For maintenance purposes, some servers are replaced periodically. On a jth day, all the servers with id equal to replaceldi] are replaced with servers with id newldlj] that can serve newldlj] requests. The total number of requests served on a jth day is the sum of the ids of the servers that the application is running on. Given server, replaceld, and newld, find the total number of requests served by the servers each day.

Note: The indices i and j are assumed to follow 1-based indexing.

```python
from collections import Counter
  
class Solution:
	def getTotalRequests(self, server: list[int], replaced: list[int], newId: list[int]) -> list[int]:
	
	freq = Counter(server)
	acc = sum(server)
	ans = []
	for replace, new in zip(replaced, newId):
		acc += freq[replace] * (new - replace)
		freq[new] += freq[replace]
		freq[replace] = 0
		ans.append(acc)
	return ans
```

Amazon games, build rectangles

```cpp
public static int maxArea(int[] arr) {
    int n = arr.length, totalArea = 0;
    Arrays.sort(arr);
    int length = -1, breadth = -1, pair = 0;
    for(int i = n-1; i > 0; i--){
        if(arr[i] == arr[i-1] || arr[i-1] + 1 == arr[i]){
            if(pair == 1){
                breadth = arr[i-1];
                pair++;
            } 
            else if(pair == 0){
                length = arr[i-1];
                pair++;
            } 
            i--;
        }
        if(pair == 2){
            totalArea+=(length * breadth);
            pair = 0;
        }
    }
    return totalArea;
}
```


## Amazon games, rectangle

```cpp
public static int maxArea(int[] arr) {
    int n = arr.length, totalArea = 0;
    Arrays.sort(arr);
    int length = -1, breadth = -1, pair = 0;
    for(int i = n-1; i > 0; i--){
        if(arr[i] == arr[i-1] || arr[i-1] + 1 == arr[i]){
            if(pair == 1){
                breadth = arr[i-1];
                pair++;
            } 
            else if(pair == 0){
                length = arr[i-1];
                pair++;
            } 
            i--;
        }
        if(pair == 2){
            totalArea+=(length * breadth);
            pair = 0;
        }
    }
    return totalArea;
}
```

## Chapters, k, p

```cpp
int solve(const vector<int>& chapters, const int k, const int p) {
    const int n = (int)chapters.size();
    priority_queue<int,vector<int>,greater<>> pq;
    int ans = 0, day = 0;
    for (int i = 0; i < n; ++i) {
        if (pq.size() == k) {
            day = pq.top();
            pq.pop();
        }
        const auto d = day + (chapters[i] + p - 1) / p;
        ans = max(ans, d);
        pq.push(d);
    }
    return ans;
}
```

## chapter, x

```java
public int findMinimumPagesPerDay(int[] pages, int days) {
  int maxPage = 0;
  for (int page : pages) maxPage = Math.max(maxPage, page);

  if (pages.length > days) return -1; //can't finish even reading at speed of maxPage
  if (pages.length == days) return maxPage;

  //binary search - find the reading speed among [1, maxPage]
  int lo = 1, hi = maxPage;
  while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    int t = finishDays(mid, pages);
    if (t > days) { 
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}

private int finishDays(int speed, int[] pages) {
  int days = 0;
  for (int page : pages) {
    days += Math.ceil(page * 1.0 / speed);
  }
  return days;
}

//Time: n * log(maxPage); Space: O(1)
```

## delivery warehouse, centers

```python
def tot_dist(center: list[int], i: int) -> int:
    return sum(abs(i - v) for v in center) << 1


def suitableLocations(center: list[int], d: int) -> int:
    min_d_i = sum(center) / len(center)
    l, r = min(center), max(center) + 1
    while l < r:
        mid = (l + r) >> 1
        if mid >= min_d_i or tot_dist(center, mid) <= d:
            r = mid
        else:
            l = mid + 1
    first = l

    l, r = first, max(center) + 1
    while l < r:
        mid = (l + r) >> 1
        if mid >= min_d_i and tot_dist(center, mid) > d:
            r = mid
        else:
            l = mid + 1
    second = l
    return second - first
```

## Next Permutation

```python
class Solution:
    def nextPermutation(self, nums):
        """
        :type nums: List[int]
        :rtype: void Do not return anything, modify nums in-place instead.
        """
        i = len(nums) - 2
        while i >= 0 and nums[i + 1] <= nums[i]:
            i -= 1
        if i >= 0:
            j = len(nums) - 1
            while nums[j] <= nums[i]:
                j -= 1
            self.swap(nums, i, j)
        self.reverse(nums, i + 1)

    def reverse(self, nums, start):
        i, j = start, len(nums) - 1
        while i < j:
            self.swap(nums, i, j)
            i += 1
            j -= 1

    def swap(self, nums, i, j):
        temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
```