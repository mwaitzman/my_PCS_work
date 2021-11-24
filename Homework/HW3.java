class P1 {
  public static void main(String[] args) {
    double s1 = 36.3, s2 = 54.8, s3 = 90.1;
    System.out.print((int)(s1+s2+s3)/3);
  }
}
class P2 {
  public static void toUppercaseAndPrint(char c) {
    c -= 32;
    System.out.print(c);
  }
}
class P3 {
  public static void P3(int x) {
    if (x == 10) System.out.println(x--);
    System.out.println(--x);
  }
}
class P4 {
  public static void printGrade(double grade) {
    System.out.print(
    grade >= 90 ? "A"
    : grade >= 80 ? "B"
    : grade >= 70 ? "C"
    : grade >= 65 ? "D"
    : "F"
    );
  }
}
