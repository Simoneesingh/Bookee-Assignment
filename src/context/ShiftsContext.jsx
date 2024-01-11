import { createContext, useContext, useState } from "react";

const ShiftsContext = createContext();

export const ShiftsProvider = ({ children }) => {
  const [selectedShifts, setSelectedShifts] = useState([]);

  const addSelectedShift = (shift) => {
    setSelectedShifts((prevSelectedShifts) => [...prevSelectedShifts, shift]);
  };

  const removeSelectedShift = (shift) => {
    setSelectedShifts((prevSelectedShifts) =>
      prevSelectedShifts.filter((s) => s !== shift)
    );
  };

  const value = {
    selectedShifts,
    addSelectedShift,
    removeSelectedShift,
  };

  return (
    <ShiftsContext.Provider value={value}>{children}</ShiftsContext.Provider>
  );
};

export const useShiftsContext = () => useContext(ShiftsContext);
