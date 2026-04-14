const salesService = {
  getTodaySalesTotal: async (cookieHeader) => {
    try {
      const res = await fetch(`${"http://localhost:8080/api/v1"}/sales/today`, {
        headers: cookieHeader ? { "cookie": cookieHeader } : {}
      });
      if (!res.ok) return 0;
      const data = await res.json();
      return data.total || 0;
    } catch (e) {
      return 0;
    }
  },
  getTotalSales: async (cookieHeader) => {
    try {
      const res = await fetch(`${"http://localhost:8080/api/v1"}/sales/total`, {
        headers: cookieHeader ? { "cookie": cookieHeader } : {}
      });
      if (!res.ok) return 0;
      const data = await res.json();
      return data.total || 0;
    } catch (e) {
      return 0;
    }
  },
  getRecentSales: async (cookieHeader) => {
    try {
      const res = await fetch(`${"http://localhost:8080/api/v1"}/sales/recent`, {
        headers: cookieHeader ? { "cookie": cookieHeader } : {}
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data.map((s) => ({ ...s, date: new Date(s.date || s.created_at || s.createdAt) }));
    } catch (e) {
      return [];
    }
  },
  getTodayData: async (cookieHeader) => {
    try {
      const res = await fetch(`${"http://localhost:8080/api/v1"}/sales/stats?period=hoy`, {
        headers: cookieHeader ? { "cookie": cookieHeader } : {}
      });
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      return [];
    }
  },
  getWeeklyData: async (cookieHeader) => {
    try {
      const res = await fetch(`${"http://localhost:8080/api/v1"}/sales/stats?period=semana`, {
        headers: cookieHeader ? { "cookie": cookieHeader } : {}
      });
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      return [];
    }
  },
  getMonthlyData: async (cookieHeader) => {
    try {
      const res = await fetch(`${"http://localhost:8080/api/v1"}/sales/stats?period=mes`, {
        headers: cookieHeader ? { "cookie": cookieHeader } : {}
      });
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      return [];
    }
  }
};

export { salesService as s };
