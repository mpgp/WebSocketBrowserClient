export interface Server {
    id: number;
    address: string;
    code: string;
    name: string;
}

export interface Servers {
    servers: Server[];
}
