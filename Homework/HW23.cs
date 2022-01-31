using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HW23 {
    public class OurArrayList<T> {
        T[] arr;

        public int Count { get; private set; }
        public OurArrayList(int intialSize) {
            arr = new T[intialSize];
        }
        public OurArrayList() : this(8) {

        }

        public void Clear() {
            Count = 0;
	//C# is being retarded here so I'm just going to do this and let the GC take care of it.
            arr = new T[arr.Length];
        }
        public void Add(T i) {

            if (Count == arr.Length) {
                T[] temp = new T[arr.Length * 2];
                Array.Copy(arr, temp, arr.Length);
                arr = temp;
                Console.WriteLine("New array size is " + arr.Length);
            }
            arr[Count++] = i;
        }
        private T Get(int index) {
            if (index >= Count || index < 0) {
                Console.WriteLine("How dare you ask for something out of bounds");
                return default(T);
            }
            return arr[index];
        }
        public T this[int index] {
            get { return Get(index); }
            set {
                if (index >= 0 && index < Count) {
                    arr[index] = value;
                }
            }
        }
    }
public class HW23{public static void Main(string[] args){}}
}
