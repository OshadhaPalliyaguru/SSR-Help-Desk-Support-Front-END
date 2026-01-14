export type Ticket = {
  id: number;
  employeeName: string;
  issueDescription: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: string;
};