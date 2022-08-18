const BankAccount = (function() {
    "use strict";
    let New = function() { // Wish JS allowed r#<reserved keyword>
	return {
	    balance: 0,
	    perform_transaction: function(amount) {
		this.balance += amount;
	    },
	};
    };
    
    return {
	New: New
    }
})();

let bank_acc_1 = BankAccount.New();
let bank_acc_2 = BankAccount.New();

bank_acc_1.perform_transaction(42);
console.log(bank_acc_1.balance === 42);


function transaction(amount) {
    this.balance += amount;
}

transaction.call(bank_acc_2, 500);
console.log(bank_acc_2.balance === 500);

const deposit_50_in_acc_2 = bank_acc_1.perform_transaction.bind(bank_acc_2, 50);

const old_balance = bank_acc_2.balance;
deposit_50_in_acc_2();
console.log(bank_acc_2.balance - 50 === old_balance);
