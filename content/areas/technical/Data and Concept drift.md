---
tags:
  - mlops-zoocamp
  - module5
type: permanent
date: 10-07-2025
time: 05:04
parent: 
childs: 
aliases: 
folgezettel: 
reference:
---
## 🌍 Why Drift Matters
- ML models operate in **changing environments**.
- Over time, **data and user behavior can shift**.
- This affects model performance, even if the model doesn't change.
- Monitoring drift helps catch problems **before users are impacted**.

---

## 📦 Types of Drift

### 1. **Data Drift** (Covariate Shift)
- **What:** Change in distribution of input features (X).
- **Why it matters:** Model sees new types of data it wasn't trained on.
- **Example:** Seasonal changes in customer behavior.
- **Detection Metrics:**
  - KL Divergence
  - PSI (Population Stability Index)
  - KS Test (Kolmogorov–Smirnov)
  - Earth Mover’s Distance (EMD)

---

### 2. **Concept Drift**
- **What:** Change in the relationship between features (X) and target (Y).
- **Why it matters:** The model’s understanding becomes outdated.
- **Example:** What counts as “spam” changes over time.
- **Detection Metrics:**
  - Accuracy decline (if true labels are available)
  - DDM (Drift Detection Method)
  - ADWIN (Adaptive Windowing)
  - Confidence shift in model predictions

---

## 🛠 What to Monitor
Compare **new incoming data** to a **reference dataset** (from when the model was working well).

### Compare Distributions Of:
- 📥 **Input features (X)**
- 🤖 **Model predictions (P)**
- ✅ **True labels (Y)** *(if available)*

---

## ⚠️ Key Insight
- Drift **doesn't always mean the model is broken**, but it’s a strong signal to:
  - Investigate
  - Possibly retrain or adjust the model