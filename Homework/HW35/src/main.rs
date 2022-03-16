use std::cell::RefCell;
use std::fmt;
use std::rc::Rc;
use derive_more::Display;
use sixtyfps::SharedString;
use serde_derive::{Serialize, Deserialize};
use dialog::{DialogBox, FileSelectionMode};
use std::env;
use std::fs::{self, File};
use std::io::Write;
use std::path::Path;

sixtyfps::include_modules!();

fn main() {
    const BAL_PREFIX: &str = "balance: $";
    let acc = Rc::new(RefCell::new(CheckingAccount::new()));
    let window = Rc::new(BankAccountGUI::new());

    let win_clone = Rc::clone(&window);
    let acc_clone = Rc::clone(&acc);
    window.on_deposit(move || {
        let amount = win_clone.get_inputMoneyAmount();
        dbg!({}, &amount);
        acc_clone.borrow_mut().try_deposit_with_str(&amount);
        dbg!("{}", &(*acc_clone).borrow().balance);
        win_clone.set_balance(SharedString::from(BAL_PREFIX.to_owned() + &(*acc_clone).borrow().balance.as_string()));
    });


    let win_clone = Rc::clone(&window);
    let acc_clone = Rc::clone(&acc);
    window.on_withdraw(move || {
        let amount = win_clone.get_inputMoneyAmount();
        println!("withdrawing amount: {}", &amount);
        (*acc_clone).borrow_mut().try_withdraw_with_str(amount.as_str());
        dbg!("{}", &(*acc_clone).borrow().balance);
        win_clone.set_balance(SharedString::from(BAL_PREFIX.to_owned() + &(*acc_clone).borrow().balance.as_string()));
    });


    let win_clone = Rc::clone(&window);
    let acc_clone = Rc::clone(&acc);
    window.on_endOfMonth(move || {
        dbg!("attempting to do end of month");
        win_clone.set_balance(SharedString::from(BAL_PREFIX.to_owned() + &(*acc_clone).borrow().balance.as_string()));
    });
    
    let acc_clone = Rc::clone(&acc);
    window.on_save_to_file(move || {
        let selected_file = dialog::FileSelection::new("Please select a save location")
            .title("Save Account")
            .path(env::current_dir().unwrap())
            .mode(FileSelectionMode::Save)
        .show()
        .expect("Could not display save dialog box")
        .unwrap_or(env::current_dir().unwrap()
            .as_path()
            .to_str().unwrap()
            .to_string() + "Bank_Account.ron");
            let acc_ser = ron::ser::to_string(&*acc_clone).expect("failed to serialize the account!");
            let mut save_file = File::create(selected_file).unwrap();
            save_file.write(acc_ser.as_bytes());
    });
    
    let acc_clone = Rc::clone(&acc);
    let win_clone = Rc::clone(&window);
    window.on_load_from_file(move || {
        let selected_file = dialog::FileSelection::new("Please select a load location")
            .title("Load Account")
            .path(env::current_dir().unwrap())
            .mode(FileSelectionMode::Open)
        .show()
        .expect("Could not display load dialog box")
        .unwrap_or(env::current_dir().unwrap()
            .as_path()
            .to_str().unwrap()
            .to_string() + "Bank_Account.ron");
            let mut raw_data = fs::read(selected_file).expect("failed to read the file");
            let deserialized_acc = ron::from_str(std::str::from_utf8(&raw_data).unwrap()).unwrap();
            (*acc_clone).replace(deserialized_acc);
            win_clone.set_balance(SharedString::from(BAL_PREFIX.to_owned() + &(*acc_clone).borrow().balance.as_string()));
    });

    window.run();
}
#[derive(Clone, Copy, Serialize, Deserialize)]
pub struct CheckingAccount {
    balance: Balance,
    last_month_balance: Option<Balance>,
    max_withdrawals: i64,
    withdrawals_this_month: i64,
}
impl CheckingAccount {
    pub fn new() -> Self {
        Self {
            balance: Balance::new(0, 0),
            last_month_balance: None,
            max_withdrawals: 5,
            withdrawals_this_month: 0,
        }
    }

