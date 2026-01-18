import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "../lib/query-keys";
import {
  fetchDashboardStats,
  fetchRecentReports,
  fetchUsersSummary,
} from "../lib/admin-dashboard-api";

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: fetchDashboardStats,
  });
}

export function useUsersSummary() {
  return useQuery({
    queryKey: dashboardKeys.usersSummary(),
    queryFn: fetchUsersSummary,
  });
}

export function useRecentReports() {
  return useQuery({
    queryKey: dashboardKeys.recentReports(),
    queryFn: fetchRecentReports,
  });
}
