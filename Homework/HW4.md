```cs
using System;
namespace HW4 {
    class NumberGuessingGame {
        int target, guesses;
        GameStart:
        target = Random.Next(1, 11);
            guesses = 0;
            for(;;;) {
                guesses++;
                Console.WriteLine("Guess the number between 1-10");
                int guess = Convert.ToInt32(Console.ReadLine());
                if(target > guess) {
                    Console.WriteLine("{guess} was too high");
                } else if(target < guess) {
                    Console.WriteLine("{guess} was too high");
                } else {
                    Console.WriteLine("{guess} was correct! You won in {guesses} guesses!");
                    break;
                  }
                }
                Console.WriteLine("Press the spacebar to play again. Press anything else to exit.");
                if (Console.ReadKey() == ConsoleKey.Spacebar) {
                    goto GameStart;
                }
        }
```
```cs
namespace HW4
{
    class CoinFlipper
    {
        public static Main(string[] args)
        { 
            int headcount = 0;
            for (int i = 0; i < 100; i++)
            {
                headcount += System.Random.Next(0,1);
            }
            System.Console.WriteLine("Headcount: {headcount}, tailcount: {100-headcount}");
        }
    }
}
```
```cs
using System;
namespace HW4
{
    class p4
    {
        static void Main(string[] args)
        {
            for(int i = 0; i <= 5; i++)
            {
                for(int j = 0; j <= i; i++)
                {
                    Console.Write("*");
                }
                Console.Write("\n");
            }
        }
    }
}
```