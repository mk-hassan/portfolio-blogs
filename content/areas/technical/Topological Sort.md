---
tags:
  - Algorithms
  - DFS
type: permanent
date: 24-09-2025
time: 01:46
parent:
childs:
aliases:
folgezettel:
reference:
---
For edges list like `[(0, 1), (1, 2), (1, 3), (3, 2), (3, 4)]`

If you constructed the graph as `item[0] -> item[1]` or `item[1] -> item[0]`
it doesn't matter the result still the same for checking if it's a DAG or even returning order of courses(reversing needed)

There're 2 common problems related to Topological sort:
1. [207. Course Schedule](https://leetcode.com/problems/course-schedule/)
2. [210. Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

the first is simply to check if it's a **DAG** or not, it really doesn't matter how you construct the graph your task still same (find if the graph contains any cycles)

the second is just about reversing the output order for `item[0] -> item[1]`


Topological sort can be solved using DFS or BFS(Kahn's algorithm)
1. https://cp-algorithms.com/graph/topological-sort.html
2. https://www.hellointerview.com/learn/code/graphs/topological-sort