namespace HW18 {
    public class Car {
	string model;
	string licensePlate;
	Engine engine;
	public Engine Engine {
	    get {
		return engine;
	    }
	}
    
    public Car(string m, string l) {
	model = m;
	licensePlate = l;
	engine = new Engine();
	}
    }

    public class MiniVan : Car {
	int numberOfSeats;
	public int Seats() {
	    return numberOfSeats;
	
	}
    
	public MiniVan(string m, string l, int n) : base(m, l) {
	    numberOfSeats = n;
	}
    
	public void Print() {
	    System.Console.WriteLine("i'm a minivan");
	}
    }

    public class Engine {
	double horsepower;
	double price;//bad practice but w/e
    
	public void Rev() {
	    System.Console.WriteLine("revving engine...");
	}
    
	public Engine() {
		horsepower = 0;
	    price = 0;
	}
    }

    public class HW18 {
	public static void Main(string[] args) {
	    Car[] cars = new Car[]{
		    new Car("Quisque ut dolor cerat libero , euismod.", " tres, quarum."),
		    new MiniVan("Quisque ut dolor gravida, vel, euismod.", "Gallia est omnis ", 8),
		};
		for (int i = 0; i < cars.Length; i++) {
		cars[i].Engine.Rev();
		if (cars[i] is MiniVan) {
		    ((MiniVan) cars[i]).Print();
		}
		}
	}
    }
    }
