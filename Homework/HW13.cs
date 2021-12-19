using System;
namespace HW13 {
    class Tester {
	public static void Main(string[] args) {
	    var s = new Student("joe", 15);
	    s.thegrade = 'C';
	s.theaddress = new Address("rgyo", "gyhersfg", "rgaz", 36893);
	    s.printInfo();

	    var a1 = new Address("aftgh", "agrrewgfa", "agera", 524634);
	    var a2 = new Address("aftgyhr5eh", "ag634rtrewgfa", "ager64a", 52435635);
	    var a3 = new Address("aftr33243", "agtbsersrewgfa", "agw354twseera", 625634);
	    a1.print();
	    a2.print();
	    a3.print();
	}
    }
    class Student {
	string name;
	int age;
	char grade;
	Address address;
    
	public char thegrade {
	    get {return grade;}
	    set {grade = thegrade;}}
    
	public Address theaddress {
	    get {return this.address;}
	    set {this.address = theaddress;}
	}
  
	public Student(string name, int age) {
	    this.name = name;
	    this.age = age;
	}
    
	public void printInfo() {
	    Console.Write($"Name: {this.name}\t age: {this.age}\tGrade: {this.grade}\n");
	    this.address.print();
	}
    }
    class Address {
	string street
	{get; set;}
	string city
	{get; set;}
	string state
	{get; set;}
    int zip
    {get; set;}

	public void print() {
	    Console.Write($"Street: {this.street}\tCity: {this.city}\tState:{this.state}\tZip:{this.zip}");
	}

	public Address(string street, string city, string state, int zip) {
	    this.street = street;
	    this.state = state;
	    this.city = city;
	    this.zip = zip;
	}
    }
}
