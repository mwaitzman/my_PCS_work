using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace HW31 {
    /*
    internal class LinkedList<E> where E: unmanaged {
        public Node<E> first;
        int counter = 0;
        public int Count { get { return counter; } }
        public Node<E> First { get { return first; } }
        public Node<E> Last { get { return *first.prev; } }

        public void AddFront(E data) {
            Node<E> newNode = new Node<E>(data);
	    unsafe {
		newNode.next = &this.first;
		(*this.first.prev).next = &newNode;
		*this.first.prev = &newNode;
		this.first = newNode;
	    }
            ++counter;
        }


        public Node<E> Find(E data) {
            if (this.first == null)
            return null;

            Node<E> n = this.first;
	    for (int i = 0; i < this.counter; i++) {
		if (n.Data.Equals(data)) {
                    return n;
		}
		unsafe {n = *n.next;}
	    }

            return null;
        }


        public void AddAfter(Node<E> node, E data) {
            Node<E> newNode = new Node<E>(data);

	    unsafe {
		newNode.prev = &node;
		newNode.next = node.next;
		(*node.next).prev = &newNode;
	    }

            ++counter;
        }

        public bool RemoveFirst(E data) {
	//I don't like this design of returning a bool like this. No differentiation between not found or null list. better to return an enum.
            if (this.first == null) {
		return false;
	}
            Node<E> n = this.first;

            for (int i = 0; i < this.Count; i++) {
                if (n.Data.Equals(data)) {
		    unsafe {
			(*n.prev).next = n.next;
			(*n.next).prev = n.prev;
		    }
		    --counter;
		    return true;
		}
                unsafe {n = *n.next;}
            }
            return false;
        }
}
    internal unsafe class Node<E> where E: unmanaged {
	public Node<E>* prev;
	public E data;
	public Node<E>* next;
        public Node(E data) {
	    this.prev = null;
            this.data = data;
	    this.next = null;
        }
    }
     I had to discard all this code because C# is a shitty language that ALMOST has what I want, but then imposes stupid rules that don't let me do what I want, so I'm not happy about that*/
    internal class LinkedList<E> {
        public Node<E> first;
        int counter = 0;
        public int Count { get { return counter; } }
        public Node<E> First { get { return first; } }
        public Node<E> Last { get { return first.prev; } }

        public void AddFront(E data) {
            Node<E> newNode = new Node<E>(data);
	
	    newNode.next = this.first;
	    this.first.prev.next = newNode;
	    this.first.prev = newNode;
	    this.first = newNode;
	
            ++counter;
        }

    
        public Node<E> Find(E data) {
            if (this.first == null)
            return null;
	
            Node<E> n = this.first;
	    for (int i = 0; i < this.counter; i++) {
		if (n.data.Equals(data)) {
                    return n;
		}
		n = n.next;
	    }
	
            return null;
        }
    
    
        public void AddAfter(Node<E> node, E data) {
            Node<E> newNode = new Node<E>(data);
		newNode.prev = node;
		newNode.next = node.next;
		node.next.prev = newNode;
	
            ++counter;
        }

        public bool RemoveFirst(E data) {
	//I don't like this design of returning a bool like this. No differentiation between not found or null list. better to return an enum.
            if (this.first == null) {
		return false;
	}
            Node<E> n = this.first;
    
            for (int i = 0; i < this.Count; i++) {
                if (n.data.Equals(data)) {
		    n.prev.next = n.next;
		    n.next.prev = n.prev;
		
		    --counter;
		    return true;
		}
            n = n.next;
	}
            return false;
        }
}
    internal class Node<E> {
	public Node<E> prev;
	public E data;
	public Node<E> next;
        public Node(E data) {
	    this.prev = null;
            this.data = data;
	    this.next = null;
        }
    }
    public class HW31 {
	public static void Main(string[] args) {}
    }
}
