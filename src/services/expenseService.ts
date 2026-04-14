export interface Expense {
  id: string;
  item: string;
  amount: number;
  date: Date;
  isFixed: boolean;
}

// CAPA DE SERVICIO REAL (Conexión con Spring Boot)
export const expenseService = {
  getTotalExpenses: async (cookieHeader: string | null): Promise<number> => {
    try {
      const res = await fetch(`${import.meta.env.API_URL}/expenses/total`, {
        headers: cookieHeader ? { 'cookie': cookieHeader } : {}
      });
      if (!res.ok) return 0;
      const data = await res.json();
      return data.total || 0;
    } catch(e) {
      return 0;
    }
  },
  
  getRecentExpenses: async (cookieHeader: string | null): Promise<Expense[]> => {
    try {
      const res = await fetch(`${import.meta.env.API_URL}/expenses/recent`, {
        headers: cookieHeader ? { 'cookie': cookieHeader } : {}
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data.map((e: any) => ({ ...e, date: new Date(e.date || e.created_at || e.createdAt) }));
    } catch(e) {
      return [];
    }
  }
};
