namespace HW19 {

    class Shape {
	public virtual void Draw() {}
    }

    class Circle : Shape {
	private double radius;
	public double Radius {
	    get {
		return radius;
	    }
	    set {
	    this.radius = value;
	    }
	}
	    public Circle() {
	    radius = 5;
	    }
	    public Circle(double r) {
	    radius = r;
	    }
	public override void Draw() => System.Console.WriteLine($"Circle, radius {radius}");
    }

    class Square : Shape {
	private double size;
	public double Size {
	    get {
	    return size;
	    }
	    set {
	    this.size = value;
	    }
	}
	public Square() => size = 10;
    
	public Square(double d) => size = d;
    
	public override void Draw() => System.Console.WriteLine($"Square, size {size}");
    
	public override bool Equals(System.Object o) {
	return o != null && o is Square && this.Size == ((Square) o).Size;
	}
	public override int GetHashCode() {
	int n = 0;
	    for (int i = 0; i < 32; i++) {
	    n |= (n >> i) ^ (n >> (2 * i + 1));//pretty sure I got this right
	    }//will the compiler vectorize this?
	return n;
   }
}
    public class HW19 {
	public static void Main(string[] args) {
	    Shape[] arr = new Shape[]{
		new Square(),
		new Circle(),
		new Square(15.1),
		new Square(15.1),
		new Circle(6.3)
	    };
	    for (int i = 0; i < arr.Length; i++) {
	    if (arr[i] is Circle) {
		((Circle) arr[i]).Radius++;
	    ((Circle) arr[i]).Draw();
	    }
	    if (arr[i] is Square) {
		((Square) arr[i]).Size++;
		((Square) arr[i]).Draw();
	    if (i + 1 < arr.Length) System.Console.WriteLine($"arr[{i}] == arr[{i+1}]: {((Square) arr[i]).Equals(arr[i+1])}");
	    }
	}
    }
    }
}
