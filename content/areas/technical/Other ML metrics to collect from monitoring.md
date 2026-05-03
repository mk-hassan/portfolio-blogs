---
tags:
  - mlops-zoocamp
  - module5
type: permanent
date: 10-07-2025
time: 19:00
parent: 
childs: 
aliases: 
folgezettel: 
reference:
---
eyond the foundational metrics, several other types of monitoring can be crucial depending on the use case, associated risks, and available resources.

## 1. Performance by Segment
- **When to use:** When your model serves a diverse audience or deals with a wide variety of data objects.
- **What it is:** Instead of just looking at overall performance, you should collect quality metrics for specific segments or groups within your data. This helps ensure the model works well for all subgroups and not just for the majority.

## 2. Model Bias / Fairness
- **When to use:** Critical for models operating in sensitive domains like finance, healthcare, or hiring, where biased decisions can have serious consequences.
- **What it is:** This involves specifically monitoring the model's performance across different demographic groups (e.g., race, gender, age) to ensure that it is making fair and equitable decisions.

## 3. Outliers
- **When to use:** When the cost of a single, significant error is very high.
- **What it is:** This involves monitoring for input data that is unusual or far from the training data distribution, as these outliers can cause the model to make unpredictable or costly errors. These cases often require manual review by a human.

## 4. Explainability
- **When to use:** Important for systems where user trust is paramount, such as recommendation engines or financial loan applications.
- **What it is:** This involves monitoring the explanations for the model's predictions. For example, a recommendation system should be able to explain *why* it recommended a particular item, which helps build trust with users.
   
   