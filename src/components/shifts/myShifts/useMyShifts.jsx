import { cancelAShiftById } from "../../../api/controllers/cancel-shift";
import ShiftsContext from "../../../store/context/ShiftsContext";
import {
  checkIfDateIsTodayOrTomorrow,
  convertMillisecondsToMonthNameAndDay,
} from "../../../util/utilityFunctions";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const useMyShifts = (refreshAPIResults) => {
  const { shifts: shiftsData, isApiLoading } = useContext(ShiftsContext);
  const [shiftGroups, setShiftGroups] = useState({});
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const groupShiftsByDate = shiftsData
      .filter((sft) => sft.booked)
      .reduce((dateGroups, shift) => {
        const date = checkIfDateIsTodayOrTomorrow(
          convertMillisecondsToMonthNameAndDay(shift.startTime)
        );
        if (!dateGroups[date]) {
          dateGroups[date] = [];
        }
        dateGroups[date].push(shift);
        return dateGroups;
      }, {});
    setShiftGroups(groupShiftsByDate);
  }, [shiftsData]);

  const cancelAShift = (id) => {
    setLoading(id);
    cancelAShiftById(id)
      .then((response) => {
        setLoading("");
        refreshAPIResults();
        toast.success(response.message);
      })
      .catch((error) => {
        setLoading("");
        toast.error(error.data.message);
      });
  };

  return { loading, shiftGroups, cancelAShift, isApiLoading };
};

export default useMyShifts;
