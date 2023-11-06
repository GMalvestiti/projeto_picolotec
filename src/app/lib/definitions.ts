export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Car = {
    id: string;
    description: string;
    make: string;
    model: string;
    cost: number;
}

export type Client = {
    id: string;
    name: string;
    description: string;
};

export type Task = {
    id: string;
    car_id: string;
    client_id: string;
    origin_id: string;
    destination_id: string;
    date: string;
    time: string;
    price: number;
};