using System;
class HW8 {
  public static void Main(string[] args) {
    for (int i = 0; i < 5; i++) {
      generateMeal();
    }
  }
  static string GetAppetizer() {
    Random R = new Random();
    string[] appetizers = {"fish scale", "mucus glob", "A3", "A4"};
    return appetizers[R.Next(0, appetizers.Length)];
  }
  static string GetEntree() {
    Random R = new Random();
    string[] entrees = {"steak", "E2", "E3", "E4"};
    return entrees[R.Next(0, entrees.Length)];
  }
  static string GetDessert() {
    Random R = new Random();
    string[] desserts = {"chocolate cake", "cookies",  "D3"};
    return desserts[R.Next(0, desserts.Length)];
  }
  static string GetBeverage() {
    Random R = new Random();
    string[] beverages = {"OJ", "B2", "B2", "B3", "B4", "B5"};
    return beverages[R.Next(0, beverages.Length)];
  }
  static void generateMeal() {
    Console.WriteLine($"Generated meal:\n\tAppetizer:{GetAppetizer()}\n\tEntree:{GetEntree()}\n\tDessert:{GetDessert()}\n\tBeverage:{GetBeverage()}");
  }

  static int GetIndex<T>(T value, T[] arr) {
    for(int i = 0; i < arr.Length; i++) {
      if(value.Equals(arr[i])) return i;
    }
    return -1;
  }

  static (int, int) MinAndMax(int[] arr) {
    int min = arr[0];
    int max = arr[0];
    for (int i = 1; i < arr.Length; i++) {
      min = arr[i] < min ? arr[i] : min;
      max = max < arr[i] ? arr[i] : max;
    }
    return (min, max);
  }
}
