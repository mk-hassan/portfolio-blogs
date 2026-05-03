---
tags:
  - Algorithms
  - DP
type: permanent
date: 26-09-2025
time: 07:34
parent:
childs:
aliases:
folgezettel:
reference: https://www.hellointerview.com/learn/code/dynamic-programming/fundamentals
---
DP problem has 2 basic criteries:
1. Overlapping subProblems
   A fancy way to say the same subproblem solved multiple times **OR** there's repeat work being done.
2. Optimal substructure
   A fancy way to say we can use recursion to solve the problem (you can solve the problem using the solutions of its subproblems)
   > [!NOTE]
   > The problem has optimal substructure if an optimal solution to a problem contains optimal solution to subproblems
   
   if the problem can be solved using recursion and have overlapping subproblems, so DP solution can be used

DP approaches:
- Memoization (Top-Down approach)
   Dict maps input to output
   the main idea is to cache the subproblems solutions so that it can be used later without recomputing it
   - check the value in cache if so return it
   - else compute the output, cache it and then return it
-  Bottom-Up approach
   You already know the base cases so start from the base case and build up solution

Memoization dives deep until reaches the base case, while the tabular method bottom-up approaches starts from the base case and builds things up

the bottom-up approach is generally more efficient because it avoids the overhead of recursive calls and function calls