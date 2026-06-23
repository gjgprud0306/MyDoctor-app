import { hospitalList } from "@/lib/hospital-list-data";
import { noExtraFeeHospitals } from "@/lib/no-extra-fee-hospital-data";

export const reservationHospitals = [...hospitalList, ...noExtraFeeHospitals];

export type ReservationHospital = (typeof reservationHospitals)[number];

export function findReservationHospital(hospitalId: string | null): ReservationHospital {
  return (
    reservationHospitals.find((hospital) => hospital.id === hospitalId) ??
    reservationHospitals[0]
  );
}
