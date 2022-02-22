namespace HW29 {
    public class fibonacci {
	public static int fibo_iter(int n) {
	    if (n == 0) return 0;
	    int resA = 0;
	    int resB = 1;
	    int tmp;
	    for (int i = 1; i < n; i++) {
		tmp = resA + resB;
		resA = resB;
		resB = tmp;
	    }
	    return resB;
	}
	public static int fibo_recur(int n) {
	    if (n == 0){
		return 0;
	    } else if (n == 1 || n == 2) {
		return 1;
	    } else {
		return fibo_iter(n-1) + fibo_iter(n-2);
	    }
	}
    }
    public class HW29 {
	public static void Main(string[] args) {
	    System.Console.WriteLine(fibonacci.fibo_iter(9));
	    System.Console.WriteLine(fibonacci.fibo_recur(9));
	}
    }
}
