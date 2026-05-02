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
reference:
---
Workers can only poll (subscribe to) work pools that match their type. if the work pool is docker type then the worker must be of docker type. 

If the worker type not specified with in the CLI, the type is inferred from the work pool type.

The worker type determines where to execute the scheduled flow runs. So if a deployment changes its work pool to another type because of the evolving in flow requirements, then the worker also will have a type of the new type to execute the runs on the infrastructure.

If you started a worker with a mismatched type as the work pool, you will see a message saying that "an unexpected behavior may happen". So **worker type == work pool type**

