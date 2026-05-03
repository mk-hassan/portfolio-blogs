---
tags:
  - mlops-zoocamp
  - mlflow
  - module2
type: permanent
date: 23-06-2025
parent: 
childs: 
aliases:
  - mlops
folgezettel: 
reference: https://www.youtube.com/watch?v=1ykg4YmbFVA&list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK&index=13
---
You must determine 3 aspects depending on the usecase:
1. Backend store
   If you didn't specify `- - backend-store-uri` when starting mlflow, it defaults to the local file system.
2. Artifact store
   defaults to the local file system if `- - default-artifact-root` flag
3. Tracking server

> [!Note] mlflow ui
> It just a UI presentation of the backend artifacts and backend store but not a server

I noticed that in case of local backend store and local artifact store the experiments ids become much longer because it's expected to have much more descriptive data about the experiment.