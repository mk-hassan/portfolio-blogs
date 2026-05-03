---
tags:
  - Algorithms
type: permanent
date: 13-04-2025
parent: 
childs: 
aliases:
  - fast exponantiation
  - modulo
folgezettel: 
reference:
---
**Calculating $a^n$ using $O(log(n))$ multiplications instead of $O(n)$**

The idea is splitting the work using the binary representation of the exponent,
the algorithm main idea is simple, it's built on top of $a^n * a^m = a^{(n+m)}$ .

example:
$a = 3$
$b = 13$

$a^{13} = a^{1101_2} = a^{2^3 + 2^2 + 2^0} = a^{8 + 4 + 1} = a^8 * a^4 * a^1$
> [!Note]
>  An element in the sequence is just the square of the previous element
$$3^1 = 3$$
$$3^2 = (3^1)^2$$
$$3^4 = (3^2)^2$$
$$3^8 = (3^4)^2$$

the point is that, calculate $a^x$ then check the x's bit is set or not i.e. `take a^x or leave it`.

```python
def bin_exp(a: int, n: int, mod: int):
	 res = 1
	 a = a % mod
	 while n:
		 if n & 1 == 1: # take it
			res = res * a % mod
		# calculate the next item
		# you start with a**1 then calculate a**2 and so on
		a = a * a % mod
		n >>= 1
	return res
```
