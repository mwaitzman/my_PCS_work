#!/usr/bin/python3
import random
class Die:
	def __init__(self, sides):
		if sides < 1:
			raise ValueException("Die can't have less than one side")
		self.sides = sides
	def roll(self):
		return random.randint(1, self.sides)

class SixSidedDie(Die):
	def __init__(self):
		super().__init__(6)


d20 = Die(20)
d6 = SixSidedDie()
d20_rolls = []
d6_rolls = []
for _ in range(0,10):
	d20_rolls.append(d20.roll())
	d6_rolls.append(d6.roll())
print(f"d6 rolls: {d6_rolls}")
print(f"d20 rolls: {d20_rolls}")