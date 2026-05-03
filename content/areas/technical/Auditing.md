---
tags:
  - software
  - audits
  - auditing
type: permanent
date: 07-05-2025
parent: "[[Logging, Metrics, and Audits]]"
childs: 
aliases:
  - audit
folgezettel: 
reference: https://youtu.be/5gMgPlrjkb4?si=WsUY6YXVC59Y44f4
---
Simply it's all about "Recording **How** did **What** and **When** in your application". 

Usually this is for legal reasons, compliance reasons, or just straight up traceability reasons (auditing who did a request to my system).

examples:
1. IP xxx.xxx.xxx.xxx calls ABC api {curl} at YY-MM-DD:hh-mmZ .
2. Authentication based system that manages roles and permissions given to users.
   If someone X tries to add, change, or remove a role of another person Y, that actions should be audited "User X adds role admin for User Y at 15May, 2025".
3. Health Insurance system that needed to be HIPAA compliant, and someone called a medical insurance representative line talking about prescription(روشتة علاجية) data. We had to log information that this medical insurance rep viewed this person's prescription at x date and time.

Losing data is totally ***unacceptable***

Store audits in ***the same data store*** as the data that's being audited. If you're using SQL Server database so we had another table in which you keep track of "who accessed what info and when?" and it's in the same sql server database as the main application tables. 
Because losing data is not acceptable, Audits are done in a single transaction with application data updated ie. if you can't save audits properly then the action shouldn't be taken and roll things back.

In case of medical insurance rep service if the audits that says "who shows which patients prescription data and when" the data shouldn't be displayed to the representative.

In case of authorization system if the system audit "Admin X adds role Y to person Z at AA:BBPM" can't be stored properly the Admin X action should be ignored and the system roll things back.

In case of Auditing api end point access, the client will not enter the api unless the audit that says "user X accesses API end point ABC at HH:MM" stored successfully on the database.

> [!Note]
> So in simple words:
>	Storing audit log successfully implies success of 
>	the "What"(action) that "Who"(user) is doing.



