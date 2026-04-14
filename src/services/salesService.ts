export interface Sale {
  id: string;
  product: string;
  price: number;
  date: Date;
}

// CAPA DE SERVICIO REAL (Conexión con Spring Boot)
export const salesService = {
  getTodaySalesTotal: async (cookieHeader: string | null): Promise<number> => {
    try {
      const res = await fetch(`${import.meta.env.API_URL}/sales/today`, {
        headers: cookieHeader ? { 'cookie': cookieHeader } : {}
      });
      if (!res.ok) return 0;
      const data = await res.json();
      return data.total || 0;
    } catch(e) {
      return 0; // Fallback visual seguro si falla el backend
    }
  },

  getTotalSales: async (cookieHeader: string | null): Promise<number> => {
    try {
      const res = await fetch(`${import.meta.env.API_URL}/sales/total`, {
        headers: cookieHeader ? { 'cookie': cookieHeader } : {}
      });
      if (!res.ok) return 0;
      const data = await res.json();
      return data.total || 0;
    } catch(e) {
      return 0;
    }
  },
  
  getRecentSales: async (cookieHeader: string | null): Promise<Sale[]> => {
    try {
      const res = await fetch(`${import.meta.env.API_URL}/sales/recent`, {
        headers: cookieHeader ? { 'cookie': cookieHeader } : {}
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data.map((s: any) => ({ ...s, date: new Date(s.date || s.created_at || s.createdAt) }));
    } catch(e) {
      return [];
    }
  },

  getTodayData: async (cookieHeader: string | null) => {
    try {
      const res = await fetch(`${import.meta.env.API_URL}/sales/stats?period=hoy`, {
        headers: cookieHeader ? { 'cookie': cookieHeader } : {}
      });
      if (!res.ok) return [];
      return await res.json();
    } catch(e) { return []; }
  },

  getWeeklyData: async (cookieHeader: string | null) => {
    try {
      const res = await fetch(`${import.meta.env.API_URL}/sales/stats?period=semana`, {
        headers: cookieHeader ? { 'cookie': cookieHeader } : {}
      });
      if (!res.ok) return [];
      return await res.json();
    } catch(e) { return []; }
  },

  getMonthlyData: async (cookieHeader: string | null) => {
    try {
      const res = await fetch(`${import.meta.env.API_URL}/sales/stats?period=mes`, {
        headers: cookieHeader ? { 'cookie': cookieHeader } : {}
      });
      if (!res.ok) return [];
      return await res.json();
    } catch(e) { return []; }
  }
};
