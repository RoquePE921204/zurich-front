export interface ClientRequest {
  id?: string;
  userId?: number;
  fullName: string;
  email: string;
  telephone: string;
}
export interface ClientResponse {
  id: string;
  userId?: number;
  fullName: string;
  email: string;
  telephone: string;
}
