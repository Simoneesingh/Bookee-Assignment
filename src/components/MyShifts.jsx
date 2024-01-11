// MyShifts.jsx

import React from "react";
import { useShiftsContext } from "../context/ShiftsContext";
import {
  formatShiftTime,
  formatDate,
  calculateTotalDuration,
} from "../util/shiftUtils";

function MyShifts() {
  const { selectedShifts, removeSelectedShift, addSelectedShift } =
    useShiftsContext();

  const sortShiftsByStartTime = (shifts) => {
    return shifts.sort((a, b) => a.startTime - b.startTime);
  };

  const sortedSelectedShifts = sortShiftsByStartTime(selectedShifts);

  const handleCancelClick = (shift) => {
    // Remove the selected shift when "Cancel" is clicked
    removeSelectedShift(shift);
  };

  const handleBookClick = (shift) => {
    // Add or remove the selected shift when "Book" is clicked
    if (isShiftSelected(shift)) {
      handleCancelClick(shift);
    } else {
      addSelectedShift(shift);
    }
  };

  let currentDateHeading = null;

  const totalDurationToday = calculateTotalDuration(sortedSelectedShifts);

  const isShiftSelected = (shift) => {
    return selectedShifts.some(
      (selectedShift) => selectedShift.id === shift.id
    );
  };

  return (
    <div>
      {sortedSelectedShifts &&
        sortedSelectedShifts.map((selectedShift, index) => {
          const shiftDate = formatDate(selectedShift.startTime);

          const shouldDisplayDateHeading = currentDateHeading !== shiftDate;
          currentDateHeading = shiftDate;

          // Filter the shifts for the current day
          const shiftsForCurrentDay = sortedSelectedShifts.filter(
            (shift) => formatDate(shift.startTime) === shiftDate
          );

          return (
            <div key={index} className="bg-white">
              {shouldDisplayDateHeading && (
                <h2 className="font-bold mt-2 p-2 text-Blue500 ">
                  {shiftDate}
                  <span className="text-sm font-normal text-Blue100">{`  ${
                    shiftsForCurrentDay.length
                  } shifts, ${totalDurationToday / (60 * 60 * 1000)} h`}</span>
                </h2>
              )}

              <table className="border-2" style={{ width: "500px" }}>
                <tbody>
                  <tr>
                    <td className="text-Blue500 flex flex-col m-2 px-2">
                      {formatShiftTime(
                        selectedShift.startTime,
                        selectedShift.endTime
                      )}
                      <span className="text-Blue100">{selectedShift.area}</span>
                    </td>
                    <td className="text-right">
                      <button
                        className="text-red-600 border-2 px-6 m-2 border-red-600 rounded-full"
                        onClick={() => handleBookClick(selectedShift)}
                      >
                        {isShiftSelected(selectedShift) ? "Cancel" : "Book"}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
}

export default MyShifts;
