---
tags:
  - Rust
  - C
  - Memory
type: permanent
date: 31-12-2025
time: 23:15
parent:
childs:
aliases:
folgezettel:
reference: https://youtu.be/N1Ka9EKEGUU?list=PLald6EODoOJU0GMuYHlkS9MLhTPE7HiaT&t=9533
---
```Rust
struct Data {
	a: u8,
	b: u32
}
```

This code has the following memory information

|      | size | align |
| ---- | ---- | ----- |
| Data | 8    | 0x4   |
| a    | 1    | 0x1   |
| b    | 4    | 0x4   |

size: is the number of bytes this type take into memory
align: where this type should be placed in memory
   for example 0x4 means this type u32 must start at addresses multiples of 4
   0x0 0x4 0x8 0xC and so on

> Why there's alignment ?

because the CPU reads memory in chunks not in bytes each chunk called word
there's x64 architecture and x32 architecture where word size is 64bits and 32bits respectively or 8 and 4 bytes

and the reading always starts from 4s or 8s multiples for x32 and x64 respectively

so if a 4bytes sized type written in 0x1 from the perspective of x32 cpu this type will span 2 words 0x1 0x2 0x3 0x4 where 0x4 is on the next word the cpu reads but for x64
it should not cause word spanning but image the overhead to implement such thing
so for simplicity just start from 0x4 or 0x8 multiples

But a is 1 byte and b is 4 bytes so why Data 8 bytes
imagine a word
xxxx xxxx 
a--- bbbb
that's how stored in memory 
a stored at any byte as the align is 0x1
while b should start at address multiple of 0x4 after a with 3 bytes in this case so it takes total 8 bytes the size of Data

what what makes a stored in 0x4 multiples because Data as  struct should start also from 0x4 multiples 

struct takes the align of the most significant member

el alignment de 7sb el architecture, el compiler 3ndo list kol architecture which alignment will be used.

---

Rust doesn't have Binary Compatibility which means there's no specific ordering or schema to store binaries in memory like C 
rust determines how to order things in memory based on the most efficient and hence it a struct binary stored on disk then you read it with new rust compiler has another algorithm for binary ordering reading bits will fail 

```Rust
struct Data {
	a: u8,
	b: u32,
	c: u8
}
```

Data size is 8 also , but why ?
because Rust **reordered** them for efficiency they are stored like this
xxxx xxxx
ac-- bbbb

```Rust
#[repr(C)]
struct Data {
	a: u8,
	c: u32,
	b: u8,
}
```

This code will compile the struct as C language, C has Binary Compatibility
so Data this time will have size 12 = 4 + 8 + 4 bytes
no optimization occurred

but the alignment still the same idea the dominant member align

This C behavior is beneficial when you try to call C code like the kernel 
in UNIX the kernel written in C so the struct should be binary compatible with it