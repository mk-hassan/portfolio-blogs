---
tags:
  - Database
  - sharding
type: permanent
date: 29-12-2025
time: 01:37
parent: "[[Database partitioning]]"
childs:
aliases:
folgezettel:
reference:
---
simply split the database schema
- each group of related tables are put together on a different database
  By related meaning there are relationships between them (FK) or these group of tables often accessed together (JOINs)
  That's the fancy word `MicroServices` simply as that.
  This can be done within the same node, or we can use different node for each database . **`Notice that each database now has a different schema`**
- break a large table into multiple tables
  instead of having `Employee` relation that has the following columns
  `Id`, `name`, ... , `Id_Picture` let's split the table into 2 tables 
  `Employee_Info`, `Employee_Assets`
  now querying `Employee_Info` will be much much faster because now we ignore the assets (pictures)
  note that:
```sql
SELECT name
FROM Employee
WHERE Id > 10 and Id < 15
```
this query execution will include the blobs (pictures, large Json objects) internally before extracting the required columns out of the whole columns which is costly.
This's done within the same database instance, that's perfect no need for extra nodes.

### Main Goal of vertical sharding
For the table split it's about fast retrieval no need to access the blob if we don't need it.
For the groups of tables split it's about fast retrieval also, but now the load is split on different databases and then the system can accept more different unrelated queries and distribute them on the specific nodes holding the required intended data
Maybe for example querying Employees needn't to be on the same database as Beneficiaries

