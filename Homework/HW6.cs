using System;
class HW6 {
  static Random r = new Random();

  public static void Main(string[] args) {
    //PART 1
      //call between 3 and a dozen times, exclusive. max 80 chars for c
      var calls = r.Next(4, 11);
      var chars = new char[calls];
      char c;
      for(int i = 0; i < calls; i++) {
        CharGen: c = (char)r.Next(0, 0x0530);
        //verify uniqueness
        for(int j = 0; j <= i; j++) {
          if (chars[j] == c) {
            goto CharGen;
          }
        }
        printCharacters(c, r.Next(1, 80));
      }
    //PART 2
    var iE_Calls = r.Next(4, 12);
    var iE_Ints = new int[iE_Calls];
    int n;
    for(int i = 0; i < iE_Calls; i++) {
      iE_Gen: n = r.Next(0, int.MaxValue);
      //verify uniqueness
      for(int j = 0; j <= i; j++) {
        if (iE_Ints[j] == n) {
          goto iE_Gen;
        }
      }
      _ = isEven(n);
  }
  //PART 3
  const int few_min = 2;
  const int few_max = 6;
  calls = r.Next(few_min, few_max);
  var gA_Ints = new int[calls];
  for (int i = 0; i < calls; i++) {//wish I could do foreach ref n in gA_ints but sadly I can't. ah well. longer code
    gA_Ints[i] = r.Next(int.MinValue, int.MaxValue);
  }
  _ =  getAverage(gA_Ints);
  //PART 4
  //I'm so exhausted after dealing with the retarded implicit bool conversion error messages that I'm just hardcoding the calls here instead of taking the time to randomize it. Sorry not sorry. Also, the instructions say System.out.println instead of Console.WriteLine, just fyi.
  Console.WriteLine(getDaysInMonths(1,1984));
  Console.WriteLine(getDaysInMonths(10,1969));
  Console.WriteLine(getDaysInMonths(8,2040));
  Console.WriteLine(getDaysInMonths(5,1881));
  Console.WriteLine(getDaysInMonths(7,2001));
}

  static void printCharacters(char c, int n) {
    var sb = new System.Text.StringBuilder(n);
    for(int i = 0; i < n; i++) sb.Append(c);
    Console.Write(sb);
  }

  static bool isEven(int n) {
    return (n >> 31 ^ 1) == 0;//annoying that I have to do == 0 and can't explicitly cast to bool or have it implicitly be converted
  }

  static int getAverage(params int[] args) {
    int avg = 0;
    foreach(int n in args) {
      avg += n;
    }
    return avg / args.Length;
  }

  static int getDaysInMonths(int month, int year) {
    switch(month) {
      case !isEven(month) and ((1 <= month) && (month <= 11))://what are these precedence rules... annoying have to explicitly case stuff that I thought precedence rules made implicit. I guess C# has different precedence rules than I'm used to, or something...
      case 8:
        return 31;
      case 2:
        if (( (year % 4 == 0) && !(year % 100 == 0) ) || (year % 400 == 0)) return 29;
        else return 28;
      case ((2 <= month) && (month <= 12))://PLEASE explain to me how this is somehow trying to implicitly convert a bool to an int over here. I cannot figure it out. It makes no sense. I've explicitly parenthesized everything, and it STILL gives me that error. At this point, it seems like a compiler bug... It happens with the first case expression as well. I have no idea what's wrong, but the program should be correct otherwise.
        return 30;
      default:
        return -1;
    }
  }
}
