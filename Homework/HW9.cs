using System;
class HW9 {//I've been starting to try to develop my own C# coding style and stay consistent with it. This program should follow it exactly
  public static void Main(string[] args) {
    printCheckerboardPattern();
    var board = generateCheckerboardPattern();
    for (int i = 0; i < board.GetLength(0); i++) {
      for (int j = 0; j < board.GetLength(1); j++) {
        Console.Write(board[i,j]);
      }
      Console.WriteLine();
    }
    board = null;

    var tmp = new int?[]{20, 20, 30, 40, 50, 50, 50};
    foreach (int? n in tmp) {
      Console.Write($"{n} ");//too lazy to write code more robust than this rn \:|
    }
    Console.WriteLine();
    var unique = dedup(ref tmp);//something is wrong. for some reason unique is 1, not 4, and I can't figure out why.
    Console.WriteLine($"unique: {unique}");
    foreach (int? n in tmp) {
      Console.Write($"{n} ");//too lazy to write code more robust than this rn \:|
    }
    Console.WriteLine();
    int[] newArr = new int[unique];
    for (int i = 0, j = 0; i < tmp.Length; i++) {
      if (tmp[i] != null) {
        newArr[j++] = (int) tmp[i];
        if (newArr.Length == j) break;
      }
    }
    tmp = null;
    foreach (var n in newArr) {
      Console.Write($"{n} ");
    }
  }

  static void printCheckerboardPattern() {
    for (int i = 0; i < 8; i++) {
      for (int j = 0; j < 8; j++) {
        Console.Write((i & 1) == (j & 1) ? '+' : '-');
      }
      Console.WriteLine();
    }
  }

  static char[,] generateCheckerboardPattern() {
    char[,] board = new char[8,8];
    for (int i = 0; i < 8; i++) {
      for (int j = 0; j < 8; j++) {
        board[i,j] = (i & 1) == (j & 1) ? '+' : '-';
      }
    }
    return board;
  }

  static int dedup(ref int?[] arr) {
    if (arr.Length == 1) return 0;
    int unique = 0, min = 0, mid, max;
    var seen = new int[arr.Length];
    seen[0] = (int) arr[0];
    for (int i = 1; i < arr.Length; i++) {
      start: if (arr[i] != null) {
        min = 0;
        max = unique;
        while (min <= max) {//just a simple binary search. With all this, the dedup method should execute in linear time in respect to `arr`, and linearithmic time in respect to `seen` (which is upper-bounded by `arr`). Performance could possibly be improved if I used a HashMap instead but eh, this should work fine and might be faster. At the very least, there's no need to worry about hash collisions this way, all leading to guaranteed performance that scales!
          mid = (min + max) / 2;
          if (arr[i] == seen[mid]) {
            seen[++unique] = (int) arr?[i];
            Array.Sort(seen);
            arr[i++] = null;
            if (i == arr.Length) return unique;
            goto start;//annoying that I can't just use continue to where I want and have to do all this instead
          }else if (arr[i] < seen[mid]) {
            max = mid - 1;
          }else {
            min = mid + 1;
          }
        }
      }
    }
    return unique;
  }
}
