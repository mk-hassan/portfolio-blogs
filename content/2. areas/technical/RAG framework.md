---
tags:
  - llm-zoomcamp
  - module1
type: permanent
date: 29-06-2025
time: 12:06
parent: 
childs: 
aliases: 
folgezettel: 
reference: https://www.youtube.com/watch?v=Q75JgLEXMsM&list=PL3MmuxUbc_hIB4fSqLy_0AfTjVLpgjV3R
---
![[RAG framework.png]]
The idea of RAG (Retrieval Augmented Generation) is providing more information to the LLM, and using these information it can answer you questions.

The LLM doesn't know about your personal information, or a specific course you are taking now. But providing the course info and then ask it about some question, using this info it can answer your questions now accurately.

> [!TIP]
> It's all about the CONTEXT

The knowledge base can be:
1. regular database (postgres)
2. search engine (elastic search)
3. personal search engine
4. vector search database (Qdrant)

The LLM can be:
1. Open AI models
2. Open source models
3. Any thing. 
Just care about how to engineer a prompt suitable for the LLM used

Take a look at the [module studying notes and examples](https://github.com/mk-hassan/llm-zoomcamp/tree/2025-cohort/01.%20Intro)
