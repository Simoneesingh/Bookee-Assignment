import useAxios from "../../hooks/useAxios";
import { DateTime } from "luxon";
// import Table from "./Table";

export default function FilterByDate({ shifts }) {
  const { response } = useAxios("/shifts");

  const formatDate = (dateString) => {
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

  const formatShiftTime = (startTime, endTime) => {
    const start = DateTime.fromMillis(startTime).toFormat("HH:mm");
    const end = DateTime.fromMillis(endTime).toFormat("HH:mm");
    return `${start} - ${end}`;
  };

  const groupShiftsByDate = (shiftsData) => {
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

    groupedShifts.sort((a, b) => {
      const dateA = DateTime.fromFormat(a.date, "dd LLLL, yyyy").toJSDate();
      const dateB = DateTime.fromFormat(b.date, "dd LLLL, yyyy").toJSDate();
      return dateA - dateB;
    });

    return groupedShifts;
  };

  const groupedShifts = groupShiftsByDate(response || shifts);

  return (
    <div>
      {groupedShifts.map((group, index) => (
        <div key={group.date}>
          <table className="border-2" style={{ width: "500px" }}>
            <thead>
              <tr>
                <th colSpan="2" className="border-b ">
                  <span className="font-bold text-Blue500 ">{group.date}</span>{" "}
                  <span className="text-sm font-normal text-Blue100">{`${group.shifts.length} shifts`}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {group.shifts.map((shift) => (
                <tr key={shift.id} className="border-b">
                  <td className="text-Blue500 flex flex-col">
                    {formatShiftTime(shift.startTime, shift.endTime)}
                    <span className="text-Blue100">{shift.area}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
