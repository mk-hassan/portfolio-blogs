---
tags:
  - mlops-zoocamp
  - module4
type: permanent
date: 02-07-2025
time: 00:31
parent: "[[2. areas/technical/ML model deployment|ML model deployment]]"
childs: 
aliases: 
folgezettel: 
reference: https://www.youtube.com/watch?v=JMGe4yIoBRA&list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK&index=17
---
- Many models working together
- Models are up and running all the time
- Instant predictions

It's a 1xM pub/sub architecture, where there are many prediction services each contains its own model. 

There may be 1-many producers produce events and many consumers consume these events, process them and make predictions.

![[Streaming deployment]]

there is a **Implicit** connection between the producer and the consumer no explicit as the producers don't know and care about who or how many consumers are there caring about the streaming events.

The difference between streaming and web service model is the asynchronous modeling of how requests are processed.

Consider the ***Content Moderation*** example, where there's some streaming platform you upload a video the backend producing event that some video has been uploaded. So the prediction services each responsible for searching some violation in the video.
1. model1 specialized in copy right violations
2. model2 specialized in NSFW violations
3. model3 specialized in violence violations
and each consumes the event, processing it, making some predictions and maybe there's another service collecting their responses and determines whether the video is okay or has violations.

![[Streaming deployment example on content moderation]]

The benefits of this mode is that it's highly scalable. you can add consumers as many as you want. There's a full separation between the producers and the consumers, they are communicating using the event stream pipe (Kafka, RabbitMQ, ....).

