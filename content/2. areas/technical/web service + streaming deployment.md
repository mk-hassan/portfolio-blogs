---
tags:
  - mlops-zoocamp
  - module4
type: permanent
date: 02-07-2025
time: 01:38
parent: "[[Streaming deployment (online)]]"
childs: 
aliases: 
folgezettel: 
reference: https://www.youtube.com/watch?v=JMGe4yIoBRA&list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK&index=17
---
web service deployment model can be mixed with the streaming model
in an example like "trip duration prediction"

the backend can call a weak ML model deployed as a web service in synchronous way to provide fast and okay answer to the user booking the trip.

while the streaming mode contains a more robust model for duration prediction, but it works to provide more accurate predictions for the user after the trip starting. (The streaming mode is async, so it can take more time than the web service mode which is sync)

![[web service + streaming model deployment modes]]

