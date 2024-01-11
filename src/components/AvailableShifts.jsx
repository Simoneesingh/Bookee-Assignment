import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import Tabs from "./TabsContainer";
import { useShiftsContext } from "../context/ShiftsContext";
import useAxios from "../hooks/useAxios";
import { groupShiftsByDate } from "../util/shiftUtils";

export default function AvailableShifts() {
  const { addSelectedShift } = useShiftsContext();
  const [selectedCity, setSelectedCity] = useState("Helsinki");
  const { response } = useAxios(`/shifts?booked=false&area=${selectedCity}`);
  const [availableShifts, setAvailableShifts] = useState([]);
  const [groupedShifts, setGroupedShifts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/shifts?booked=false&area=${selectedCity}`
        );
        setAvailableShifts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCity]);

  useEffect(() => {
    const groupShifts = groupShiftsByDate(availableShifts);
    setGroupedShifts(groupShifts);
  }, [availableShifts]);

  const handleBookClick = async (id) => {
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

      const updatedShiftsResponse = await fetch(
        `/api/shifts?booked=false&area=${selectedCity}`
      );
      const updatedShifts = await updatedShiftsResponse.json();
      setAvailableShifts(updatedShifts);
      addSelectedShift(bookedShift);

      return bookedShift;
    } catch (error) {
      console.error("Error while booking shift:", error);
      return null;
    }
  };

  const formatShiftTime = (startTime, endTime) => {
    const start = DateTime.fromMillis(startTime).toFormat("HH:mm");
    const end = DateTime.fromMillis(endTime).toFormat("HH:mm");
    return `${start} - ${end}`;
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const areas = [...new Set(availableShifts.map((shift) => shift.area))];

  return <Tabs data={areas} />;
}
