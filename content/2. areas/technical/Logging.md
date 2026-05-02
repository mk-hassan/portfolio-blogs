---
tags:
  - software
  - logging
type: permanent
date: 07-05-2025
parent: "[[Logging, Metrics, and Audits]]"
childs: 
aliases:
  - Logs
folgezettel: 
reference: https://youtu.be/5gMgPlrjkb4?si=WsUY6YXVC59Y44f4
---
Mainly used for troubleshooting purposes
Things you want to track, like Exceptions, External API calls

**Purely Developer Focused** and not exposed to end users or the Business

There are 5 levels of logs (named differently in other frameworks) :
1. Debug
   The most verbose level
   Example:
   Consider an API request, that's to complete and send response back must call other external APIs then unite their responses. May be you need to log these calls responses to track the latency and errors happened on such calls.

2. Information
   That's the default level
   It's usually abused and meant to use Debug level instead
   Logs info about the normal flow and what's happening at high level
   Example:
   - Order Created
   - Background job X starts At hh-MM
   - Application started on port X

3. Warning
   A single warning log is not a problem, bug dozens of logs describes the same thing is a problem.
   
   Warnings are kind of things that by themselves aren't a problem, but in an aggregate could be a problem.
   
   Example:
   I warning log indicates that a user is locked from login after entering passcode 3 times wrong (that's not an a problem as a single warning).
   But consider there is 100 warning logs in 1min saying the same thing => this indicates there's an active DOS attack on the system.
   
4. Error
   Logging unhandled exceptions happened
   There's some sort of **alerting system** that pings people responsible for the system that some user is actively getting an error on our system when an Error log produced.

5. Exception (Fatal)
   Kind of things that make my application work (can't boot the system)
   Example:
   Wrong Connection string
   Necessary API keys to boot the application


Should support searchability (define a good structure for your logs)
Avoid flat logs, manual searches and make your logs support searchability.
If you have a ***structured logging system*** logging things to a ***centralized logging store*** you will be able to search about things and run ***advanced search queries***.

Logs usually stored for shorter times relative to metric systems and audits, it also depends on the log store which stores logs usually for 14 days and other for up to a year.
You should make sure how long your log store will keep your logs as if you are trying to run some sort of reporting out of your logs and you can only go back a certain amount of days that will prevent you from getting the insights you're looking for.

Most logging systems like serilig, winston and other keeps logs in memory then flush them out on a periodic occasions. This way you are not waiting your log store to be up, and also you don't take down the entire request because of network issues.
So when you call a log statement it keeps logs in memory and not round trip your logging store system and continue back on the request.
Think about what if the system crashes for any reason before sending the logs into the log store, LOGs would be LOST.
The catch here is that, Logs delivery system is not reliable and not 100% guaranteed that the logs will be stored and that's totally acceptable. ***It's a trade of between reliability and system availability***.

## Full Example

```JSON
"Serilog": {
  "MinimumLevel": {
    "Default": "Information",
    "Override": {
      "Microsoft": "Information",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  },
  "WriteTo": [
    {
      "Name": "File",
      "Args": {
        "path": "Logs/BackEnd_.json",
        "rollingInterval": "Day",
        "retainedFileCountLimit": 30,
        "outputTemplate": "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} RequestId[{RequestId}] CorrelationId[{CorrelationId}]] {Level:u3} - {Message:lj} {NewLine:1} {Exception} {NewLine:1}"
      }
    },
    {
      "Name": "Console",
      "Args": {
        "outputTemplate": "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} RequestId[{RequestId}] CorrelationId[{CorrelationId}]] {Level:u3} - {Message:lj} {NewLine:1} {Exception} {NewLine:1}"
      }
    }
  ],
  "Enrich": [ "FromLogContext", "WithCorrelationIdHeader", "WithMachineName" ]
}
```

In the previous example:
1. **Logging Framework** is [Serillog](https://serilog.net/)
2. It implements a structured logging system so it's searchable, If the log store is azure log analytics you will be able to run search queries over your logs
```JSON
{
	"outputTemplate": "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} RequestId[{RequestId}] CorrelationId[{CorrelationId}]] {Level:u3} - {Message:lj} {NewLine:1} {Exception} {NewLine:1}"
}
```
3. The Centralized logging store is the local file system into files
4. it  keeps the logs for 30 days only 
```JSON
{
	"rollingInterval": "Day",
	"retainedFileCountLimit": 30,
}
```