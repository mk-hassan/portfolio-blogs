---
tags:
  - Rust
  - slicing
type: permanent
date: 08-01-2026
time: 00:58
parent:
childs:
aliases:
folgezettel:
reference:
---
string literals are represented by slices but the slice in this case points to the address in memory where the string literal is stored within binary (literals are stored within the binary)
```rust
fn main() {
	let s: &str = "Hello World!";
/// Hello World! is stored in the compiled binary and it's address is know at compile time, ans s is a slice pointing to the whole string in memory
}
```

slice by default is a readonly reference and this why the literals are readonly 

---

```Rust
fn first_word(s: &str) -> &str {}
```

This function will accept arguments in shape of &String and &str 
Assuming &String as slice &str[..] from the start to the end of the string