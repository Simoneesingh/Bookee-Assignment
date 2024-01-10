import { useEffect, useState } from "react";
// import HTTPService from "../httpService";
import { getListOfAllShifts } from "../api/controllers/get-all-shift";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function convertMillisecondsToMonthNameAndDay(milliseconds) {
  const date = new Date(milliseconds);
  const month = date.getMonth();
  const day = date.getDate();
  return `${monthNames[month]} ${day}`;
}

export function convertMillisecondsToHourAndMinute(milliseconds) {
  const date = new Date(milliseconds);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute || "00"}`;
}

export const checkIfDateIsTodayOrTomorrow = (date) => {
  const todayDate = new Date();
  const today = convertMillisecondsToMonthNameAndDay(todayDate.valueOf());
  todayDate.setDate(todayDate.getDate() + 1);
  const tomorrow = convertMillisecondsToMonthNameAndDay(todayDate.valueOf());

  if (today === date) return "Today";
  else if (tomorrow === date) return "Tomorrow";
  else return date;
};

export const getTotalDurationOfShifts = (shiftsArray) => {
  let totalTime = 0;
  shiftsArray.forEach((shift) => {
    totalTime += shift.endTime - shift.startTime;
  });
  totalTime /= 3600000;
  return totalTime >= 1 ? `${Math.floor(totalTime)}h` : `${totalTime * 60}m`;
};

const ShiftListComponent = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    fetchListOfAllShifts();
  }, []);

  const fetchListOfAllShifts = async () => {
    try {
      const response = await getListOfAllShifts();
      setShifts(response.data);
    } catch (error) {
      console.error("Error fetching list of shifts:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-500 mb-4">List of Shifts</h1>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id} className="mb-6">
            <p>ID: {shift.id}</p>
            <p>Booked: {shift.booked ? "Yes" : "No"}</p>
            <p>Area: {shift.area}</p>
            <p>
              Start Time: {convertMillisecondsToHourAndMinute(shift.startTime)}
            </p>
            <p>End Time: {convertMillisecondsToHourAndMinute(shift.endTime)}</p>
            <p>
              Date:{" "}
              {checkIfDateIsTodayOrTomorrow(
                convertMillisecondsToMonthNameAndDay(shift.startTime)
              )}
            </p>
            <p>Total Duration: {getTotalDurationOfShifts([shift])}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShiftListComponent;
