export interface InsuranceRequest {
  id?: string;
  clientId: string;
  type: 'Vida' | 'Automóvil' | 'Salud' | 'Hogar';
  insuredAmount: number;
  startDate: string;
  expirationDate: string;
}

export interface InsuranceResponse {
  id: string;
  clientId: string;
  type: 'Vida' | 'Automóvil' | 'Salud' | 'Hogar';
  insuredAmount: number;
  startDate: string;
  expirationDate: string;
}
