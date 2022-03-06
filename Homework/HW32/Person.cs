using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HW32 {
     public class Person {
        private string name = "";
        private int age = 10;

        /*
         * Name property
         */
        public string Name {
            get { return name.ToUpper(); }
            set { 
                if(value == "" || value == null) {
                    name = "John doe";
                } else {
                    name = value; 
                }
                
            }
        }

        //this is how the getter and setter for age, would look like in Java
        public int getAge() {
            return age;
        }
        public void setAge(int theAge) {
            age = theAge;
        }


        /*
        * Age property
        */
        public int Age {
            get { 
                return age; 
            }
            set {
                age = value;
                //if (value < 0) {
                //    age = 0;
                //}
                //if (value > 120) {
                //    age = 120;
                //}
               
            }
        }


        public bool isOld() {
            if(age > 95)
                return true;

            return false;
        }
        public void ageAyear() {
            Age++;
        }
        public void Print() {
            Console.WriteLine($"my name is {name}, age {age}");
        }
	public Person(String name, int age) {
	    this.Name = name;
	    this.age = age;
	}
    }
}
