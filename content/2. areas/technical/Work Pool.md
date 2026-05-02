---
tags:
  - prefect
type: permanent
date: 27-06-2025
time: 15:06
parent: 
childs: 
aliases: 
folgezettel: 
reference: https://docs.prefect.io/v3/concepts/work-pools
---
Work Pool in prefect is like topics in pub/sub or message-based system like Kafka.

The purpose of using work pools is **dynamic infrastructure provisioning and configuration** as explained in [[Prefect deployments#Dynamic Deployment]]

the deployment **publishes** flow runs on a specific work pool, on a specific queue then a worker **subscribes** to a specific work pool and starts to get runs from the queues and run then on the specific infra specified by the work pool.

Work pools have 3 categories:

|Type|Description|You run a worker|
|---|---|---|
|[Hybrid](https://docs.prefect.io/v3/concepts/workers)|a worker in your infrastructure submits runs to your infrastructure|Yes|
|[Push](https://docs.prefect.io/v3/how-to-guides/deployment_infra/serverless)|runs are automatically submitted to your configured serverless infrastructure provider|No|
|[Managed](https://docs.prefect.io/v3/how-to-guides/deployment_infra/managed)|runs are automatically submitted to Prefect-managed infrastructure|No|

In prefect servers there's only the Hybrid category that needs a [[Worker]] to handle the flow runs.

Each category have some types, each type is related to a specific infrastructure (**type == infrastructure**). this type is used by the worker to execute the flow run on the specified  infrastructure, monitor the run and records the results.

you choose the type depending on the workflow requirements.

> [!Warning] Don't forget
> The work pool existence is not controlled by deployment using it. It's a publisher Subscriber pattern, and work pool is the channel between them. 
> 
> Multiple deployments can publish on the same work pool as they want to use its infrastructure type. But one of them maybe want to change this type and publish on another work pool that configured with another infra and so on.
> 
> Workers can subscribe to work pool, getting flow runs and executes them on the specified infrastructure.

> [!TIP]
> Work pool is about determining infrastructure

Each work pool consists of multiple queues each with priority and concurrency limit which still adheres to the containing work pool concurrency limit. 

A worker generally polls flow runs from all queues unless you specified a specific queue.

