class users {
  protected id: number;
  protected name: string;
  protected age: number;
  protected email: string;

  constructor(_id: number, _name: string, _age: number, _email: string) {
    this.id = _id;
    this.name = _name;
    this.age = _age;
    this.email = _email;
  }
    getId(): number {
        return this.id;
    }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getEmail(): string {
    return this.email;
  }

  getUserInfo(): void {
    console.log(`ID: ${this.id}, Name: ${this.name}, Age: ${this.age}, Email: ${this.email}`);
  }
}

class Customer extends users {
  protected address: string;
  protected phoneNumber: number;

  constructor(id: number,name: string,age: number,email: string,_address: string,_phoneNumber: number) {
    super(id, name, age, email);
    this.id = this.getId();
    this.name = this.getName();
    this.age = this.getAge();
    this.email = this.getEmail();
    this.address = _address;
    this.phoneNumber = _phoneNumber;
  }
    getAddress(): string {
        return this.address;
    }
    getPhoneNumber(): number {
        return this.phoneNumber;
    } 
}
class Admin extends users {
    protected role: string;
    
    constructor(id: number, name: string, age: number, email: string, _role: string) {
        super(id, name, age, email);
        this.id = this.getId();
        this.name = this.getName();
        this.age = this.getAge();
        this.email = this.getEmail();
        this.role = _role;
    }
        getRole(): string {
            return this.role;
        }
}
class Seller extends users {
    protected guestId: number;
    
    constructor(id: number, name: string, age: number, email: string, _guestId: number) {
        super(id, name, age, email);
        this.id = this.getId();
        this.name = this.getName();
        this.age = this.getAge();
        this.email = this.getEmail();
        this.guestId = _guestId;
    }
        getGuestId(): number {
            return this.guestId;
        }
}

class Guests{
    static UsersProducts(type: string, id: number, name: string, age: number, email: string, guestId: number, phoneNumber: number): users{
        switch(type){
            case "Customer":
                return new Customer(id, name, age, email, "address", phoneNumber);
            case "Admin":
                return new Admin(id, name, age, email, "role");
            case "Seller":
                return new Seller(id, name, age, email, guestId);
            default:
                throw new Error("Invalid user type");
        }

    };
}
export { users, Customer, Admin, Seller, Guests };