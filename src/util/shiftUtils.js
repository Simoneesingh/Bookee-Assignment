import { DateTime } from "luxon";

export const groupShiftsByDate = (shiftsData) => {
  if (!shiftsData) {
    return [];
  }

  const groupedShifts = shiftsData.reduce((acc, shift) => {
    const date = formatDate(shift.startTime);
    const existingGroup = acc.find((group) => group.date === date);

    if (existingGroup) {
      existingGroup.shifts.push({
        id: shift.id,
        startTime: shift.startTime,
        endTime: shift.endTime,
        area: shift.area,
      });
    } else {
      acc.push({
        date,
        shifts: [
          {
            id: shift.id,
            startTime: shift.startTime,
            endTime: shift.endTime,
            area: shift.area,
          },
        ],
      });
    }

    return acc;
  }, []);

  groupedShifts.forEach((group) => {
    group.shifts.sort((a, b) => a.startTime - b.startTime);
  });

  groupedShifts.sort((a, b) => {
    const dateA = DateTime.fromFormat(a.date, "cccc, dd LLLL yyyy").toJSDate();
    const dateB = DateTime.fromFormat(b.date, "cccc, dd LLLL yyyy").toJSDate();
    return dateA - dateB;
});


  return groupedShifts;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  ) {
    return "Tomorrow";
  }

  return DateTime.fromJSDate(date).toFormat("dd LLLL, yyyy");
};

export const formatShiftTime = (startTime, endTime) => {
  const start = DateTime.fromMillis(startTime).toFormat("HH:mm");
  const end = DateTime.fromMillis(endTime).toFormat("HH:mm");
  return `${start} - ${end}`;
};

export const calculateTotalDuration = (shifts) => {
  if (!shifts || shifts.length === 0) {
    return 0;
  }

  return shifts.reduce((total, shift) => total + (shift.endTime - shift.startTime), 0);
};



export const isShiftSelected = (selectedShifts, shift) => {
  return selectedShifts.some((selectedShift) => selectedShift.id === shift.id);
};
