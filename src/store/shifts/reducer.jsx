// reducer.jsx
import { useState } from "react";
import { SET_LOADING, REMOVE_LOADING, SET_SHIFTS } from "./type";

export const initialShiftsState = {
  shifts: [],
  isApiLoading: false,
};

export const useShiftsData = () => {
  const [state, setState] = useState(initialShiftsState);

  const setShifts = (shifts) => {
    setState((prevState) => ({ ...prevState, shifts: shifts || [] }));
  };

  const setLoading = () => {
    setState((prevState) => ({ ...prevState, isApiLoading: true }));
  };

  const removeLoading = () => {
    setState((prevState) => ({ ...prevState, isApiLoading: false }));
  };

  return {
    state,
    setShifts,
    setLoading,
    removeLoading,
  };
};

export const IShifts = {
  shifts: [],
  isApiLoading: false,
};
