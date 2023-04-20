#!/usr/bin/python3
import random
number = random.randint(1, 1024)
chosen_number = 0
while chosen_number is not number:
	try:
		chosen_number = int(input("Guess a number:"))
		if chosen_number < number:
			print("Too low")
		elif chosen_number > number:
			print("Too high")
		else:
			print("Congratulations! You guessed the number")
	except ValueError as e:
		continue