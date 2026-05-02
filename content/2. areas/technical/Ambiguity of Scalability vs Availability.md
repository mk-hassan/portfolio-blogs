---
tags:
  - distributed-systems
type: permanent
date: 03-01-2026
time: 06:09
parent:
childs:
aliases:
folgezettel:
reference: https://youtu.be/s_p3I5CMGJw?list=PLald6EODoOJW3alE1oPAkGF0bHZkPIeTK&t=3069
---
Availability not only to find other machines can take the request if some machines goes down not only about failures, but also in case we have a single node that can actually serve all users and store all data (application is pretty small) so there's no issues from the perspective of scalability so why to create more nodes ?

It's about availability, provides better response time for the users, the requests can now split on 2 nodes so no congestion on one node.

I think availability means how the system doing well from the perspective of the system's clients, while scalability is from the perspective of the system itself.