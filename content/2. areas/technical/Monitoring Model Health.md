---
tags:
  - mlops-zoocamp
  - module5
type: permanent
date: 10-07-2025
time: 04:57
parent: 
childs: 
aliases: 
folgezettel: 
reference:
---
There are general and specific metrics you can monitor. The general ones are suitable for any model type but the specific ones are more related to the use case or the problem that the model trying to solve.

### General metrics
 - performance metrics (easy and straight forward to implement)

### Specific metrics
the particular set of metrics heavily depends on the the problem statement.

1. Ranking problems 
   Ranking algorithms are used in search engine optimization or content recommender systems, so **ranking metrics** must used.
2. Regression problems
   You need to implement metrics that estimates regression quality like Mean absolute error, or mean absolute percentage. 
3. Classification problems
   If you work with probabilistic classification model you will need to implement some metrics like log-loss, precision and recall.

The catch is that the exact set of metrics depends on the problem statement.

performance metrics + metrics (specific set based on problem related)