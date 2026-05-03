---
tags:
  - mlops-zoocamp
  - mlflow
  - module2
type: permanent
date: 22-06-2025
parent: 
childs: 
aliases:
  - mlops
folgezettel: 
reference: https://www.youtube.com/watch?v=Lugy1JPsBRY&list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK&index=14
---
## 1. Benefits of having a remote tracking server
1. **Collaboration**
   you can make experiments, create some runs and other data scientists continue working on the models tuning some hyper parameters, trying other versions of the model or the data.
   
   Collaboration with MLEs or SREs using the idea of model registry Data scientists finish their work and move best models to model registry, then the engineers can take the models from model registry and deploy them to production.
2. **Showing effort**
   Data scientists may need to show the progress of the solution to the stake holders or the PM.

## 2. Issues (shared instance)
1. **Security**
   If the remote server is publicly accessed, that can make a really dangerous issues with the experiments or the runs.
   *Solution*:
	   The simplest solution is to set a VPN, only people can connect to the VPN can have access to the server.

2. **Scalability**
   How to deal with tracking 100s or 1000s of experiments or runs. what if the the number of users accessing the system increased. You should provide a solution to handle these issues.

3. **Isolation** (isolation of experiments and models between different teams)
   Sharing the same server between different teams, things can get messy quickly. Teams can use the same experiment name and so the runs can be included within the same experiment, or creating new versions on exiting containing model.
   *Solutions*:
	   - Put standard for experiment and model naming
	   - Put a set of default tags to be used like (developer_name, team_id, ...)
	another thing is to restrict access to the models, maybe they are important models or restricted and have some regulations from the organization so some people should have access on them. The easiest solution is to define a new artifacts store (another s3 bucket) for those types of models and just certain users have privileges to use it.

## 3. Mlflow limitations
1. User Authentication
2. Data versioning 
   To provide full reproducability
   A work around is to save the path to the dataset used or if the data is small you can save the data as an artifact (not optimal).
3. Monitoring and Alerting 
   Other tools can be used to achieve this