interface Borrowable {
  checkOut(user: UserAccount): void;
  returnItem(user: UserAccount, returnDate: Date): void;
}

// Abstract base class for all library items
abstract class LibraryItem {
  constructor(
    public id: string,
    public title: string,
    public year: number
  ) {}

  abstract getType(): string;
}

// Book class 
class Book extends LibraryItem implements Borrowable {
  private isCheckedOut = false;
  private dueDate?: Date;

  getType(): string {
    return "Book";
  }

  checkOut(user: UserAccount): void {
    if (!this.isCheckedOut) {
      this.isCheckedOut = true;
      this.dueDate = new Date();
      this.dueDate.setDate(this.dueDate.getDate() + 14); // 2 weeks
      user.borrowedItems.push({ item: this, dueDate: this.dueDate });
      console.log(`${this.title} checked out by ${user.username}`);
    }
  }

  returnItem(user: UserAccount, returnDate: Date): void {
    this.isCheckedOut = false;
    const record = user.borrowedItems.find(b => b.item === this);
    if (record) {
      const due = record.dueDate.getTime();
      const returned = returnDate.getTime();
      if (returned > due) {
        const daysLate = Math.ceil((returned - due) / (1000 * 3600 * 24));
        user.addFine(daysLate * 1); // $1 per day
      }
    }
    console.log(`${this.title} returned by ${user.username}`);
  }
}

// DVD class 
class DVD extends Book {
  getType(): string {
    return "DVD";
  }
}

// EBook class
class EBook extends LibraryItem {
  getType(): string {
    return "EBook";
  }
}

// Type for borrowed item records
type BorrowedItem = {
  item: Borrowable;
  dueDate: Date;
};

// Base class for user accounts
class UserAccount {
  public borrowedItems: BorrowedItem[] = [];
  private fine: number = 0;

  constructor(public username: string, public password: string) {}

  addFine(amount: number) {
    this.fine += amount;
  }

  getFine(): number {
    return this.fine;
  }

  payFine(amount: number) {
    this.fine = Math.max(0, this.fine - amount);
  }
}

// Member user
class Member extends UserAccount {
  constructor(username: string, password: string) {
    super(username, password);
  }
}

// Librarian user
class Librarian extends UserAccount {
  constructor(username: string, password: string) {
    super(username, password);
  }

  addItemToLibrary(item: LibraryItem) {
    console.log(`${item.title} added to library by libarian.name.`);
  }
}

// Usage Example
const member = new Member("david", "1234");
const book = new Book("B1", "Philosopy IBSN 1011", 2022);
const ebook = new EBook("E1", "Digital Learning", 2023);
const dvd = new DVD("D1", "Roman Civilization History", 2021);

book.checkOut(member);

const lateReturnDate = new Date();
lateReturnDate.setDate(lateReturnDate.getDate() + 20); // returned 6 days late

book.returnItem(member, lateReturnDate);


// Example: Calculate fine based on return date
const anotherBook = new Book("B3", "World History", 2019);
anotherBook.checkOut(member);

// Simulate a late return (e.g., 5 days late)
const anotherLateReturnDate = new Date();
anotherLateReturnDate.setDate(anotherLateReturnDate.getDate() + 19); // 5 days late (14+5)
anotherBook.returnItem(member, anotherLateReturnDate);
console.log(`Fine for David after returning 'World History' late: $${member.getFine()}`);

// usage example
const librarian = new Librarian("susan", "adminpass");
librarian.addItemToLibrary(book);
librarian.addItemToLibrary(ebook);
librarian.addItemToLibrary(dvd);

