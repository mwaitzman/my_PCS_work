using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
namespace HW16 {

    public class OrderForm {
        public static void Main(string[] args) {
            ItemDatabase idb = new ItemDatabase();
            Order o = new Order(new Address("7523 Negro lane", "Miami", "FL", 34524),
                            "Bob Marley",
                            RandomSubsetOfRandomLength(idb));
        }

        private static Item[] RandomSubsetOfRandomLength(ItemDatabase idb) {
            ArrayList o = new ArrayList();
            Random r = new Random();
            for (int i = 0; i < idb.ItemsLength; i++) {
                if (idb.GetById(i) != null && r.Next(4) < 2) o.Add(idb.GetById(i));//not robust at all but fulfills the reqs so w/e
            }
            return (Item[]) o.ToArray();
        }
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
            Console.WriteLine($"Total: {getTotal() + calculateTax()} (with ${calculateTax()} tax)");
        }

        public double getTotal() {
            double total = 0;
            for (int i = 0; i < items.Length; i++) {
                total += items[i].Price;
            }
            return total;
        }

        public double calculateTax() {
            const double TAX_RATE = 0.06;
            double tax = 0;
            for (int i = 0; i < this.items.Length; i++) {
                tax += items[i].isTaxable ? items[i].Price * TAX_RATE : 0;
            }
            return tax;
        }
	}


    class Item {
        string name;
        public string Name {
          get {return name;}
        }
        string description;
        public string Description {
          get {return description;}
        }
        double price;
        public bool isTaxable;
        public double Price {
            get{return price;}}

        private int id;
        public int Id
            {get;}
        private static int highest_ID_assigned = -1;
        private static SortedSet<int> reclaimedIDs = new SortedSet<int>();//why can't I elide the type in the constructor call here?

        public Item(string name, string description, double price) {
            this.name = name;
            this.description = description;
            this.price = price;
            this.isTaxable = false;//default
            if (highest_ID_assigned == -1) {
                highest_ID_assigned = this.id = 0;
            }
            else if (reclaimedIDs.Count != 0) {
                this.id = reclaimedIDs.Min;
                reclaimedIDs.Remove(this.Id);
            }
            else {
                this.id = ++highest_ID_assigned;
            }
        }

        public void Print() {
            Console.WriteLine($"name: {name}\tdescription: {description}\tprice: {price}\tTaxable: {isTaxable}");
        }

        ~Item() {
            reclaimedIDs.Add(this.Id);
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
            Console.Write($"Street: {this.street}\tCity: {this.city}\tState:{this.state}\tZip:{this.zip}\n");
        }

        public Address(string street, string city, string state, int zip) {
            this.street = street;
            this.state = state;
            this.city = city;
            this.zip = zip;
        }
    }



    class ItemDatabase {
        Item[] items;
        private static Random random = new Random();
        public int ItemsLength {
            get{return items.Length;}}
        public ItemDatabase() {
            items = new Item[100];
            for (int i = 0; i < 20; i++) {
                items[i] = new Item(RandomString(), RandomString(), Math.Abs(random.NextDouble() * random.Next()));
            }
        }

        public Item GetById(int id) {
            for (int i = 0; i < items.Length; i++) {
                if (items[i] != null && items[i].Id == id) return items[i];
            }
            return null;
        }
        public Item[] GetAllWithSubStringAtBeginningOfName(string s) {
          int matchlen = 0;
          var matches = new Item[items.Length];
          for (int i = 0; i < items.Length; i++) {
            if (items[i].Name.StartsWith(s)) {
              matches[matchlen++] = items[i];
            }
          }
          Array.Resize(ref matches, matchlen);
          return matches;
        }

        public Item[] GetAllWithSubStringInDescription(string s) {
          int matchlen = 0;
          var matches = new Item[items.Length];
          for (int i = 0; i < items.Length; i++) {
            if (items[i].Description.Contains(s)) {
              matches[matchlen++] = items[i];
            }
          }
          Array.Resize(ref matches, matchlen);
          return matches;
        }

        public static string RandomString() {//hail StackOverflow
            int length = random.Next(200);
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
}
    }
}
