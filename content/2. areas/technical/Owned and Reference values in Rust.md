---
tags:
  - Rust
  - Ownership
type: permanent
date: 07-01-2026
time: 22:00
parent:
childs:
aliases:
folgezettel:
reference:
---
Rust has 3 types of values:
- Owned values
- Shared Reference &x
- Exclusive Reference &mut x

Owned values are the values that don't implement the `Copy` trait
If you created a new struct or Enum It will be Owned type by default unless you derived the copy trait for that type 
```rust
/// How to implement Copy trait
#[derive(Copy, Clone)]
struct Point {
	x: u8,
	y: u8
}
```
Take care making a struct to implement COPY trait shouldn't work if the struct owns some value like String or Vector 
```rust
/// Invalid
#[derive(Debug, Copy, Clone)]
struct Employee {
	id: u32,
	name: String,
	salary: f64,
}
```

Owned values can be **moved** from variable to another or to be specific from a memory portion to another portion. Moving a value means `memcpy` in C language literally, you move a struct byte by byte from memory address X to new address Y


