/*
1. Write a grandfather clock. Print to the screen the time, meaning print starting with 1:00, 1:01, 1:02 ….. 2:00, 2:01…. If you can make sure that 1:00 has two zeros and 1:01 has a zero and a one. You can use an if statement to check for that.
To make it cooler add a print statement after every hour “Ding,Dong” like a grandfather clock. To make it cooler, make it print “Ding,Dong” at 1:00, “Ding,Dong  Ding,Dong” at 2, “Ding,Dong Ding,Dong Ding,Dong” at 3, etc

Hint: double for-loop, outside loop controls the hours, inner the minutes, do your ding-donging in the hour loop
*/
﻿using System;
class GrandfatherClock {
  static void Main(string[] args) {
    for (int hour = 1; hour <= 12; hour++) {
      for (int minute = 0; minute <= 59; minute++) {
        if (minute == 0) {
          for (int i = 0; i < hour; i++) {Console.Write("Ding, Dong   ");}
          Console.WriteLine();
        }
        Console.Write(hour.ToString() + ":");//format string becomes empty if minute is 0, causing output to be "1:" instead of "1:00", etc.
        if (minute == 0) Console.WriteLine("00");
        else Console.WriteLine(minute.ToString("D2"));//it's incredibly stupid that I can't merge these 3 lines into one with a simple ternary (`Console.Write(hour.ToString() + ":" + (minute == 0) ? "00" : minute.ToString("D2"));` because c# 9.0 for some idiotic reason now requires all the operands to be target-typed. grrrr
      }
    }
  }
}
