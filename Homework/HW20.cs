using System;
namespace HW20 {
    public abstract class Account {
	protected double balance;//yeah yeah I shouldn't be using doubles for this because IEEE 754 double-precision floats are approximations but whatever — this ain't a real application so I can get away with it
	protected  double? lastMonthBalance;
	public abstract void Deposit(double amount);
	public abstract void Withdraw(double amount);
	public abstract void EndOfMonth();
    }
    public class NegativeBalanceException : Exception {
	public NegativeBalanceException() {
	    Console.WriteLine("cannot complete operation: would result in negative balance.");
	}
    
	public NegativeBalanceException(string message) : base(message) {
	}
    
	public NegativeBalanceException(string message, Exception inner) : base(message, inner) {
	}
    }
    public class Checking : Account {
	public const double maxWithdrawals = 5;
	int withdrawalsThisMonth;
	public int WithdrawalsThisMonth {
	    get {
		return withdrawalsThisMonth;
	    }
	}
	public Checking() {
	    balance = 0.0;
	    lastMonthBalance = null;//is this what it automatically is? Unsure how exactly C# handles uninitialized variables, as I stay far away from those.
	    withdrawalsThisMonth = 0;
	}
	public override void Withdraw(double amount) {
	    if (balance - amount < 0) throw new NegativeBalanceException();
	    balance -= amount;
	    withdrawalsThisMonth++;
	}
	public override void Deposit(double amount) {
	    balance += amount;
	}
	public override void EndOfMonth() {
	    if (withdrawalsThisMonth > maxWithdrawals) balance -= 25;//I deem the behavior from the effects of this acceptable
	    String output = $"Current balance: {balance}";
	    if (lastMonthBalance != null && balance != lastMonthBalance) {
		output += $"\t{balance - lastMonthBalance}";
	    }
	    if (withdrawalsThisMonth > maxWithdrawals) output += "\nYou exceeded your maximum amount of withdrawals this month. A $25 fee has been assessed.";
	    Console.WriteLine(output);
	    withdrawalsThisMonth = 0;
	    lastMonthBalance = balance;
	}
    }
    class Savings {
    }
    public class HW20 {public static void Main(string[] args){}}
}
