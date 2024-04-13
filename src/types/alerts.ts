export interface IAlert {
  id: string | number;
  type: 'error' | 'success' | 'warning';
  message: string;
}

export type AlertsType = IAlert[];
