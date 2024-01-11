import { useState } from "react";
import MyShifts from "./MyShifts";
import AvailableShifts from "./AvailableShifts";

export default function NavigationBar() {
  const [myShiftsVisible, setMyShiftsVisible] = useState(true);
  const [availableShiftsVisible, setAvailableShiftsVisible] = useState(false);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [groupedShifts, setGroupedShifts] = useState([]); // Add this line

  const toggleMyShiftsVisibility = () => {
    setMyShiftsVisible(true);
    setAvailableShiftsVisible(false);
  };

  const toggleAvailableShiftsVisibility = () => {
    setAvailableShiftsVisible(true);
    setMyShiftsVisible(false);
  };

  const handleCityClick = (city) => {
    const filteredShifts = allShifts.filter((shift) => shift.area === city);
    setFilteredShifts(filteredShifts);
    setSelectedCity(city);
  };

  return (
    <div className="">
      <div className="flex flex-row gap-8 px-4 text-2xl mt-20">
        <h1
          className={`font-semibold ${
            myShiftsVisible ? "text-Blue" : "text-Blue50"
          }`}
          onClick={toggleMyShiftsVisibility}
        >
          My Shifts
        </h1>
        <h1
          className={`font-semibold ${
            availableShiftsVisible ? "text-Blue" : "text-Blue50"
          }`}
          onClick={toggleAvailableShiftsVisibility}
        >
          Available Shifts
        </h1>
      </div>
      <div className="mt-8">
        {myShiftsVisible && <MyShifts />}
        {availableShiftsVisible && (
          <AvailableShifts filteredShifts={filteredShifts} />
        )}
      </div>
    </div>
  );
}
