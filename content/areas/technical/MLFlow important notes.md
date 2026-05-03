---
tags:
  - mlops-zoocamp
  - mlflow
  - module2
type: permanent
date: 13-06-2025
parent: 
childs: 
aliases:
  - mlops
folgezettel: 
reference:
---
MLFlow never removes anything, just **Soft deletes** data. If you want to really delete it you can do it manually from the backend store and artifact store locations.

This insures Reproducibility and Aligns with the principles of experiment tracking and MLOps.

> [!Warning]
> Nothing is lost due to deletions, just status change.
> This is happened for almost anything mlflow manages.

For example notice how the versions of the registry are only incremental even you removed some versions from the middle.
If you have v1, v2, v3 then you remove v3 then added a new version it will be v4 not v3.

---

You can't use model registry in case you are using the file system as your backend store. Use sth else like sqlite.

---

In modern version of Mlflow, saved model is separated from the run it belongs to. The documentation says that its better for scalability.

For that when using
mlflow.<framework>.log_model(model, name="")
you may want to specify the saved model name, the "artifacts_path" is deprecated and not used any more