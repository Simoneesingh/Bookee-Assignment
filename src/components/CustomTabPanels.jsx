import React, { useEffect, useState } from "react";
import axios from "axios";
import { groupShiftsByDate, formatShiftTime } from "../util/shiftUtils";
import { useShiftsContext } from "../context/ShiftsContext";

function CustomTabPanels({ value, index, area, handleCancelClick }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addSelectedShift } = useShiftsContext();
  const [loadingStates, setLoadingStates] = useState({});
  const [bookingStatus, setBookingStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/shifts?booked=false&area=${area}`);
        const shiftsForArea = response.data
          ? response.data.filter((shift) => shift.area === area)
          : [];
        const groupedShifts = groupShiftsByDate(shiftsForArea);
        setData(groupedShifts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [area]);

  const handleBookClick = async (shift) => {
    try {
      setLoadingStates((prevStates) => ({ ...prevStates, [shift.id]: true }));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedShift = { ...shift, booked: !shift.booked };
      addSelectedShift(updatedShift);

      setBookingStatus((prevStatus) => ({
        ...prevStatus,
        [shift.id]: !shift.booked,
      }));
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, [shift.id]: false }));
    }
  };

  const doShiftsOverlap = (shift1, shift2) => {
    return (
      (shift1.startTime <= shift2.startTime &&
        shift1.endTime >= shift2.startTime) ||
      (shift2.startTime <= shift1.startTime &&
        shift2.endTime >= shift1.startTime)
    );
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <div>
          <table className="border-2" style={{ width: "600px" }}>
            <tbody>
              {data &&
                data.map((group) => (
                  <React.Fragment key={group.date}>
                    <tr className="">
                      <th className="flex items-start" colSpan="2">
                        <span className="text-Blue500 m-2">
                          {group.date} {`(${group.shifts.length})`}
                        </span>
                      </th>
                    </tr>
                    {group.shifts.map((shift, idx) => (
                      <tr key={shift.id} className="border-b">
                        <td className="text-Blue500 flex flex-col m-2 px-2">
                          {formatShiftTime(shift.startTime, shift.endTime)}
                        </td>
                        <td className="text-right">
                          <React.Fragment>
                            {idx > 0 &&
                              doShiftsOverlap(shift, group.shifts[idx - 1]) && (
                                <span className="text-Pink font-semibold m-2">
                                  Overlapping
                                </span>
                              )}
                            {bookingStatus[shift.id] && (
                              <span className="text-Blue500 font-semibold m-2">
                                Booked
                              </span>
                            )}
                            <button
                              className={`px-6 mx-2 border-2 rounded-full ${
                                idx > 0 &&
                                doShiftsOverlap(shift, group.shifts[idx - 1])
                                  ? "cursor-not-allowed border-Green100 text-Green100"
                                  : "border-Green500 text-Green500"
                              }`}
                              disabled={
                                isLoading ||
                                (idx > 0 &&
                                  doShiftsOverlap(shift, group.shifts[idx - 1]))
                              }
                              onClick={() => handleBookClick(shift)}
                            >
                              {bookingStatus[shift.id] ? "Cancel" : "Book"}
                            </button>
                          </React.Fragment>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CustomTabPanels;
