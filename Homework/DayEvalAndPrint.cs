using System;
class DayEvalAndPrint {
  static void Main(string[] args) {
    Console.Write(SwitchHelper(args[1]));//would normally be args[0] but because the batch script I'm using to run my standalone C# programs is currently not removing the first arg, I have to use args[1] instead for now
  }
  static string SwitchHelper(string s) {
    return s switch {
        "1" => "sunday".Length.ToString(),//I'm assuming it evaluates all the day length stuff at compile time, as all the requisite information should be known then
        "2" => "monday".Length.ToString(),
        "3" => "tuesday".Length.ToString(),
        "4" => "wednesday".Length.ToString(),
        "5" => "thursday".Length.ToString(),
        "6" => "friday".Length.ToString(),
        "7" => "saturday".Length.ToString(),
        _ => ""
    };
  }
}
