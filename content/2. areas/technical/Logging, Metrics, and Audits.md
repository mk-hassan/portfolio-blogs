---
tags:
  - software
  - logging
  - metrics
  - auditing
type: permanent
date: 07-05-2025
parent: 
childs:
  - "[[Logging]]"
  - "[[Metrics]]"
  - "[[Auditing]]"
aliases:
  - logging
folgezettel: 
reference: https://youtu.be/5gMgPlrjkb4?si=WsUY6YXVC59Y44f4
---
Saying "we should log that"  is a loaded statement which implies hidden meanings. Should we do logging, collecting metrics, or auditing.

Depending on what the use case and the goal you want to achieve from collecting system data, you chose logging, metrics collecting, or auditing.

The difference between Logging, metrics, and auditing
1. [[Logging]]
2. [[Auditing]]
3. [[Metrics]]

Summary

| Type     | Purpose | storage period | Loss policy                          |
| -------- | ------- | -------------- | ------------------------------------ |
| Logging  |         |                |                                      |
| Metrics  |         | Long time      | Acceptable depending on the use case |
| Auditing |         | Long Time      | Not Acceptable                       |

