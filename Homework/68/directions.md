For specific homework for last class, please do the following: 
 
1 - Create 2 instances of a simple bank account object that has a balance property. Each bank account object should also have a function "performTransaction" that takes a transaction amount (can be + (deposit) or - (withdrawal) and adjusts "this.balance" by the transaction amount  

2 - Do the same thing, but this time write performTransaction as a separate function "transaction" that is not part of the account objects. Instead call it using call and/or apply to set which object will be "this".

3 - use bind to set up a bound call to performTransaction that deposits $50 into a specific one of the accounts each time it's called. (E.g const depositFiftyInSavings = bind...; Then call depositFiftyInSavings(); and that will cause$50 to be added to an account.
