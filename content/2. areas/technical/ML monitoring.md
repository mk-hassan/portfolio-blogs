---
tags:
  - mlops-zoocamp
  - module5
type: permanent
date: 10-07-2025
time: 00:19
parent: 
childs: 
aliases: 
folgezettel: 
reference: https://www.youtube.com/watch?v=SQ0jBwd_3kk&list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK&index=22
---
> [!NOTE] Quote
> It's hard to train ML models, but it's even harder to build production services for these models.

After sometime the ML models quality start to degrade. So we need to monitor production services. 

There are 4 things to monitor:
1. [[Monitoring Service health]]
2. [[Monitoring Model Health]]
3. [[Monitoring data health]]
4. [[Data and Concept drift]]
5. [[Other ML metrics to collect from monitoring]]

Each of them has its own metrics to measure.
The model, and data health monitoring are related to the ML products not normal services.

## Summary

**Problem**: models degrade over time
**Solution**: Monitoring (collect metrics)

You can collect metrics related to different aspects of the system:

1. Service related metrics like up-time, and memory usage is crucial and must be implemented. ***A MUST***

2. Model related metrics are split into 2 categories: general and problem specific metrics.

3. Data-related metrics act as a powerful proxy for model quality when ground truth labels are unavailable or delayed. By monitoring changes in input features or prediction distributions, we can detect ***potential model degradation early**

Reusing the existing monitoring architecture for ML models can save time and resources as you don't need to build a new monitoring system from scratch. You can start by adding a couple of dashboards and expand to a more sophisticated system later.







