export type Agenda = {
  id: number;
  name: string;
  date: string;
  createdAt: string;
  UpdatedAt: string;
};

export type AgendaParams = {
  name: string;
  date: string;
};

export type GetAgendaList = {
  agenda: Agenda[];
  totalData: number;
};
