import { bookAShiftById } from "../../../api/controllers/book-shift";
import { cancelAShiftById } from "../../../api/controllers/cancel-shift";
import ShiftsContext from "../../../store/context/ShiftsContext";
import {
  checkIfDateIsTodayOrTomorrow,
  convertMillisecondsToMonthNameAndDay,
} from "../../../util/utilityFunctions";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const useAvailableShifts = (refreshAPIResults) => {
  const { shifts: shiftsData, isApiLoading } = useContext(ShiftsContext);
  const [shiftGroupsByDate, setShiftGroupsByDate] = useState({});
  const [shiftGroupsByCity, setShiftGroupsByCity] = useState({});
  const [currentShifts, setCurrentShifts] = useState({});
  const [currentArea, setCurrentArea] = useState("");
  const [bookedShifts, setBookedShifts] = useState([]);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const groupShiftsByDate = shiftsData.reduce((dateGroups, shift) => {
      const date = checkIfDateIsTodayOrTomorrow(
        convertMillisecondsToMonthNameAndDay(shift.startTime)
      );
      if (!dateGroups[date]) {
        dateGroups[date] = [];
      }
      dateGroups[date].push(shift);
      return dateGroups;
    }, {});
    setShiftGroupsByDate(groupShiftsByDate);

    const groupShiftsByCity = shiftsData.reduce((cityGroups, shift) => {
      const city = shift.area;
      if (!cityGroups[city]) {
        cityGroups[city] = [];
      }
      cityGroups[city].push(shift);
      return cityGroups;
    }, {});
    setShiftGroupsByCity(groupShiftsByCity);
  }, [shiftsData]);

  useEffect(() => {
    if (Object.keys(shiftGroupsByCity).length > 0) {
      currentArea === ""
        ? setCurrentArea(Object.keys(shiftGroupsByCity)?.[0])
        : filterShiftsByCity(currentArea);
    }
  }, [shiftGroupsByCity]);

  const bookAShift = (id) => {
    setLoading(id);
    bookAShiftById(id)
      .then((response) => {
        refreshAPIResults();
        setLoading("");
        toast.success(response.message);
      })
      .catch((error) => {
        setLoading("");
        toast.error(error.data.message);
      });
  };

  const cancelAShift = (id) => {
    setLoading(id);
    cancelAShiftById(id)
      .then((response) => {
        refreshAPIResults();
        setLoading("");
        toast.success(response.message);
      })
      .catch((error) => {
        setLoading("");
        toast.error(error.data.message);
      });
  };

  useEffect(() => {
    if (shiftsData.length > 0) {
      const bookedShifts = shiftsData.filter((s) => s.booked);
      setBookedShifts(bookedShifts);
    }
  }, [shiftsData]);

  const checkIfAnShiftIsOverLapping = (shift) => {
    return !!bookedShifts.find(
      (s) => s.startTime < shift.endTime && s.endTime > shift.startTime
    );
  };

  const filterShiftsByCity = (cityName) => {
    const shifts = { ...shiftGroupsByDate };
    Object.keys(shifts).forEach((shift) => {
      shifts[shift] = shifts[shift].filter((s) => s.area === cityName);
    });
    setCurrentShifts(shifts);
  };

  useEffect(() => {
    if (currentArea) {
      filterShiftsByCity(currentArea);
    }
  }, [currentArea]);

  return {
    bookAShift,
    cancelAShift,
    filterShiftsByCity,
    checkIfAnShiftIsOverLapping,
    loading,
    currentShifts,
    currentArea,
    shiftGroupsByCity,
    shiftGroupsByDate,
    setCurrentArea,
    isApiLoading,
  };
};

export default useAvailableShifts;
