#!/usr/bin/python3
for i in range(1, 10):
	s = f"\x1b[95;41m{' ' * 55}\x1b[40m\n\x1b[41m "
	for j in range(1, 9):
		s += f"\x1b[93;40m{i * j:<5}\x1b[95;41m "
	print(s + f"\x1b[93;40m{i * 10:<5}\x1b[41m \x1b[40m")
print(f"\x1b[41m{' ' * 55}")