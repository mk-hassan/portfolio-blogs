---
tags:
  - mlops-zoocamp
  - mlflow
  - module2
type: permanent
date: 12-06-2025
parent: 
childs:
  - "[[Mlflow and MlflowClient differences in model registry]]"
aliases:
  - mlops
folgezettel: 
reference: https://www.youtube.com/watch?v=TKHU7HAvGH8&list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK&index=12
---
## Problem the mlflow registry solves ?

You as an ML Engineer or MLOps Engineer wants to keep track of the deployments, what changes happened on the models.

What if a deployment failed how to roll back and use the previous version and even if the previous version can't be accessed where is the code to retrain the a model again and deploy it.

MLFlow Tracking system can solve this problem but mlflow registry can solve this problem in more elegant way.

> [!NOTE]
> Till now all models are saved within the **tracking server**

## Reminder

MLFlow has 4 main components one of them is the registry submodule [[Experiment Tracking with MLFlow#^067298]]

## Idea
![[MLFlow registry.png]]

Some of the models stored within the tracking server become ready for deployment. You need to ***register*** those models onto the mlflow model registry.

> Model registry logic is to create a containing model that has multiple versions.

Containing model version has 3 stages (old way): ***DEPRECATED***
1. Staging stage => Models waiting for deployment
2. Production stage => Models already in production
3. Archive stage => old models but can be reused to roll back some deployment 

> [!WARNING] Staging, Production, Archive are DEPRECATED
> Now V3.1 mlflow supports writing mutable aliases instead of static stages names. so Staging, Production, Archive are deprecated.
> 
> Also aliases are combined with the containing model not the version, so no 2 version can have the same alias.
> 
> Aliases can be Created/Deleted/Updated/Retrieved through the containing model not the version

> [!TIP] Data scientist & Deployment Engineer Roles
> Data Scientist is not in charge of deploying the model, data scientist only decides what are the models ready for production. So the data scientist only register the models onto the Model Registry.
> 
> Deployment Engineer inspect those models knowing what are the HPs used, size, performance and other aspects. Depending on that they may decide to move models between different stages.

> [!Warning] What is really Model Registry ?
> It's not deploying any model, it's just a list of production ready models (the data scientists said they are okay with those models). Stages/Alieses are just labels assigned to the model.
> 
> So you may need some CI/CD code in order to do the actual deployment.

To promote some models to production you need to keep track of some aspects:
1. Duration (Training time)
2. Evaluation metric
3. Model size
those aspects are highly related to the selection of the model to deploy.


### How to create a registry containing model 

```python
# This method will create the containing model if not exist
mlflow.register_model(model_uri="runs:/85aae2e0d958479ba524144afc5fc0b3/model", name=REGISTERED_MODEL_NAME)
```

```python
client.create_registered_model(
	name=REGISTERED_MODEL_NAME,
	tags={
		"creator": "kamal",
		"problem": "nyc-taxi",
	},
	description=f"created at {date.today()}"
)

client.create_model_version(
	name = REGISTERED_MODEL_NAME,
	source=f"runs:/{run.info.run_id}/model",
	tags={"name": f"{run.info.run_name}"},
	description=f"Moved to registry on {date.today()}"
)
```






