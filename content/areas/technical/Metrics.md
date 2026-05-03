---
tags:
  - software
  - metrics
type: permanent
date: 07-05-2025
parent: "[[Logging, Metrics, and Audits]]"
childs: 
aliases: 
folgezettel: 
reference: https://youtu.be/5gMgPlrjkb4?si=WsUY6YXVC59Y44f4
---
There're 2 types of metrics 
1. Applicant metrics
2. Business metrics

**Application metrics**  
- CPU usage
- memory consumption
- Network
- Response times
- Queue depth (like how many messages in a message queue)
- Events produced/consumed by a micro-service (Outbox/Inbox model)

**Business metrics**
- How many times a button is clicked
- How many times a specific document is read, in a document based system

How long should a metric system stores the metrics and keep track of the data? 
Usually for a long a term more than a year. Metrics are usually stored for a ***long time*** (longer than logs).


Metrics are stored on a **metric system** usually for a long term, you should choose this system depending on
- Use case
- How long you need to keep your data ?
- Whether you want to run advanced queries over metrics data or not
If goal to achieve fast and reliable delivery of metrics data, this can be achieved by using a **metric system** like in-memory storage for fast access then desk storage for recovery and reliability.
Other cases may prefer to use Time-series databases(Prometheus) for storing and querying data that changes over time.
Another example if one wants to do simple data show, you may store data in a database and visualize it using grafana. Others may put data into data warehouses to make easier to store larger amounts of data.

Depending on the use case it may or may not acceptable to miss some data. Depending on the importance of the metric to the end user.

## Summary

1. 2 types of metrics
	- Application Metrics
	- Business Metrics
2. Metrics are stored for long time
3. Should choose the appropriate metrics system depending on your needs
4. Loss is acceptable depending on the use case and the end-users

