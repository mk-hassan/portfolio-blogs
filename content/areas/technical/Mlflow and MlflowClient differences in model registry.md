---
tags:
  - mlops-zoocamp
  - mlflow
  - module2
type: permanent
date: 13-06-2025
parent: "[[MLFlow model registery]]"
childs: 
aliases: 
folgezettel: 
reference:
---
I noticed that while trying some code:
There're 2 ways to create a containing registry model
1. using mlflow directly
   by registering an ML model and specify the containing model
   this method will create the registry model if not exist then create the version for the MLmodel
```python
mlflow.register_mode(ml_model_uri, name_of_the_containing_model)
```

2. using MlflowClient object
```python
client = MlflowClient(backend_store_uri)
client.create_registred_model(params)
client.create_model_version(params) 
```

The create model version will not automatically create the containing model so you must create the registered model first using `create_registered_model`