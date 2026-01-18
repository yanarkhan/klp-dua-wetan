export const dashboardKeys = {
  all: ["admin-dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  recentReports: () => [...dashboardKeys.all, "recent-reports"] as const,
  usersSummary: () => [...dashboardKeys.all, "users-summary"] as const,
};
