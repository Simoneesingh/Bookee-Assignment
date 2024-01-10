import { useEffect } from "react";
import toast from "react-hot-toast";
import { getListOfAllShifts } from "./api/controllers/get-all-shift";
import { useShiftsData } from "./store/shifts/reducer";
import { REMOVE_LOADING, SET_LOADING, SET_SHIFTS } from "./store/shifts/type";

export const useApp = () => {
  const [shifts, dispatch] = useShiftsData();

  const refreshShifts = () => {
    dispatch({ type: SET_LOADING });
    getListOfAllShifts()
      .then((allShifts) => {
        dispatch({ type: SET_SHIFTS, payload: allShifts.data });
        dispatch({ type: REMOVE_LOADING });
      })
      .catch((err) => {
        dispatch({ type: REMOVE_LOADING });
        toast.error(err?.data?.message);
      });
  };

  useEffect(() => {
    refreshShifts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [shifts, refreshShifts];
};
