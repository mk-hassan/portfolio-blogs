---
tags:
  - Database
  - postgres
  - Optmization
  - SQL
  - Indexing
type: permanent
date: 02-05-2025
parent: 
childs: 
aliases: 
folgezettel: 
reference: https://youtu.be/UfWDzLus1yY?si=LE20RfiUr0_hjBqw
---
I've populated a database with [news data](https://huggingface.co/datasets/abisee/cnn_dailymail/tree/main/3.0.0) with has lots of text data suitable for experimenting performance issues with **Full Text Search**.
```SQL
CREATE TABLE IF NOT EXISTS Article (
	id UUID PRIMARY KEY,
	article TEXT NOT NULL,
	highlights TEXT NOT NULL,
	article_vc tsvector
);
```
**tsvector** is a Postgres data type, used to make efficient `Full Text Search` .
tsvector record is created using `to_tsvector(text)` built-in function which applies the following steps on the text:
1. Tokenization
   splitting text into tokens 
   for example: There will be an economic disaster in European Union by the next 2 years because of the Americans and the Russian war.
   tokens: \["There", " will", " be", " an", " economic", " disaster", " in", " Europe", " by", " the", " next", " 2", " years", "because", "of", "the", "Americans", "and", "the", "Russian", "war"]
   
2. Removing stop words
   The words that are not really important like `and`, `or`, `to`, `from` etc.
   for our example when removing stop words from the tokens list
   The Removed stop words \["There", "will", "be", "an", "in", "by", "the", "next", "because", 
   "of", "the", "and", "the"]
   Kept  \["economic", "disaster", "European", "2", "years", "Americans", "Russian", "war"]

3. Steaming (Normalization)
   return words to their origins :
   economic => economy  
   disaster => disast  
   european => europe  
   years => year 
   americans => america  
   russian => russia  
   war => war
   and then create a vector map { word: indexes on the original sentence }
   for example: 'economy': 5 'america': 18
   and if an `origin`  appears multiple times, they should be counted also
   `'food': 3,55,84` this indicated that the word food appears in indexes `3`, `55`, `84` on the original sentence.
   
4. Indexing (Optional) using GIN (General Inverted Index) data structure
   General Inverted Index : is an indexing type just like the words dictionary at the end of each book. where maps words to the pages where in it exists.
   Same thing for database indexing maps which word exists in which row.

Then to search for a text you must convert it also to a vector using `to_tsquery(query_text)` .

Searching for text has 3 levels each with pros and cons:
## 1. Exact Matching

```SQL
SELECT *
FROM Order
WHERE status = 'delivered'

SELECT *
FROM Article
WHERE article IN ('delivered', 'preparing')
```
This is the first implemented approach and exists on all databases, it matches the column value exactly with the provided text.

### pros
1. easy to use for specific cases where exact matching is critical
### cons 
1. Really slow
   It scans the whole table (sequential search)
2. case sensitive
   'Delivered' != 'delivered' case sensitivity
3. Exact Matching
   delivered ' != 'delivered' there's a space at the end
4. Not suitable for searching large text
   you must write the full text you searched for which is can be very long

## 2. LIKE keyword

```SQL
SELECT *
FROM News
WHERE Article LIKE '%economy%'
```

LIKE matches a pattern against the text data
> [!Note]
> % called a wild card that matches any thing

> [!Warning]
> Using % at the beginning of the query text leads to sequential search; traversing the whole table.
> 
> '%economy%' => always sequential search
> 'economy%' => index search and if no index exists on the selected column a sequential search is used.

### Pros
1. used to search for part of a large text or for a word
### Limitations
1. case sensitive
2. exact match on the specified chars (matches similar forms)
   LIKE `%baking%` OR LIKE `%bake%`
   specifying only `baking` will ignore the text containing word `bake`
   sure you can use something like `%bak%`  this will match both `baking` and `bake`.
3. poor performance when using a wild card on the beginning of the search query because of the using of sequential search

## 3. Vector Search (tsvector in postgres)

Using tsvector data type explained above, with to_tsvector and to_tsquery
to convert data and query text to vectors.

It matches the existence of **`origins`** between the stored data and the text you searched for.

> [!Note]
> Used @@ as operator for vector searching
> to_tsvector(column) @@ to_tsquery(text)
> 

#### Trials
1. to_tsvector(column) on the fly
```SQL
-- takes about 8min, becaues of the vector conversion for the whole table
-- this also applying sequential search as no indexing exists
SELECT id
FROM Public.News
WHERE to_tsvector(article) @@ to_tsquery('palestine & israel & egypt');
```

2. After populate **`article_vc`** with the data
```SQL
-- takes about 3min, becaues of applying sequential search as no indexing exists
SELECT id
FROM Public.News
WHERE article_vc @@ to_tsquery('palestine & israel & egypt');
```

3. After adding GIN indexing on **`article_vc`** 
```SQL
-- takes about 2.777ms, becaues of applying sequential search as no indexing exists
CREATE INDEX article_index ON article USING GIN(article_vc);

SELECT id
FROM Public.News
WHERE article_vc @@ to_tsquery('palestine & israel & egypt');
```

