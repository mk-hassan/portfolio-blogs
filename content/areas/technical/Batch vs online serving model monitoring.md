---
tags:
  - mlops-zoocamp
  - module5
type: permanent
date: 11-07-2025
time: 01:14
parent: 
childs: 
aliases: 
folgezettel: 
reference:
---
## ML Monitoring Using Existing Company Tools (time saver)

When setting up ML monitoring, always **start with tools already used in your company**.

- If your models are deployed in **ONLINE MODE** and your team uses **Prometheus** and **Grafana**, use these tools for real-time monitoring and visualization.
- If you're working in **batch mode** or lack a proper setup, leverage existing **BI tools** like **Looker** or **Tableau** for monitoring.

> **Start simple**, use existing solutions, then **automate and improve** through iterations.

[[Always reuse existing scheme for ML monitoring]]

---

## Batch Mode Monitoring

### Advantages:
1. Easy to implement and integrate.
2. Most metrics require batch data to compute.

### Examples:
- **Drift detection** requires comparing two datasets:
  - A reference dataset (e.g., validation or a previous batch)
  - A current batch of new data
- **Model quality metrics** like:
  - Precision
  - Recall
  - F1-score

These metrics **cannot be calculated** on single predictions — they **need datasets**.

### Summary:
- Most advanced monitoring metrics (drift, accuracy, precision) are **batch-based**.
- Batch mode is **ideal for model evaluation** and tracking long-term performance.

---

## Online Mode Monitoring

### Challenges:
1. Difficult to compute dataset-level metrics in real-time.
2. Needs additional logic to handle streaming data.

### What You Can Monitor:
- Missing values
- Range violations
- Schema consistency

### Advanced Metrics Strategy:
- Use **window functions** with:
  - Proper **window size**
  - Proper **step size**
- Collect small **batches of data over time**
- Compute metrics once the batch is full

> Even in **online deployments**, you can still perform **batch-based monitoring** by aggregating streaming data before analysis.

---

## Final Advice

- Use **what your company already has** (Prometheus, Grafana, Looker, Tableau).
- Don't aim for perfect from the start — **iterate and evolve** your monitoring setup.
