using System;
namespace HW21 {
    class Person {
    static Random r = new Random();
	static int instances = 0;
	public static int Instances {
	    get {return instances;}
	}
	static int leaves = 0;
	public static int Leaves {
	    get {return leaves;}
	}
	Person[] children;
	public Person(int numberOfChildren) {
	    instances++;
	    children = new Person[numberOfChildren];
	    for (int i = 0; i < numberOfChildren; i++) {
		children[i] = new Person(r.Next(0, 3));
	    }
	}
    public void GetLeaves() {//I vastly prefer how Rust does this, and keep on trying to do it like that :|
	    int l = this.children.Length;//hate C#'s mutability defaults
	    if (l == 0) leaves++;
	    for(int i = 0; i < l; i++) {
		children[i].GetLeaves();
	    }
	}
    }
    public class HW21 {
	public static void Main(string[] args) {
	    var person = new Person(1);
	    person.GetLeaves();
	    Console.WriteLine(Person.Instances);//do I have to `use` Instances to not have to qualify the reference or something?
	    Console.WriteLine(Person.Leaves);
	}
    }
}
