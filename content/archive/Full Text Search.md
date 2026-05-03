---
tags:
  - Database
  - search
type: fleeting
date: 30-04-2025
destination: "[[2. areas/technical/Full Text Search|Full Text Search]]"
# result note: quick note for Amr Elhelw video on the topic
---
Tokenization --> stop words removal --> steaming (normalization) (return words to their origins) --> indexing (inverted index)\

inverted indexing is about mapping each token to the document on which it exists

at first DBs only supported exact text matching, the added `LIKE` key word to make search more robust 
```SQL
SELECT * FROM Person WHERE Name LIKE '%ahmed%';
```

% => means anything . '%ahmed%' matches (any thing + ahmed + any thing)

LIKE has bad performance, case sensitive, words must have the same form

**bad performance**: When you use patterns `LIKE '%value%'`, the database **cannot use indexes effectively**. This is because the wildcard `%` at the beginning forces the DB to check every row (a **full table scan**) instead of using a **B-tree index**

GIN => Generalized inverted index
to_tsvector , to_tsquery