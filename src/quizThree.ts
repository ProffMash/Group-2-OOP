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
abstract class CourseContent {
    title: string;
  constructor(title: string) {
    this.title = title;
  }
  abstract display(): void;
}

class Lecture extends CourseContent {
  display() {

    console.log(`Lecture: ${this.title}`);
  }
}

class Assignment extends CourseContent {
  display() {
    console.log(`Assignment: ${this.title}`);
  }
}

class Module extends CourseContent {
  contents: CourseContent[] = [];

  addContent(content: CourseContent) {
    this.contents.push(content);
  }

  display() {
    console.log(`Module: ${this.title}`);
    this.contents.forEach((content) => content.display());
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