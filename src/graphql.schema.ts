export class CreateCatInput {
    name?: string;
    age?: number;
}

export class Car {
    _id?: string;
    id?: string;
    regNumber?: string;
    brand?: string;
    model?: string;
    color?: string;
    transmissionType?: number;
    stats?: CarRidesAverage;
}

export class CarRidesAverage {
    count?: number;
    duration?: number;
    load?: number;
    load2?: number;
}

export class Cat {
    id?: number;
    name?: string;
    age?: number;
}

export abstract class IMutation {
    abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>;
}

export class Point {
    type?: string;
    coordinates?: string[];
}

export abstract class IQuery {
    abstract cars(): Car[] | Promise<Car[]>;

    abstract car(id: string): Car | Promise<Car>;

    abstract getCats(): Cat[] | Promise<Cat[]>;

    abstract cat(id: string): Cat | Promise<Cat>;

    abstract rides(): Ride[] | Promise<Ride[]>;

    abstract ride(id: string): Ride | Promise<Ride>;

    abstract ridesByCar(id: string): Ride[] | Promise<Ride[]>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Ride {
    id?: string;
    car?: string;
    startPoint?: Point;
    endPoint?: Point;
    startedAt?: string;
    endedAt?: string;
}

export abstract class ISubscription {
    abstract catCreated(): Cat | Promise<Cat>;
}
