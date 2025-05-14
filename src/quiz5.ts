
// --- Abstraction & Polymorphism: Animal Hierarchy ---
abstract class Animal {
  constructor(public id: number, public name: string) {}
  abstract eat(): void;
  abstract makeSound(): void;
}

class Bird extends Animal {
  eat() { console.log(`${this.name} pecks at seeds.`); }
  makeSound() { console.log(`${this.name} chirps.`); }
  fly() { console.log(`${this.name} is flying.`); }
}

class Mammal extends Animal {
  eat() { console.log(`${this.name} chews its food.`); }
  makeSound() { console.log(`${this.name} makes a mammal sound.`); }
}

class Reptile extends Animal {
  eat() { console.log(`${this.name} snaps at prey.`); }
  makeSound() { console.log(`${this.name} hisses.`); }
  hibernate() { console.log(`${this.name} is hibernating.`); }
}

// --- Encapsulation: Habitat Control ---
class Habitat {
  private cleanliness: number = 100;
  constructor(
    public id: number,
    public temperature: number,
    public feedingSchedule: string[]
  ) {}

  adjustTemperature(newTemp: number) {
    this.temperature = newTemp;
    console.log(`Habitat ${this.id} temperature set to ${newTemp}°C`);
  }

  updateCleanliness(level: number) {
    this.cleanliness = Math.max(0, Math.min(100, level));
    console.log(`Habitat ${this.id} cleanliness is now ${this.cleanliness}%`);
  }

  getStatus() {
    return { temperature: this.temperature, cleanliness: this.cleanliness };
  }
}

// --- Observer Pattern: Health Alerts ---
interface Observer {
  update(subject: Subject, data: any): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(data: any): void;
}

class Sensor implements Subject {
  private observers: Observer[] = [];
  attach(observer: Observer) { this.observers.push(observer); }
  detach(observer: Observer) { this.observers = this.observers.filter(o => o !== observer); }
  notify(data: any) { this.observers.forEach(o => o.update(this, data)); }

  // Simulate health check
  measure(healthData: any) {
    console.log("Sensor: health data measured.");
    this.notify(healthData);
  }
}

class HealthAlert implements Observer {
  constructor(private name: string) {}
  update(subject: Subject, data: any) {
    console.log(`Alert[${this.name}]: Health data received:`, data);
  }
}

// --- Strategy Pattern: Feeding Strategies ---
interface FeedingStrategy {
  feed(animal: Animal): void;
}

class HerbivoreFeeding implements FeedingStrategy {
  feed(animal: Animal) {
    console.log(`Feeding ${animal.name} with plants and vegetables.`);
  }
}

class CarnivoreFeeding implements FeedingStrategy {
  feed(animal: Animal) {
    console.log(`Feeding ${animal.name} with meat.`);
  }
}

class OmnivoreFeeding implements FeedingStrategy {
  feed(animal: Animal) {
    console.log(`Feeding ${animal.name} with mixed diet.`);
  }
}

// --- Roles: Zookeeper & Vet ---
class Zookeeper {
  constructor(public name: string) {}
  performFeeding(animal: Animal, strategy: FeedingStrategy) {
    console.log(`${this.name} is feeding ${animal.name}.`);
    strategy.feed(animal);
  }
}

class Vet implements Observer {
  constructor(public name: string) {}
  update(subject: Subject, data: any) {
    console.log(`Vet ${this.name} checks health data:`, data);
  }
}

// --- Example Usage ---
const parrot = new Bird(1, "Polly");
const lion = new Mammal(2, "Leo");

const habitatA = new Habitat(101, 25, ["08:00", "14:00", "20:00"]);

const healthSensor = new Sensor();
const keeper = new Zookeeper("Jane");
const vet = new Vet("Dr. Smith");
const alertService = new HealthAlert("Central Alert");

healthSensor.attach(alertService);
healthSensor.attach(vet);

// Simulate operations
keeper.performFeeding(parrot, new HerbivoreFeeding());
keeper.performFeeding(lion, new CarnivoreFeeding());

healthSensor.measure({ animalId: parrot.id, status: "Healthy" });
habitatA.adjustTemperature(22);
habitatA.updateCleanliness(85);
