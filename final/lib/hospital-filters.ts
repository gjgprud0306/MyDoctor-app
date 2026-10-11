import type { HospitalListItem } from "./hospital-list-data";

export type HospitalFilters = {
  status: "open" | "today" | null;
  methods: ("in_person" | "remote")[];
  distanceKm: 1 | 3 | 5 | null;
};

export const emptyHospitalFilters: HospitalFilters = {
  status: null,
  methods: [],
  distanceKm: null,
};

// The current reservation fixtures describe in-person visits. Remote availability
// is not supplied, so unknown remote care is never presented as available.
export function matchesHospitalFilters(
  hospital: HospitalListItem,
  filters: HospitalFilters,
  distanceKm = Number.parseInt(hospital.distanceText, 10),
) {
  const open = hospital.hours.startsWith("영업 중");
  if (filters.status === "open" && !open) return false;
  if (filters.status === "today" && !(hospital.availableToday ?? open)) return false;
  const methods = hospital.consultationMethods ?? ["in_person"];
  if (filters.methods.length && !filters.methods.some((method) => methods.includes(method))) return false;
  return filters.distanceKm === null || distanceKm <= filters.distanceKm;
}
