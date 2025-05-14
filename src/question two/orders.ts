import { users } from "./users";
import { Products } from "./products";

class Shipping {
  constructor(public address: string, public status: string = "Pending") {}
}

class Orders{
    id: number;
    customerId: users;
    productId: Products;
    quantity: number;
    orderDate: Date;
    shipping: Shipping;
    status: string = "processing";

    constructor(_id: number, _customerId: users, _productId: Products, _quantity: number, _orderDate: Date, _status: string, _shipping: Shipping) {
        this.id = _id;
        this.customerId = _customerId;
        this.productId = _productId;
        this.quantity = _quantity;
        this.shipping = _shipping;
        this.orderDate = _orderDate;
        this.status = _status;
    }

    getId(): number {
        return this.id;
    }
    getCustomerId(): users {
        return this.customerId;
    }
    getProductId(): Products {
        return this.productId;
    }
    getQuantity(): number {
        return this.quantity;
    }
    getOrderDate(): Date {
        return this.orderDate;
    }
    getShipping(): Shipping {
        return this.shipping;
    }
    getStatus(): string {
        return this.status;
    }

}

export { Orders, Shipping };