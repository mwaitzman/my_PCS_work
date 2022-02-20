using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrowableArray {
    public class OurArrayList {
        object[] arr;

        public int Count { get; private set; }
        public OurArrayList(int initialSize) {
            arr = new object[initialSize];
        }
        public OurArrayList() : this(8) {

        }

        public void Clear() {
            Count = 0;
            Array.Clear(arr);
        }
        public void Add(object i) {

            if (Count == arr.Length) {
                object[] temp = new object[arr.Length * 2];
                Array.Copy(arr, temp, arr.Length);
                arr = temp;
                Console.WriteLine("New array size is " + arr.Length);
            }
            arr[Count++] = i;
        }
        private object Get(int index) {
            if (index >= Count || index < 0) {
		throw new InvalidValueException("bad value", index, arr.Length);
            }
            return arr[index];
        }
        public object this[int index] {
            get { return Get(index); }
            set {
                if (index >= 0 && index < Count) {
                    arr[index] = value;
                }
            }
        }
    }
    class InvalidValueException : Exception {
	int count;
	int index;
	public int Count {get {return count;}}
	public int Index {get {return index;}}
    
	public InvalidValueException(String message, int count, int index) :  base($"{message}, {count}. {index}"){}
    }
    class HW28 {
	public static void Main(string[] args) {
	    var al = new OurArrayList(1);
	    try {
		_ = al[42];
	    }
	    catch(InvalidValueException e) {
		Console.WriteLine(e);
	    }
	}
    }
}
