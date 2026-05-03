---
tags:
  - Database
  - distributed-systems
  - Replication
type: permanent
date: 13-12-2025
time: 21:33
parent:
childs:
aliases:
folgezettel:
reference: Grokking Modern System Design Interview (educative.io)
---
![[single database server]]

Imagine a single database containing the whole data, what if :
1. The database server fails and goes down
2. The number of users accessing the application increases

we need to have multiple database servers holding the same exact data, so that if one server goes down the other severs still exist.

Multiple servers talk to each other creates a distributes system, database replication solves the problems that any distributed system trying to solve: 
1. Scalability (serving more user, accepting more requests, storing more data)
2. Availability (can deal with failures `Fault Tolerance`)
3. Performance (by placing replicas close to the end users it reduces the latency. You get data much faster). image a user in China accessing data in America it takes about few milliseconds with is much for many requests. So we need to set the a database server in china.

It comes with challenges that are all about `How to deal with writes?`
reading data from any server not a problem but how to update all replicas with the new data.

> [!NOTE] Personal understanding maybe wrong
> The problem with distributed systems is the servers being stateful (having some internal information so we need to keep these information through out the servers).
> 
> The database servers are considered as stateful servers and the data is the state of that server and we need to maintain the states on all the replicas.


There are 3 models for data replication:
1. [[Single Leader-Followers replication model]]
2. Multiple Leaders
3. Pear-to-Pear replication (P2P) A.K.A. leaderless