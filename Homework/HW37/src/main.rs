
use std::{sync::{RwLock, Arc}, thread, time::Duration};

fn main() {
    #![allow(non_snake_case)]
    
    let chopstick_1 = Arc::new(RwLock::new(()));
    let chopstick_2 = Arc::new(RwLock::new(()));
    let chopstick_3 = Arc::new(RwLock::new(()));
    let chopstick_4 = Arc::new(RwLock::new(()));
    let chopstick_5 = Arc::new(RwLock::new(()));



    let chopstick_1_handle = Arc::clone(&chopstick_1);
    let chopstick_5_handle = Arc::clone(&chopstick_5);

    let philo_1 = thread::spawn(move || loop {        
        println!("Philosopher 1 is now thinking");
        thread::sleep(Duration::from_secs(1));
        if let Ok(_chopstick_R) = (*chopstick_1_handle).try_write() {
            if let Ok(_chopstick_L) = (*chopstick_5_handle).try_write() {
                println!("Philosopher 1 is now eating");
                
            }
        }
    });


    let chopstick_2_handle = Arc::clone(&chopstick_2);
    let chopstick_3_handle = Arc::clone(&chopstick_3);

    let philo_2 = thread::spawn(move || loop {
        println!("Philosopher 2 is now thinking");
        thread::sleep(Duration::from_secs(1));
        if let Ok(_chopstick_R) = (*chopstick_2_handle).try_write() {
            if let Ok(_chopstick_L) = (*chopstick_3_handle).try_write() {
                println!("Philosopher 2 is now eating");
                
            }
        }
    });


    let chopstick_3_handle = Arc::clone(&chopstick_3);
    let chopstick_4_handle = Arc::clone(&chopstick_4);

    let philo_3 = thread::spawn(move || loop {
        println!("Philosopher 3 is now thinking");
        thread::sleep(Duration::from_secs(1));
        if let Ok(_chopstick_R) = (*chopstick_3_handle).try_write() {
            if let Ok(_chopstick_L) = (*chopstick_4_handle).try_write() {
                println!("Philosopher 3 is now eating");
                
            }
        }
    });


    let chopstick_4_handle = Arc::clone(&chopstick_4);
    let chopstick_5_handle = Arc::clone(&chopstick_5);

    let philo_4 = thread::spawn(move || loop {
        println!("Philosopher 4 is now thinking");
        thread::sleep(Duration::from_secs(1));
        if let Ok(_chopstick_R) = (*chopstick_4_handle).try_write() {
            if let Ok(_chopstick_L) = (*chopstick_5_handle).try_write() {
                println!("Philosopher 4 is now eating");
                
            }
        }
    });

    
    let chopstick_5_handle = Arc::clone(&chopstick_5);
    let chopstick_4_handle = Arc::clone(&chopstick_1);

    let philo_5 = thread::spawn(move || loop {
        println!("Philosopher 5 is now thinking");
        thread::sleep(Duration::from_secs(1));
        if let Ok(_chopstick_R) = (*chopstick_5_handle).try_write() {
            if let Ok(_chopstick_L) = (*chopstick_4_handle).try_write() {
                println!("Philosopher 5 is now eating");
                
            }
        }
    });
    

    {
        #![allow(unused_must_use)]
        philo_1.join();
        philo_2.join();
        philo_3.join();
        philo_4.join();
        philo_5.join();
    }
}
