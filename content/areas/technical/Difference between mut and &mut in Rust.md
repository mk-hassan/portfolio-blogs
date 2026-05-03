---
tags:
  - Rust
  - binding
type: permanent
date: 07-01-2026
time: 23:44
parent:
childs:
aliases:
folgezettel:
reference:
---
&mut -> Exclusive reference
mut -> mutable binding (the value itself is mutable)

Really good note "Eng: Ahmed Farghal" mentioned :
--
In C, C++, and Rust , a variable and its value are the same thing 
that's called binding , you just give the value a name 
```rust
let x: Vec<u8> = vec![1, 2, 3];
```

x is not something different from `vec![1, 2, 3]` , they are the same thing I just gave `vec![1, 2, 3]` a name called x 

In java `Vector<int> vec = new Vector<int>();` means there is some x on the stack and it's value (the actual vector) is on the heap

Think about this example:
```rust
fn foo(mut Point) {
	// do something
}

fn main() {
	let point = Point {
		x: 12,
		y: 0
	};
	
	foo(point);
}
```
In previous example we moved an immutable value not variable (they are the same thing remember that) 
point isn't a mutable or immutable reference to a struct in memory no that's not the case, point is the struct itself and when we say `let mut point = Point{}` we mark this struct instance as mutable or not

> It's not the variable itself mutable or not but the value, (variable == value) not a reference to the value


Another way to say that:
It's not we have a reference to Point struct that has the ability to mutate this instance, but the value itself is mutable or not because there's no distinction between the variable and the value.

So why moving point works, it's defined as immutable then I moved it to another function which accepting it as mutable ?
It's binding, we moved the whole instance (byte by byte) to a new memory location and marked this memory location as mutable (simple).