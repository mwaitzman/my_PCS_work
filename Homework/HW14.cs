using System;
namespace HW14 {

    public class OrderForm {
	public static void Main(string[] args) {
	    Order o = new Order(new Address("7523 Negro lane", "Miami", "FL", 34524), "Bob Marley", new Item[]{new Item("blackened cock", "a beautifully roasted cock (with optional recording of its final crow)", 60.62), new Item("faggots in gravy", "premium Swiss faggots soaked in an exquisite pineapple-based sauce", 25.63)});
	}	}
    }
    class Order {
	Address address;
	string name;
	Item[] items;

    public Order(Address address, string name, Item[] items) {
	this.address = address;
	this.name = name;
    this.items = items;
    }
    public void Print() {
	address.Print();
    Console.WriteLine($"name: {name}");
	for (int i = 0; i < items.Length; i++) {
	items[i].Print();
	}
	}
	public double getTotal() {
	double total = 0;
	for (int i = 0; i < items.Length; i++) {
	    total += items[i].Price;
	}
	return total;
	}
	}
    class Item {
	string name;
	string description;
    double price;
    public double Price {
	get{return price;}}
	public Item(string name, string description, double price) {
	this.name = name;
	    this.description = description;
	    this.price = price;
	}
    public void Print() {
	Console.WriteLine($"name: {name}\tdescription: {description}\tprice: {price}");
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

	public void Print() {
	    Console.Write($"Street: {this.street}\tCity: {this.city}\tState:{this.state}\tZip:{this.zip}");
	}

	public Address(string street, string city, string state, int zip) {
	    this.street = street;
	    this.state = state;
	    this.city = city;
	    this.zip = zip;
	}
    }
