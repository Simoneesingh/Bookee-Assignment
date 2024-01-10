import { useState, useEffect } from "react";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
// import Table from "./Table";

export default function AvailableShifts() {
  const [selectedCity, setSelectedCity] = useState("Helsinki");
  const { response, loading, error } = useAxios(
    `/shifts?booked=false&area=${selectedCity}`
  );
  const [availableShifts, setAvailableShifts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(
          `/shifts?booked=false&area=${selectedCity}`
        );
        console.log("Data received:", response.data);
        setAvailableShifts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [selectedCity]);

  const bookShift = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/shifts/${id}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(`Failed to book shift with status: ${response.status}`);
        return null;
      }

      const bookedShift = await response.json();
      console.log("Shift booked successfully:", bookedShift);

      // Refetch available shifts after booking
      const updatedShiftsResponse = await fetch(
        `/api/shifts?booked=false&area=${selectedCity}`
      );
      const updatedShifts = await updatedShiftsResponse.json();
      setAvailableShifts(updatedShifts);

      return bookedShift;
    } catch (error) {
      console.error("Error while booking shift:", error);
      return null;
    }
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  // Extracting unique areas from available shifts
  const areas = [...new Set(availableShifts.map((shift) => shift.area))];

  return (
    <div>
      <table className="border-2 w-[500px]">
        <thead>
          <tr className="flex">
            {areas.map((area) => (
              <th
                key={area}
                className={`flex-1 text-center cursor-pointer ${
                  area === selectedCity
                    ? "font-semibold text-Blue"
                    : "text-Blue500"
                }`}
                onClick={() => handleCityClick(area)}
              >
                {area}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {availableShifts.map((shift) => {
            <tr key={shift.id}>
              <td>{shift.startTime}</td>
              <td>{shift.endTime}</td>
              <td>{shift.area}</td>
              <td>
                <button
                  className="border-2 border-red-900"
                  onClick={() => bookShift(shift.id)}
                >
                  Book
                </button>
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}
