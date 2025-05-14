// Quiz 3: Abstract Classes

interface PersonInterface {
  id: number;
  name: string;
  getRole(): string;
}

interface Assessment {
  title: string;
  maxScore: number;
  calculateGrade(score: number): string;
}

interface Tcourse {
    title: string;
    display(): void;
}

//abstraction class for people and content
abstract class Person implements PersonInterface {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  abstract getRole(): string;
}

class Student extends Person {
  getRole(): string {
    return "Student";
  }
}

class Professor extends Person {
  getRole(): string {
    return "Professor";
  }
}

class Admin extends Person {
  getRole(): string {
    return "Admin";
  }
}

//composite patterns
abstract class Course implements Tcourse {
  title: string;
  constructor(title: string) {
    this.title = title;
  }
  abstract display(): void;
}

class Lectures extends Course {
  display() {
    console.log(`Lecture: ${this.title}`);
  }
}

//implementation of the Assessment interface
class Quiz implements Assessment {
  title: string;
  maxScore: number;

  constructor(title: string, maxScore: number) {
    this.title = title;
    this.maxScore = maxScore;
  }

  calculateGrade(score: number): string {
    const percentage = (score / this.maxScore) * 100;
    if (percentage >= 90) return "A";
    else if (percentage >= 80) return "B";
    else if (percentage >= 70) return "C";
    else if (percentage >= 60) return "D";
    else return "F";
  }
}

class Assignment implements Assessment {
  title: string;
  maxScore: number;

  constructor(title: string, maxScore: number) {
    this.title = title;
    this.maxScore = maxScore;
  }

  calculateGrade(score: number): string {
    const percentage = (score / this.maxScore) * 100;
    if (percentage >= 90) return "A";
    else if (percentage >= 80) return "B";
    else if (percentage >= 70) return "C";
    else if (percentage >= 60) return "D";
    else return "F";
  }
}

class Project implements Assessment {
  title: string;
  maxScore: number;

  constructor(title: string, maxScore: number) {
    this.title = title;
    this.maxScore = maxScore;
  }

  calculateGrade(score: number): string {
    const percentage = (score / this.maxScore) * 100;
    if (percentage >= 50) return "Pass";
    else return "Fail";
  }
}

class Notifications {
  static sendNotification(person: Person, message: string) {
    console.log(
      `Notification to ${person.getRole()} (${person.name}): ${message}`
    );
  }
}
//enrollment class

class Enrollment {
  private grade: number = 0;

  constructor(public student: Student, public course: Tcourse) {

  }
  setGrade(score: number) {
    if (score >= 0 && score <= 100) {
      this.grade = score;
    } else {
      throw new Error("Invalid grade");
    }
  }

  getGrade(): number {
    return this.grade;
  }
}
