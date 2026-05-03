---
tags:
  - mlops-zoocamp
  - mlflow
  - module2
type: permanent
date: 11-06-2025
parent: 
childs: 
aliases:
  - mlops
folgezettel: 
reference:
---
A machine learning lifecycle refers to the multiple steps needed in order to build and maintain a ML model.

A sub-area of machine learning life cycle is **Model Management** that contains experiment tracking, versioning, deployment and the hardware scaling.

> [!Tip] Mlflow
> Mlflow cares about model management just that, no production monitoring or data preparation. Even the free version only cares about till model versioning.

![[Model management flow diagram.png]]

## Using Folder system as a very basic way of managing model versions ?
1. Error Prone
   You name folders yourself, and maybe you end up with renaming a model version or delete it
2. No versioning
   things become messy when the number of versions increase, as the number of folders increase with the version number
3. No model lineage
   you just save the model without knowing about its HyperParameters, Metrics, or training and validation data sets.