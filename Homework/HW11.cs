using System;
namespace HW11 {
	  class HW11 {
        static Random r = new Random();
	  	public static void Main(string[] args) {
            int[] rolls = new int[12];
            for (int i = 0; i < 36_000; i++) {
                rolls[rollDice()]++;
           }
            for (int i = 0; i < rolls.Length; i++) {
                Console.WriteLine($"{i} was rolled {rolls[i]} times.");
           }
	  	  }
	  	  static int rollDie() {
              return r.Next(6);
          }
          static int rollDice() {
              return rollDie() + rollDie();
          }
	  }
}
