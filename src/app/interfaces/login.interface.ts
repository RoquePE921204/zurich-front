import { ClientResponse } from "./client.interface";

export interface LoginRequest {
    user: string;
    password: string;
}
export interface LoginResponse {
    role: string;
    client: ClientResponse;
}