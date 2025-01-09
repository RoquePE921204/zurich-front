export interface CommonResponse {
  result: boolean;
}
export interface GlobalExceptionResponse {
  message: string;
  messages: { [key: string]: string };
}
