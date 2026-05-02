---
tags:
  - mlops-zoocamp
  - mlflow
  - module2
type: permanent
date: 10-06-2025
parent: 
childs:
  - "[[Why Tracking is important?]]"
aliases:
  - mlops
folgezettel: 
reference: https://github.com/DataTalksClub/mlops-zoomcamp/blob/main/02-experiment-tracking
---
In simple words I will try to clarify my understanding of this concept.

First you have a problem, you are trying to solve it and you find that ML is the best approach to solve this problem.

And like any other problem you start simple trying the find the simplest solution to solve this problem, then you find a more complex optimised solution for the problem.

But to:
1. remember what you did previously
2. start from where you end
3. not reinventing the wheel every time you start a new solution
4. have a source of knowledge of what you discovered and what you can do better
You will need to record your trials and the optimisations you did during you journey to find the best solution.

You can write what you did the code itself, variables' values, the results, and any data you used on a paper, excel sheets, note pad, or **MLFlow** each with its pros and cons.

In simple words think of LeetCode problem you start the solution some TLEs, MLEs, wrong answers, accepted answers, more optimized solutions. Each of them with the running time and memory consumption size, and summary on the accepted test cases. 
So using these info you can continue developing a better solution without the need to go back and try old inefficient solutions. 

This is what called **Tracking**, you remember what you did 🤗💡

In a machine learning solution there are lots of things to remember 
1. data
2. hyperparameters
3. metrics
4. model itself
5. other lots of things

