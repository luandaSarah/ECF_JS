 export default class BankAccount {

    constructor(owner, accountNumber, balance = 0) {
        this.owner = owner;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

     setDeposit(amount) {
        this.balance += amount;
        return this.balance;
    }
  
}
