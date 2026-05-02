---
tags:
  - mlops-zoocamp
  - module4
type: permanent
date: 01-07-2025
time: 23:46
parent: "[[2. areas/technical/ML model deployment|ML model deployment]]"
childs: 
aliases: 
folgezettel: 
reference: https://www.youtube.com/watch?v=JMGe4yIoBRA&list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK&index=17
---
- model is up and running all the time 
- It's expected to make instant predictions

It's a normal web service contains the model, communicating with it using Http requests and responses back with the predictions.

It's a 1x1 client-server architecture. where the client is the backend and the server is the prediction service. There's an **explicit** alivc connection between them as long as the prediction service processing the request.

![[web service deployment]]

Consider an example that UBER user wants to book a ride, first you find the expected time your ride will take. This requires an up and running model for trip predictions all the time.

When the user selects the departure and destination locations the backend send these information maybe more information like the traffic jam status to the prediction service which applies the model on the received info and sends the predictions back.

Imagine if the service is down, this will be aa really bad user experience.