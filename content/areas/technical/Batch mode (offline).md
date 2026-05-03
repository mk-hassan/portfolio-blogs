---
tags:
  - mlops-zoocamp
  - module4
type: permanent
date: 01-07-2025
time: 23:21
parent: "[[2. areas/technical/ML model deployment|ML model deployment]]"
childs: 
aliases: 
folgezettel: 
reference: https://www.youtube.com/watch?v=JMGe4yIoBRA&list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK&index=17
---
- Model is not up and running all the times
- Model is applied on new data on regular basis (regularly)
  on daily basis, monthly or hourly, ....

The idea you collect data for a specific period and then apply the model on the collected data in batch

![[batch deployment.svg]]
This mode of deployment usually used in marketing, in case like user churn prediction (predicting a user will stop using our services and use a competitor service "leaving orange to vodafone").

Like on daily basis will apply the model on the collected data from the previous day and predict of some users are going to churn so I can send them some gifts and promotions.

> [!NTOE] Why not using web service mode ?
> I don't want to predict a user will churn on the same day they are going to churn, generally I want to predict something on the future using the collected data and take some procedures

