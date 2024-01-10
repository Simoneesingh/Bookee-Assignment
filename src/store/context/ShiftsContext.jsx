import React from "react";
import { initialShiftsState } from "../shifts/reducer";

const ShiftsContext = React.createContext(initialShiftsState);

export default ShiftsContext;
