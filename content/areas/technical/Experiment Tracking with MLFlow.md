---
tags:
  - mlops-zoocamp
  - mlflow
  - module2
type: permanent
date: 10-06-2025
parent: "[[Why Tracking is important?]]"
childs: 
aliases:
  - mlops
folgezettel: 
reference:
---
MLFlow is an open source platform for the machine learning life cycle.

Life cycle means the whole process of building and maintaining a machine learning model.

It's a simple python package you can install using `pip install mlflow`

It consists of 4 main components that make up the MLFlow framework:  ^067298
1. Tracking
   Used for logging and querying experiments, runs, parameters, metrics, artifacts, etc.
	- Python API: `mlflow.log_param()`, `mlflow.log_metric()`, `mlflow.log_artifact()`
	- UI to compare and visualize runs.
	- CLI and REST API available.
	- Can log data automatically from ML libraries like 
	  scikit-learn, XGBoost, TensorFlow, etc. 
2. Models
   Manages and Packages machine learning models so they can easily deployed across different platforms
3. Model regestry
   A centralized **model store**, API, and UI for managing model lifecycle
4. Projects


## General Concepts

ML Experiment => the process of building an ML model.
Experiment RUN => each trial in an ML Experiment.
RUN Artifacts => any file associated with that run.
Experiment MetaData => all information related to the experiment.

MLFlow Tracking component allows you to organize your **experiments** into **RUNs**. Each Run is basically an experiment trail, and so an experiment is a bunch of Runs.

For each run you can keep track of each of these entities:
1. Parameters
   Hyper Parameters and any thing that has an effect on the metrics of the run (path to the data used, or any preprocessing you made on the data)
2. Metrics
   Metrics calculated on the training, validation, and test data sets like accuracy, f1 score and others
3. MetaData
   Like Tags, you want to add tags for each run such that you can use them on search and filter runs or comparing runs.
4. Artifacts
   Any file associated with the RUN, also any visualization you created from the metrics or the dataset.
5. Models

MLFlow also logs these information automatically:
1. Source Code
2. Version of the code
3. Start and end time
4. Author

> [!warning]
> Experiment Tracking is a general concept it's part of the machine learning lifecycle itself specifically (model management) area. You can achieve it using many tools from a paper to full automated tool like mlflow







