---
tags:
  - prefect
type: permanent
date: 27-06-2025
time: 12:06
parent: 
childs: 
aliases: 
folgezettel: 
reference: https://docs.prefect.io/v3/concepts/deployments
---
## Idea 
instead of running your workflows manually just put them on a remote server and manage them.

Deployment is simply putting a workflow on the prefect server/cloud and exposing an API and UI for it.

![[prefect deployment]]

Deployment doesn't store the workflow code but the metadata and configs required to **Orchestrate** this workflow remotely including **When**, **Where**, and **How** to run this workflow. A deployment creates the following yaml file
```yaml 
# Prefect.yaml

name: PrefectLLMOrchestration
prefect-version: 3.4.6

# build section allows you to manage and build docker images
build: null

# push section allows you to manage if and how this project is uploaded to remote locations
push: null

# pull section allows you to provide instructions for cloning this project in remote locations
pull:
- prefect.deployments.steps.git_clone:
repository: https://github.com/Teachings/PrefectLLMOrchestration.git
branch: master

# the deployments section allows you to provide configuration for deploying flows
deployments:
- name: default
version: null
tags: []
concurrency_limit: null
description: null
entrypoint: b_sync_async_concepts/05_async_sync_mixed_demo.py:user_account_flow
parameters: {}
work_pool:
name: default
work_queue_name: null
job_variables: {}
schedules: []
```

The file contains information like:
1. where can find the wf code
2. the work pool name
3. lots of metadata like names, tags, params and others

## Create flow
```bash
%% CLI command but python way also exists %%
prefect deploy <Options>
```

## Benefits
1. As the flow is now existing on the server, you can trigger and manage the flow from the UI, or Apis. You can manage the the workflow by scheduling a future run, cancel active ones, pause scheduled runs, managing params and others.
2. Scheduling
   Remotely you can can schedule runs to invoke in certain times.
   You don't have to run it manually by hand.
3. Automation
   Remotely trigger runs based on external events
4. Infrastructure provisioning
   You determine **How** and **Where**, how can run the flow locally on your machine Process, in docker container, or AWS EC2 instance, Google UI and other

## Deployment Types
### Static Deployment

Using the **.serve** or **serve** utility method.

This method starts a process called **Agent**, that keeps a long opened connection with the server looking of work(flow runs) and if found any this agent process spawns new sub process and submit the run to it.

The benefit is you have a full control on the infra, anywhere you run .serve method the environment becomes the infra for your deployment.

Used usually for frequent, simple pipelines.
![[prefect static deployment]]
### Dynamic Deployment

Using [[Work Pool]], queues, and [[Worker]].

Runs are submitted to the work pool associated with the deployment. Then workers polls flow runs and execute them on the work poll configured infrastructure (pub/sub pattern)

this method achieves dynamically provisioned infrastructure **How**? 
lets think about a flow that requires very expensive infrastructure that training a Deep learning model and this flow happens infrequently like once per month, is that reasonable to have a working instance along the month to just use it once?!, this costs a lot. but with infra provisioning prefect can up a machine for 1h for example finishing the training and then deletes the infra, that's it.

more than that as your flow needs evolve, you will need to change the deployment approach. for example your flow now is simple just fetches some data from the internet, then you can run this flow within a simple local process or even a docker container, now the we need to train a ML model on these data then we will need to have more robust, and strong infra to deal with out new needs so we can evolve the run execution infra from docker to Google Vertex AI. This can happen just by submitting work items (flow runs) to a different [[Work Pool]] configured to use different infra.

![[deployment, work pool, worker in prefect.png]]