import { Clothing, Furniture, electronics } from "./products";
import { Customer, Admin, Seller } from "./users";


const product1 = new electronics(1, "Laptop", 1000, 10,'hp',2);
product1.getProductInfo()
const product2 = new Clothing(2, "T-Shirt", 20, 50, "M", "Red");
product2.getProductInfo()
const product3 = new Furniture(3, "Sofa", 500, 5, "Leather", "2x3m");
product3.getProductInfo()


const customer1 = new Admin(1, "Alice", 30, "alice@gmail.com", "admin")
customer1.getUserInfo()
const customer2 = new Seller(2, "Bob", 25, "boba@gmail.com", 134)
customer2.getUserInfo()
const customer3 = new Customer(3, "Charlie", 28, "charlie@gmail.com", "22nd Street", 1234567890)
customer3.getUserInfo()