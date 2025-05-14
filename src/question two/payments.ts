class Payment {
    protected amount: number;
    protected date: Date;
    protected method: string;

  constructor(_amount: number, _data: Date, _method: string) {
    this.amount = _amount;
    this.date = _data;
    this.method = _method;
  }

    getAmount(): number {
        return this.amount;
    }
    getDate(): Date {
        return this.date;
    }
    getMethod(): string {
        return this.method;
    }
}

class CreditCardPayment extends Payment {
    protected cardNumber: string;
    protected cardHolderName: string;

  constructor(amount: number,date: Date,method: string,_cardNumber: string,_cardHolderName: string) {
    super(amount, date, method);
    this.cardNumber = _cardNumber;
    this.cardHolderName = _cardHolderName;
  }

  getCardNumber(): string {
    return this.cardNumber;
  }
  getCardHolderName(): string {
    return this.cardHolderName;
  }
}

class WalletPayment extends Payment {
    protected walletId: string;
    protected walletProvider: string;

  constructor(amount: number,date: Date,method: string,_walletId: string,_walletProvider: string) {
    super(amount, date, method);
    this.walletId = _walletId;
    this.walletProvider = _walletProvider;
  }

  getWalletId(): string {
    return this.walletId;
  }
  getWalletProvider(): string {
    return this.walletProvider;
  }
}

class CODPayment extends Payment {
    protected codAmount: number;
    protected deliveryAddress: string;

  constructor(amount: number,date: Date,method: string,_codAmount: number,_deliveryAddress: string) {
    super(amount, date, method);
    this.codAmount = _codAmount;
    this.deliveryAddress = _deliveryAddress;
  }

  getCodAmount(): number {
    return this.codAmount;
  }
  getDeliveryAddress(): string {
    return this.deliveryAddress;
  }
}

export { Payment, CreditCardPayment, WalletPayment, CODPayment };