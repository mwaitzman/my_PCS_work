use std::fmt;
use derive_more::Display;

sixtyfps::include_modules!();
fn main() {
    let mut acc = CheckingAccount::new();
    let window = BankAccountGUI::new();
    window.on_deposit(move |s| {
        acc.try_deposit(&s);
        println!("{}", acc.balance.dollars);
    });
    window.on_withdraw(move || {
        acc.try_withdraw("");
        println!("{}", acc.balance.dollars);
    });
    
    window.run();
}
#[derive(Clone, Copy)]
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
        self.balance.dollars += amount as i64;
    }
    pub fn try_deposit(&mut self, amount: &str) {
        self.balance.dollars += 5;
    }
    pub fn withdraw(&mut self, amount: Balance) -> Result<(), WouldbeNegativeBalance> {
        if (self.balance - amount).is_negative() {
            // limitation of rust forbids me from merely doing `if self.balance - amount < 0`
            return Err(WouldbeNegativeBalance);
        }
        self.balance -= amount;
        self.withdrawals_this_month += 1;
        Ok(())
    }
    pub fn try_withdraw(&mut self, amount: &str) {
        self.balance.cents -= 5;
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

#[derive(Copy, Clone, Display, PartialEq, PartialOrd)]
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
