class Products{
    protected id: number;
    protected name: string;
    protected price: number;
    protected quantity: number;

    constructor(_id: number, _name: string, _price: number, _quantity: number) {
        this.id = _id;
        this.name = _name;
        this.price = _price;
        this.quantity = _quantity;
    }

    getId(): number {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getPrice(): number {
        return this.price;
    }
    getQuantity(): number {
        return this.quantity;
    }
    getProductInfo(): void {
        console.log( `ID: ${this.id}, Name: ${this.name}, Price: ${this.price}, Quantity: ${this.quantity}`);
    }
}

class electronics extends Products{
    protected brand: string;
    protected warranty: number;

    constructor(id: number, name: string, price: number, quantity: number, _brand: string, _warranty: number) {
        super(id, name, price, quantity);
        this.id =this.getId();
        this.name = this.getName();
        this.price = this.getPrice();
        this.quantity = this.getQuantity();
        this.brand = _brand;
        this.warranty = _warranty;
    }

    getBrand(): string {
        return this.brand;
    }
    getWarranty(): number {
        return this.warranty;
    }
}

class Clothing extends Products{
    protected size: string;
    protected color: string;

    constructor(id: number, name: string, price: number, quantity: number, _size: string, _color: string) {
        super(id, name, price, quantity);
        this.id =this.getId();
        this.name = this.getName();
        this.price = this.getPrice();
        this.quantity = this.getQuantity();
        this.size = _size;
        this.color = _color;
    }

    getSize(): string {
        return this.size;
    }
    getColor(): string {
        return this.color;
    }
}

class Furniture extends Products{
    protected material: string;
    protected dimensions: string;

    constructor(id: number, name: string, price: number, quantity: number, _material: string, _dimensions: string) {
        super(id, name, price, quantity);
        this.id =this.getId();
        this.name = this.getName();
        this.price = this.getPrice();
        this.quantity = this.getQuantity();
        this.material = _material;
        this.dimensions = _dimensions;
    }

    getMaterial(): string {
        return this.material;
    }
    getDimensions(): string {
        return this.dimensions;
    }
}

class ProductsFactory {
    static createProduct(type: string, id: number, name: string, price: number, quantity: number): Products {
        switch (type) {
            case 'electronics':
                return new electronics(id, name, price, quantity, "brand", parseInt("warranty"));
            case 'clothing':
                return new Clothing(id, name, price, quantity, "size", "color");
            case 'furniture':
                return new Furniture(id, name, price, quantity, "material", "dimensions");
            default:
                throw new Error('Invalid product type');
        }
    }
}

export {Products, electronics, Clothing, Furniture, ProductsFactory}