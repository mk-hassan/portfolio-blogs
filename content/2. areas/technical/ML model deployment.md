---
tags:
  - mlops-zoocamp
  - module4
type: permanent
date: 01-07-2025
time: 22:53
parent: 
childs: 
aliases: 
folgezettel: 
reference: https://youtu.be/JMGe4yIoBRA?si=LdVSlUDoVhiRF4W0
---
3 phases till now:
1. Design
   discovering the problem and understanding that ML is the best solution for this problem
2. Train
   Exp Tracking
   Training pipeline => outputs the production ready **ML model**
3. Operate
   Deploying the model to production

To deploy a model we need to ask a question:
> Do we need to have the Predictions immediately or we can wait for a month, week, hour ?

Depending on the answer of that question: 
1. if we can wait, then we should use the B**atch deployment mode**
    also called offline mode. model is not up and running all the time but we apply the model to new data in regular basis (evert day, hour, week, ...)

2. if not and we need immediate predictions then we go with the **Online mode** where the models are up and running all the time waiting for a query and provide a response/predication immediately.
   
   there are 2 modes of online deployment:
	1. Web service
	2. Streaming

![[different ml model deployments modes.png]]
