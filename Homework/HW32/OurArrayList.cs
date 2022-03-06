using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;
namespace HW32 {

    public class BadIndexException : Exception {
        public BadIndexException(int index, int count, string msg) :base(msg) {
            Index = index;
            Count = count;
        }

        public int Index { get; }
        public int Count { get; }

    }
    public class OurArrayList<E> {
        E[] arr;
	IComparer<E> comparator;
        public int Count { get; private set; }
        public OurArrayList(int intialSize, IComparer<E> c) {
            arr = new E[intialSize];
	    comparator = c;
        }

        public void Clear() {
            Array.Clear(arr, 0, Count);
	    Count = 0;
        }
        public void Add(E item) {

            if (Count == arr.Length) {
                E[] temp = new E[arr.Length * 2];
                Array.Copy(arr, temp, arr.Length);
                arr = temp;
                Console.WriteLine("New array size is " + arr.Length);
            }
            arr[Count++] = item;
        }
        private E Get(int index) {
            if (index >= Count || index < 0) {
                //Console.WriteLine("How dare you ask for something out of bounds");
                //return null;
                throw new BadIndexException(index, Count, "Attempting to index out of bouds of the list");
                //return default(E);
            }
            return arr[index];
        }
        public E this[int index] {
            get { return Get(index); }
            set {
                if (index >= 0 && index < Count) {
                    arr[index] = value;
                }
            }
        }
        public int IndexOf(E item) {
            for (int i = 0; i < Count; i++) {
                if(arr[i].Equals(item))
                    return i;
            }
            return -1;
        }
        public bool Contains(E item) {
            return IndexOf(item) >= 0;
        }

        public E RemoveAt(int index) {
            //if (index >= Count || index < 0) {
            //    throw new BadIndexException(index, Count, "Attempting to index out of bouds of the list");
            //    //Console.WriteLine("How dare you ask for something out of bounds");
            //    //return default(E);
            //}
            E item;
            try {
               item = arr[index];
            }
            catch (IndexOutOfRangeException ex) {
                Console.WriteLine(ex.Message);
                //throw ex;
                throw;
            }
            
            Array.Copy(arr, index + 1, arr, index, Count - index - 1);
            Count--;
            arr[Count] = default(E);
            return item;
        }
        public void TrimToSize() {
            if (Count != arr.Length) {
                E[] newArr = new E[Count];
                Array.Copy(arr, 0, newArr, 0, Count);
                arr = newArr;
            }
        }
	public int Search(E item) {
	    if (comparator == null) return -1;
	    Array.Sort(arr, 0, Count, comparator);
	    int index = -1;
            int low = 0;
            int hi = Count - 1;
            while (low < hi) {
                int mid = (low + hi) / 2;
                if (comparator.Compare(item, arr[mid]) > 0) {
                    low = mid + 1;
                }
                else if (comparator.Compare(item, arr[mid]) < 0) {
                    hi = mid - 1;
                }
                else {
                    index = mid;
                    break;
                }
            }
            return index;
	}
    }
    public class HW32 {
	public static void Main(string[] args) {
	    var list = new OurArrayList<Person>(5, new PersonComparer());
	    var p = new Person("Bob", 50);
	    list.Add(p);
	    list.Add(new Person("Alice", 30));
	    Console.WriteLine(list.Search(p));
	}
    }
    public class PersonComparer : IComparer<Person> {
	public int Compare(Person p1, Person p2) {
	return p1.Name.CompareTo(p2.Name);
	}
    }
}
