using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sorting {
    internal class Sorting {
        Random random = new Random();
        public Sorting() {
            int[] array = new int[20];
            for (int i = 0; i < array.Length; i++) {
                array[i] = random.Next(100);
            }
            int number = array[4];
            //Console.WriteLine("the number " + number);
            //Array.Sort(array);
            printArray(array);
            BubbleSort(array);
            printArray(array);

            //Console.WriteLine( BinarySearch(number, array) ); 
        }
        public void printArray(int[] array) {
            foreach (var item in array) {
                Console.Write(item + ", ");
            }
            Console.WriteLine();
        }
        public void BubbleSort(int[] arr) {
	    for (int i = 0; i < arr.Length - 1; i++) {
		for (int j = 0; j < arr.Length - i - 1; j++) {
		    if (arr[j] > arr[j + 1]) {
			arr[j] ^= arr[j + 1];
			arr[j + 1] ^= arr[j];
			arr[j] ^= arr[j + 1];
		    }
		}
	    }   
        }
        public int BinarySearch(int number, int[] array) {
            int index = -1;
            int low = 0;
            int hi = array.Length - 1;
            //int mid = (low + hi)/2;
            while (low < hi) {
                int mid = (low + hi) / 2;
                if (number > array[mid]) {
                    low = mid + 1;
                }
                else if (number < array[mid]) {
                    hi = mid - 1;
                }
                else {
                    index = mid;
                    break;
                }
            }
            return index;
        }
        static void Main(string[] args) {
            new Sorting();
        }
    }
}
