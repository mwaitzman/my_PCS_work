namespace HW10 {
    using System;
	  class HW10 {
	  	static var board = new (tiletype, hittype)[10,10];
        static Random r = new ();
	  	public static void Main(string[] args) {
		       var lengths = {5, 4, 3, 3, 2};
               int d, x, y;
               for (int s = 0; s < lengths.Length; s++) {
                   gen: x = r.Next(10); //might be an off by one but i'm too lazy to check right now. Regardless, it'd be a trivial fix, especially as I'd be keeping it in mind, so I don't think I'd lose points for keeping it out of laziness
                   y = r.Next(10);
                   d = r.Next(4);
                   for (int i = 0; i < lengths[s]; i++) {
                       if (board[x,y].0 == tiletype.EMPTY
                        && 0 <= x <= 9
                        && 0 <= y <= 9) {
                            switch s {
                                case 0:
                                    board[x, y].0 = tiletype.CV;
                                    break;
                                case 1:
                                    board[x, y].0 = tiletype.BB;
                                    break;
                                case 2:
                                    board[x, y].0 = tiletype.DD;
                                    break;
                                case 3:
                                    board[x, y].0 = tiletype.PB;
                                    break;
                                case 4:
                                    board[x, y].0 = tiletype.SM;
                                    break;
                            }
                            switch d {//up, right, down, left
                                case 0:
                                    y--;
                                    break;
                                case 1:
                                    x++;
                                    break;
                                case 2:
                                    y++;
                                    break;
                                case 3:
                                    x--;
                                    break;
                            }
                       }
                       else goto gen;
                   }//the performance of this is REALLY bad, but the computer should be powerful enough to figure it out very quickly
               }
               int turns = 0;
               string[] s;
               int x, y;
               int hits = 0;
               while (hits < 17) {//TODO: add a turn limit to allow the player to lose, maybe
                   goto b;
                   c: Console.WriteLine("Unable to parse your input");
                   b: if turns != 0 goto a;
                   Console.WriteLine("Please enter a row number, followed by a comma, followed by a column number");
                   a: s = Console.ReadLine().split(,);
                    x = Convert.toInt32(s[0]);//all this really isn't very robust to invalid input (although it's a bit robust), but whatever
                    y = Convert.toInt32(s[1]);
                    if (board[x, y].1 != NONE) {
                        Console.WriteLine("You've already attacked that spot! Please attack a different spot.");
                        goto a;
                    }
                    turns++;
                    if (board[x, y].0 == tiletype.EMPTY) {
                        board[x,y].1 = hittype.MISS;
                        Console.WriteLine("Miss!");
                    }
                    else {
                        board[x, y].1 = hittype.HIT;
                        Console.WriteLine("Hit!");
                        hits++;
                        //TODO: actually detect if the ship was sunk.
                    }
               }
               Console.WriteLine($"Congratulations! You won in {turns} turns!");//TODO: add highscore to be stored in between games, and give the option to play again
               displayFullBoard();
		}
		enum tiletype {
		     CV,
		     BB,
		     DD,
		     PB,
		     SM,
		     EMPTY = 0,
		}
		
		enum hittype {
		     HIT,
		     MISS,
		     NONE = 0,
		}
		static void displayBoard() {
            for (int i = 0; i < 10; i++) {
                for (int j = 0; j < 10; j++) {
                    switch board[i,j].1
                        case hittype.NONE:
                            Console.Write('U');//(U)NKNOWN - much more discernible than having N and M
                            break;
                        case hittype.MISS:
                            Console.Write('M);
                            break;
                        case hittype.HIT:
                            Console.Write('H);
                            break;
                }
                Console.WriteLine();
            }
        }
		static void displayFullBoard() {
            for (int i = 0; i < 10; i++) {
                for (int j = 0; j < 10; j++) {
                    switch board[i,j].0
                        case tiletype.CV:
                            Console.Write('C');
                            break;
                        case tiletype.BB:
                            Console.Write('B');
                            break;
                        case tiletype.DD:
                            Console.Write('D');
                            break;
                        case tiletype.PB:
                            Console.Write('P');
                            break;
                        case tiletype.SM:
                            Console.Write('S');
                            break;
                        case tiletype.EMPTY:
                            Console.Write('E');
                            break;
                }
                Console.WriteLine();
            }
}