    pub fn deposit(&mut self, amount: Balance) {
        self.balance += amount;
    }
    pub fn deposit_dollars(&mut self, amount: usize) {
        //NOTE: legacy test function, I think. May be removed later
        self.balance.dollars += amount as i64;
    }
    pub fn try_deposit_with_str(&mut self, amount: &str) {
        //NOTE currently quietly fails if the amount can't be parsed as a balance
        if let Ok(bal) = Balance::parse_from_str(&amount) {
            //TODO: disallow depositing a negative amount. NOTE: maybe move the check, once implemented, to somewhere else (the `deposit` function, probably)
            self.deposit(bal);
        }
    }
    pub fn withdraw(&mut self, amount: Balance) -> Result<(), WouldbeNegativeBalance> {
        //TODO: disallow withdrawing a negative amount

        if (self.balance - amount).is_negative() {
            // limitation of rust forbids me from merely doing `if self.balance - amount < 0`
            return Err(WouldbeNegativeBalance);
        }
        self.balance -= amount;
        self.withdrawals_this_month += 1;
        Ok(())
    }
    pub fn try_withdraw_with_str(&mut self, amount: &str) {
        //NOTE currently quietly fails if the amount can't be parsed as a balance
        println!("in try method. balance = {}", self.balance);
        if let Ok(bal) = Balance::parse_from_str(&amount) {
            //NOTE: currently quietly fails if attempting to withdraw negatively.
            let _ = self.withdraw(bal);
        }
        println!("in try method. balance = {}", self.balance);
    }

    pub fn do_end_of_month(&mut self) -> String {
        if self.withdrawals_this_month > self.max_withdrawals {
            self.balance.dollars -= 25;
        }
        let mut output = format!("Current balance: {}", self.balance); //I thought python/C#-like format macro strings were added recently but I guess not...? Eh whatever. The classic way's not that much of a pain for this
        if let Some(val) = self.last_month_balance {
            if self.balance != val {
                output += format!("\t{}", self.balance - val).as_str();
            }
        }
        if self.withdrawals_this_month > self.max_withdrawals {
            output += r#"
You exceeded your maximum amount of withdrawals this month. A $25 fee was automatically assessed."#;
        }
        self.withdrawals_this_month = 0;
        self.last_month_balance = Some(self.balance);
        output
    }
}

pub struct WouldbeNegativeBalance;

impl fmt::Display for WouldbeNegativeBalance {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Aborted operation — would cause balance to be negative!")
    }
}

#[derive(Copy, Clone, Debug, Display, PartialEq, PartialOrd, Serialize, Deserialize)]
#[display(fmt = "{} {}", dollars, cents)]
pub struct Balance {
    dollars: i64,
    cents: i8,
}
impl Balance {
    pub fn new(mut dollars: i64, mut cents: i8) -> Self {
        dollars += (cents / 100) as i64;
        cents = cents % 100;
        Self { dollars, cents }
    }
    pub fn is_negative(&self) -> bool {
        self.dollars < 0 || self.cents < 0
    }

    pub fn as_string(&self) -> String {//temporary — will rework eveything into using proper structs later
        let mut output = String::new();
        if self.is_negative() {output += "-";}
        output += &format!("{}.{}", self.dollars, self.cents);
        output
    }

    pub fn parse_from_str(s: &str) -> Result<Self, ()> {
        let s= s.trim();
        let s = s.split_once('.');
        //ugly as hell. TODO: rework
        if s.is_none() {return Err(());}
        let (dollars, cents) = s.unwrap();
        let mut d = 0;
        let mut c = 0;
        if dollars.len() > 0 {
            d = match dollars.parse::<i64>() {
                Ok(x) => x,
                Err(_) => 0
            };
        }
        if cents.len() > 0 {
            let d = match cents.parse::<i8>() {
                Ok(x) => x,
                Err(_) => 0
            };
        }
        if d == 0 && c == 0 {return Err(());}
        Ok(Self {
            dollars: d,
            cents: c
        })
    }
}

impl std::ops::Add<Balance> for Balance {
    type Output = Balance;
    fn add(self, other: Balance) -> Balance {
        let mut dollars = self.dollars + other.dollars;
        let mut cents = self.cents as i16 + other.cents as i16;
        dollars += (cents / 100) as i64;
        cents = cents % 100;
        let cents = cents as i8;
        Balance { dollars, cents }
    }
}

impl std::ops::AddAssign for Balance {
    fn add_assign(&mut self, other: Self) {
        *self = *self + other;
    }
}

impl std::ops::Sub<Balance> for Balance {
    type Output = Balance;
    fn sub(self, other: Balance) -> Balance {
        let mut dollars = self.dollars - other.dollars;
        let mut cents = self.cents as i16 - other.cents as i16;
        dollars += (cents / 100) as i64; //I think these two lines might be unnecessary now
        cents = cents % 100;
        let cents = cents as i8;
        Balance { dollars, cents }
    }
}

impl std::ops::SubAssign for Balance {
    fn sub_assign(&mut self, other: Self) {
        *self = *self - other;
    }
}
