using System;
using System.Collections.Generic;
namespace HW12 {
	class HW12 {
        static Random r = new Random();
        public static void Main(string[] args) {
            var card = new int[5, 5];
            var taken = new HashSet<int>();
            int tmp;
            for (int i = 0; i < 5; i++) {
                for (int j = 0; j < 5; j++) {
                    gen:
                    tmp = r.Next(1, 76);
                    if (taken.Contains(tmp)) goto gen;
                    else {
                        taken.Add(tmp);
                        card[i, j] = tmp;
                    }
                }
            }
            card[2, 2] = 0;
            int pick;
            loopstart:
            Console.ReadKey();
            displayCard(card);
            pick = r.Next(1,76);
            //game:
            for (int i = 0; i < 5; i++) {
                for (int j = 0; j < 5; j++) {
                    if (card[i, j] == pick) {
                        card[i, j] = 0;
                        goto checkWin;
                    }
                }
            }
            goto loopstart;
            checkWin:
            //if I wasn't lazy, I could pre-process to only check wincons that card[i, j] could have effected
            //rowWin
            for (int i = 0; i < 5; i++) {
                row:
                for (int j = 0; j < 5; j++) {
                    if (card[j, i] == 0) {
                        if (j == 4) goto gamewon;
                    }
                    else {
                        if (++i == 5) {
                            goto colWin;
                        }
                        else goto row;
                    }
                }
            }
            colWin:
                for (int i = 0; i < 5; i++) {
                col:
                    for (int j = 0; j < 5; j++) {
                        if (card[i, j] == 0) {
                            if (j == 4) goto gamewon;
                    }
                        else {
                            if (++i == 5) {
                                goto diagWin1;
                            }
                            else goto col;
                        }
                    }
                }
            diagWin1:
            for (int i = 0; i < 5; i++) {
                if (card[i, i] != 0) goto diagWin2;
                else if (i == 4) goto gamewon;
            }
            diagWin2:
            for (int i = 0; i < 5; i++) {
                if (card[4-i, i] != 0) goto loopstart;
                else if (i == 4) goto gamewon;
            }
            goto loopstart;
            gamewon:
            Console.WriteLine("you won!");
            displayCard(card);
        }

        static void displayCard(int[, ] card) {
        //lazy hardcoded dimensions
            for (int i = 0; i < 5; i++) {
                for (int j = 0; j < 5; j++) {
                    Console.Write(card[i, j] + "\t");
                }
                Console.WriteLine();
            }
        }
	}
}
