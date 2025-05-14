"use strict";
// // Interface for Borrowable physical items
// interface Borrowable {
//   checkOut(user: UserAccount): void;
//   returnItem(user: UserAccount, returnDate: Date): void;
// }
Object.defineProperty(exports, "__esModule", { value: true });
// Abstract class for all library items
class LibraryItem {
    id;
    title;
    year;
    constructor(id, title, year) {
        this.id = id;
        this.title = title;
        this.year = year;
    }
}
// Book class
class Book extends LibraryItem {
    isCheckedOut = false;
    dueDate;
    getType() {
        return "Book";
    }
    checkOut(user) {
        if (!this.isCheckedOut) {
            this.isCheckedOut = true;
            this.dueDate = new Date();
            this.dueDate.setDate(this.dueDate.getDate() + 14);
            user.borrowedItems.push({ item: this, dueDate: this.dueDate });
            console.log(`${this.title} checked out by ${user.username}`);
        }
    }
    returnItem(user, returnDate) {
        this.isCheckedOut = false;
        const record = user.borrowedItems.find(b => b.item === this);
        if (record) {
            const due = record.dueDate.getTime();
            const returned = returnDate.getTime();
            if (returned > due) {
                const daysLate = Math.ceil((returned - due) / (1000 * 3600 * 24));
                user.addFine(daysLate * 1); // $1 per day
                console.log(`Late return! ${daysLate} day(s) overdue.`);
            }
            user.borrowedItems = user.borrowedItems.filter(b => b.item !== this);
        }
        console.log(`${this.title} returned by ${user.username}`);
    }
}
// DVD class (inherits Book behavior)
class DVD extends Book {
    getType() {
        return "DVD";
    }
}
// EBook (not borrowable physically)
class EBook extends LibraryItem {
    getType() {
        return "EBook";
    }
}
// Base class for all users
class UserAccount {
    username;
    password;
    borrowedItems = [];
    fine = 0;
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    addFine(amount) {
        this.fine += amount;
    }
    getFine() {
        return this.fine;
    }
    payFine(amount) {
        this.fine = Math.max(0, this.fine - amount);
    }
    listBorrowedItems() {
        if (this.borrowedItems.length === 0) {
            console.log(`${this.username} has no borrowed items.`);
            return;
        }
        console.log(`${this.username}'s Borrowed Items:`);
        this.borrowedItems.forEach(b => {
            const now = new Date().getTime();
            const daysLeft = Math.ceil((b.dueDate.getTime() - now) / (1000 * 3600 * 24));
            console.log(`- ${b.item instanceof LibraryItem ? b.item.title : 'Unknown'} (Due in ${daysLeft} day(s))`);
        });
    }
}
// Member class
class Member extends UserAccount {
    constructor(username, password) {
        super(username, password);
    }
}
// Librarian class
class Librarian extends UserAccount {
    constructor(username, password) {
        super(username, password);
    }
    addItemToLibrary(library, item) {
        library.addItem(item);
        console.log(`${item.title} added to library by librarian.`);
    }
}
// Library class to manage items and users
class Library {
    items = [];
    users = [];
    addItem(item) {
        this.items.push(item);
    }
    registerUser(user) {
        this.users.push(user);
        console.log(`User '${user.username}' registered.`);
    }
    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            console.log(`Login successful for ${username}`);
            return user;
        }
        else {
            console.log(`Login failed for ${username}`);
            return null;
        }
    }
    searchItems(keyword) {
        const results = this.items.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()));
        console.log(`Search results for "${keyword}":`);
        results.forEach(i => console.log(`- ${i.title} (${i.getType()})`));
        return results;
    }
    listAllItems() {
        console.log(`Library Items:`);
        this.items.forEach(item => {
            console.log(`- ${item.title} (${item.getType()})`);
        });
    }
}
// 🧪 Example Usage
const library = new Library();
const librarian = new Librarian("admin", "admin123");
const member = new Member("david", "1234");
library.registerUser(librarian);
library.registerUser(member);
const book = new Book("B1", "TypeScript Guide", 2022);
const dvd = new DVD("D1", "JS Movie", 2021);
const ebook = new EBook("E1", "Learning React", 2023);
librarian.addItemToLibrary(library, book);
librarian.addItemToLibrary(library, dvd);
librarian.addItemToLibrary(library, ebook);
library.listAllItems();
const loggedInUser = library.login("david", "1234");
if (loggedInUser instanceof Member) {
    const [tsBook] = library.searchItems("TypeScript");
    if (tsBook instanceof Book) {
        tsBook.checkOut(loggedInUser);
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 20); // 6 days late
        tsBook.returnItem(loggedInUser, returnDate);
    }
    loggedInUser.listBorrowedItems();
    console.log(`Current fine: $${loggedInUser.getFine()}`);
}
