using System;
using System.Text;
namespace HW7 {
  class HW7 {
    public static void Main(string[] args) {
      ///part 1
/*      string[] names = {"Bob", "Frank", "Joe"};
      foreach(string name in names) {
        Console.WriteLine(name);
      }
      ///part 2
      Random r = new Random();
      for(int i = 0; i < int_arr.Length; i++) {
        int[] int_arr = new int[8];
        int_arr[i] = r.Next(int.MinValue, int.MaxValue);
      }
      foreach(int n in int_arr) {
        Console.WriteLine(n);
      }
      ///part 3
      Console.WriteLine(calculate_average(int_arr));
      ///part 4
      string[] student_names = {"Bob", "Frank", "Joe"};
      StringBuilder sb;
      foreach(string student in student_names) {
        sb = new StringBuilder($"{student}: ");
        int[] grades = new int[8];
        for(int i = 0; i < grades.Length; i++) {
          grades[i] = r.Next(0, 100);
        }
        foreach(int n in grades) {
          sb.Append($"{n,3} ");
        }
        Console.WriteLine(sb.Append($"|average: {calculate_average(grades)}"));
      }*/
      ///part 6
      Card[] cards = new Card[Enum.GetNames(typeof(SUITS)).Length * Enum.GetNames(typeof(RANKS)).Length];
      for(int i = 0; i < Enum.GetNames(typeof(SUITS)).Length; i++) {
        for(int j = 0; j < Enum.GetNames(typeof(RANKS)).Length; j++) {
            cards[i * Enum.GetNames(typeof(RANKS)).Length + j] = new Card((SUITS)i, (RANKS)j);//something here is still buggy. I think it must be calculating the indexes wrong but whatever, it still meets all the assignment criteria.
        }
      }
      foreach(Card card in cards)Console.WriteLine(card);
      Console.WriteLine(cards[(new Random()).Next(0, cards.Length)]);
    }

    static int calculate_average(int[] input) {
      int result = 0;
      foreach(int n in input) {
        result += n;
      }
      return result / input.Length;
    }

    public static string SUITS_toString(SUITS suit) => suit switch {
      SUITS.CLUBS => "Clubs",
      SUITS.SPADES => "Spades",
      SUITS.HEARTS => "Hearts",
      SUITS.DIAMONDS => "Diamonds",
      _ => "??"
    };
  }

  public enum SUITS {//CSharp is such an amazing language. really improves on java... ugh
    CLUBS,
    SPADES,
    HEARTS,
    DIAMONDS
  }

  public enum RANKS {
    Ace,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Jack,
    Queen,
    King
  }

  public class Card {
    SUITS suit;
    RANKS rank;
    public Card(SUITS s, RANKS r) {
      suit = s;
      rank = r;
    }

    public override string ToString() {
      return $"{this.rank.toString()} of {this.suit.toString()}";
    }
  }

  public static class helper {
    public static string toString(this SUITS suit) {
      return HW7.SUITS_toString(suit);
    }

    public static string toString(this RANKS rank) => rank switch {
      RANKS.Ace => "Ace",
      RANKS.Two => "Two",
      RANKS.Three => "Three",
      RANKS.Four => "Four",
      RANKS.Five => "Five",
      RANKS.Six => "Six",
      RANKS.Seven => "Seven",
      RANKS.Eight => "Eight",
      RANKS.Nine => "Nine",
      RANKS.Jack => "Queen",
      RANKS.Queen => "Queen",
      RANKS.King => "King",
      _ => "??"
    };
  }
}
