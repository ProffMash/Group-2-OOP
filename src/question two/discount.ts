import { Products } from "./products";

class Discount {
  protected discount: number;
  protected price :Products

  constructor(_discount: number, _price: Products) {
    this.discount = _discount;
    this.price = _price;
  }

  getDiscount(): number {
    return this.discount;
  }

  setDiscount(discount: number): void {
    this.discount = discount;
  }
}

class NoDiscount extends Discount {
    constructor(discount: number, price: Products){
        super(discount, price);
        this.discount = discount;
    };
    public NoDiscount(): void{
        let price = this.price.getPrice();
        const discount  =this.discount = 0;
        price += discount
        console.log("No discount available");
        
    }
}

class SeasonalDiscount extends Discount {

    constructor(discount: number, price: Products){
        super(discount, price);
        this.discount = discount;
    };
    public SeasonalDiscount(): void{
        let price = this.price.getPrice();
        const discount = this.discount = 10;

        let discountedPrice = price - (price * discount / 100);
        console.log(`Seasonal discount available: ${this.discount}%`);
        console.log(`Discounted price: ${discountedPrice}`);
    }
}

class PromotionalDiscount extends Discount {
    constructor(discount: number, price: Products){
        super(discount, price);
        this.discount = discount;
    };
    public PromotionalDiscount(): void{
        let price = this.price.getPrice();
        const discount =this.discount = 15;

        let discountedPrice = price - (price * discount / 100);
        console.log(`Promotional discount available: ${this.discount}%`);
        console.log(`Discounted price: ${discountedPrice}`);
    }
}

class LoyaltyDiscount extends Discount {
    constructor(discount: number, price: Products){
        super(discount, price);
        this.discount = discount;
    };
    public LoyaltyDiscount(): void{
        let price = this.price.getPrice();
        const discount =this.discount = 20;

        let discountedPrice = price - (price * discount / 100);
        console.log(`Loyalty discount available: ${this.discount}%`);
        console.log(`Discounted price: ${discountedPrice}`);
    }
}

export { Discount, NoDiscount, SeasonalDiscount, LoyaltyDiscount, PromotionalDiscount };
