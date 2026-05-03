---
tags:
  - mlops-zoocamp
  - mlflow
  - module2
type: permanent
date: 12-06-2025
parent: 
childs: 
aliases:
  - mlops
folgezettel: 
reference:
---
There are 2 ways to save a model:
1. using `mlflow.log_artifact()`
   This is the most basic way to store a trained model
   but you need to **save the model locally first** then move it to airflow as an artifact
```python
with open("models/booster.bin", "wb") as model_file:
	pickle.dump(booster, model_file)

mlflow.log_artifact(local_path="models/booster.bin", artifact_path="picke_models")
```

> [!NOTE]
> I'd already saved it locally why to move it to mlflow artifact?
> see the reasons [[ML model management]]

the problem with that approach is to use the model you need to **download** the model, then read it using pickle to predict new data.

```python
# I used the model already saved on the local file system but typically you should download the model from airflow artifacts
with open("models/booster.bin", "rb") as booster_file:
	loaded_booster = pickle.load(booster_file)
  
temp = loaded_booster.predict(valid)
```

2. using `mlflow.<framework name>.log_model()`
```python
mlflow.xgboost.log_model(booster, name="models_mlflow")
```
> [!NOTE] Runs and Saved model separation
> In modern Mlflow versions runs are separated from the saved models. In old version you can find the saved model stored within the run but now it's like more related to the experiment and just referenced by the run owns the model.
> 
> Example:
> Notice how the models folder exists out of the run 1ea and more related to the experiment
> 558046090145187780
├── 1eaff8eb6b2a488d9118a231e41dd395
└── models

This method provides more information about the saved data and the dependancies needed to run the model. Besides that you can load the model directly without the need to download the model.

It results some useful files the most important one is `MLmodel`:
```python
%% where the model lives %%
artifact_path: models_mlflow
%% The list of flavors that are available for this model %%
flavors:
%% This means the model can be loaded as just a python method %%
  python_function:
    data: model.xgb
    env:
      conda: conda.yaml
      virtualenv: python_env.yaml
    loader_module: mlflow.xgboost
    %% Python version %%
    python_version: 3.9.23
%% This means the model can loaded as an xgboost object %%
  xgboost:
    code: null
    data: model.xgb
    model_class: xgboost.core.Booster
    model_format: xgb
    %% the version of xgboost module %%
    xgb_version: 2.1.4
mlflow_version: 2.22.1
model_size_bytes: 3209279
model_uuid: a28888eb24434c2697d05709d2634e3e
prompts: null
run_id: d7892e89580341e197f77a5900370dc2
utc_time_created: '2025-06-11 22:09:41.968097'
```

> [!TIP]
> It's a good point to save any preprocessors such that you can load and use it in the future in predicting data
> It depends on the preprocessor framework, if it's supported by mlflow or you can just use pickle and mlflow.log_articat()

## Summary

Using log_model function from the mlflow supported frameworks
you can save the model with mlflow model format with lots of information.

You can then load the model easily in the required flavor (python function, framework model object) then deploy the model on whatever platform you want.





