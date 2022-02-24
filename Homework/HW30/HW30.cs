using System.Collections.Generic;
namespace HW30 {
public class Person {
    public string name;
    public int age;
    }

    internal class Test {
        static void Main(string[] args) {
            List<Person> pList = new List<Person> { 
                new Person(){name="Jim", age=45},  
                new Person(){name="Joe", age=25},
                new Person(){name="Jack", age=35},
                new Person(){name="Jill", age=20},
                new Person(){name="Jeff", age=30},
                new Person(){name="Jenn", age=55}
            };
	    for (int i = 0,  o = 0; i < pList.Count; i++) {
	    var p = pList[i - o];
                if (p.age < 30) {
		    pList.Remove(p);//-- this will crash
		++o;
                }      
            }
         }
    }
}
