const expenseService = {
  getTotalExpenses: async (cookieHeader) => {
    try {
      const res = await fetch(`${"http://localhost:8080/api/v1"}/expenses/total`, {
        headers: cookieHeader ? { "cookie": cookieHeader } : {}
      });
      if (!res.ok) return 0;
      const data = await res.json();
      return data.total || 0;
    } catch (e) {
      return 0;
    }
  },
  getRecentExpenses: async (cookieHeader) => {
    try {
      const res = await fetch(`${"http://localhost:8080/api/v1"}/expenses/recent`, {
        headers: cookieHeader ? { "cookie": cookieHeader } : {}
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data.map((e) => ({ ...e, date: new Date(e.date || e.created_at || e.createdAt) }));
    } catch (e) {
      return [];
    }
  }
};

export { expenseService as e };
