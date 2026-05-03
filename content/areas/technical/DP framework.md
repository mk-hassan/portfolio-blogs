---
tags:
  - Algorithms
  - DP
type: permanent
date: 26-09-2025
time: 08:20
parent:
childs:
aliases:
folgezettel:
reference: https://www.hellointerview.com/learn/code/dynamic-programming/solving-a-question-with-dp
---
Series of steps that untimely lead to the bottom-up solution:
1. Find the Recurrence Relation
2. Identify the Base Case(s)
3. Write the Recursive Solution
4. Add Memoization
5. Convert to "Bottom-Up" DP
6. Further Optimization

Before applying the framework, you need to make sure that your problem is a good candidate for a Dynamic Programming solution
1. Overlapping subproblems (repeated work)
2. Optimal Substructure (can be solved using recursion)

To identify if there's an optimal substructure or not: assume you already know the answer for a `smaller version of the input`. Then see if you can use that information to solve the problem for a `larger input`.
array -> assume you know the answer for the first few elements
string -> assume you know the answer for the first few characters
number -> assume you know the answer for smaller numbers

## Recurrence relation

To formalize the optimal substructure property

>A recurrence relation describes the answer to our problem in terms of answers to the same problem with smaller inputs

### Example

For https://leetcode.com/problems/house-robber/ the recurrence relation is:
> dp(i) = max(dp(i - 1), dp(i - 2) + treasure[i - 1]) where **i** is the  ith house

this equation shows how to solve your problem in terms of the solutions of the same subproblems but with smaller inputs.

### Notes

- Make sure you are clear as to what the recurrence relation represents in terms of the input and the problem. 
- Decide what parameters define the subproblem

Having a clear, consistent definition of what the recurrence relation represents will help you with every step of this process.

A misunderstood recurrence relation means failure in every incoming step, you must be correct about what the parameters in the equation means in terms of the problem and the input.

The recurrence relation parameters will be indexes (of strings or arrays) or lengths that can be used to describe the size of the subproblem. (Make sure you understand the parameters used in describing the subproblem)

## ### Identify the base case(s)
The base cases are the inputs for which we know the answer without having to use the recurrence relation. They are typically the smallest possible values for our parameters.

Think empty or small here: empty strings, empty arrays, 0, or 1.

##  Write the Recursive Solution

Recurrence Relation + Base case = recursive solution

recursive function -> A function that has the same signature as the recurrence relation.
that function is the "dp" term of the recurrence relation

## Add Memoization

1. define empty dictionary
   keys -> input parameters
   values -> return of the recursive function
2. return the value if exits before doing any recursive calls
3. store the result if not already exist before returning back to the caller

> [!TIP]
> Define the dict outside of the recursive function, and define the recursive function within the main function.
> ```python
> def main(a, b, c, ...):
> 	memo = {}
> 	def recursive(x, y):
> 		...
> ```
> Now the `recursive` and `main` have access to the dictionary

##  Convert to "Bottom-Up" DP

Step 1: Initialize an array to store the results of the subproblems.
Step 2: Fill in the base cases in the array.
Step 3: Start iterating to fill in the rest of the array, up to and including the final answer

## Further Optimization

You should think about further optimizations after you have a working bottom-up solution. 

Often times, the recurrence relation will give you a hint as to how you can reduce the space complexity of your solution.

```python
dp(i) = max(dp(i - 1), dp(i - 2) + treasure[i - 1])
```
tells that you will need only 2 previous values and not the entire **DP** array

## Common mistakes

Avoid off-by-one errors and bugs by making the variables consistent in code with the recurrence relation.

off-by-one errors and wrong bounds errors in iterative solutions are easy to happen so make sure the definition of the recurrence relation is consistent and the use of variables is meaningful.