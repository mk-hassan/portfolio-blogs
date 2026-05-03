---
tags:
  - python
  - oop
type: permanent
date: 21-05-2025
parent: 
childs: 
aliases: 
folgezettel: 
reference: Pyhon crash course book, ch9 Classes
---
## Inheritance

To initialize the parent class you should call `super().__init__(enter params)`

Override method can have different signature
```python
class Parent:
	def print_name(self):
		print("from parent")

class Child(Parent):
	def print_name(self, name: str):
		print(f"child {name}")

Child().print_name() # error, you must pass  name
```

## Styling Classes

className => CamelCase
module_name => lowercase + underscores

add **docstring** for module, classes and methods 
module => describing what classes on the module (top of the file)
class => what is the class all about (after class defination)
method => what the method expected to do (after method defination)

2 blank lines between classes within the module
1 blank line between methods within the class

standard library modules first then own module with 1 blank line separation