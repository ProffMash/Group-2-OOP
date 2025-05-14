interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'driver' | 'passenger';
  rating: number;
}

interface IVehicle {
  id: string;
  driverId: string;
  model: string;
  licensePlate: string;
  capacity: number;
}

interface ICoordinates {
  lat: number;
  lng: number;
}

interface IRide {
  id: string;
  passengerId: string;
  driverId: string;
  pickupLocation: ICoordinates;
  dropoffLocation: ICoordinates;
  fare: number;
  status: 'requested' | 'accepted' | 'completed' | 'cancelled';
}


class User implements IUser {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: 'driver' | 'passenger',
    public rating: number = 5
  ) {}

  rate(newRating: number) {
    this.rating = (this.rating + newRating) / 2;
  }
}


class Vehicle implements IVehicle {
  constructor(
    public id: string,
    public driverId: string,
    public model: string,
    public licensePlate: string,
    public capacity: number
  ) {}
}


class Ride implements IRide {
  constructor(
    public id: string,
    public passengerId: string,
    public driverId: string,
    public pickupLocation: ICoordinates,
    public dropoffLocation: ICoordinates,
    public fare: number,
    public status: 'requested' | 'accepted' | 'completed' | 'cancelled' = 'requested'
  ) {}

  updateStatus(newStatus: IRide['status']) {
    this.status = newStatus;
  }
}


class FareService {
  static calculateFare(
    distanceKm: number,
    baseRate: number,
    trafficLevel: 'low' | 'medium' | 'high',
    hour: number
  ): number {
    let multiplier = 1;

    if (trafficLevel === 'high') multiplier += 0.5;
    if (hour >= 18 || hour < 6) multiplier += 0.3;

    return baseRate * distanceKm * multiplier;
  }
}


class MatchingService {
  static findNearestDriver(
    passengerLocation: ICoordinates,
    drivers: { id: string; location: ICoordinates }[]
  ): string | null {
    let nearest = null;
    let minDist = Infinity;

    for (const driver of drivers) {
      const dist = this.haversineDistance(passengerLocation, driver.location);
      if (dist < minDist) {
        minDist = dist;
        nearest = driver.id;
      }
    }

    return nearest;
  }

  private static haversineDistance(p1: ICoordinates, p2: ICoordinates): number {
    const R = 6371; 
    const toRad = (x: number) => (x * Math.PI) / 180;

    const dLat = toRad(p2.lat - p1.lat);
    const dLon = toRad(p2.lng - p1.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(p1.lat)) *
        Math.cos(toRad(p2.lat)) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.asin(Math.sqrt(a));
  }
}

const passenger = new User("p1", "Alice", "alice@example.com", "passenger");
const driver = new User("d1", "Bob", "bob@example.com", "driver");

const ride = new Ride(
  "r1",
  passenger.id,
  driver.id,
  { lat: -1.09, lng: 36.89 },
  { lat: -1.08, lng: 36.87 },
  0
);


ride.fare = FareService.calculateFare(3.5, 100, 'medium', 20);
ride.updateStatus("accepted");

console.log(`Ride from ${ride.pickupLocation.lat},${ride.pickupLocation.lng} to ${ride.dropoffLocation.lat},${ride.dropoffLocation.lng}`);
console.log(`Fare: Ksh ${ride.fare}`);
