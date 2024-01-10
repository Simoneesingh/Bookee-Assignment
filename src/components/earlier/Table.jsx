import React from "react";

export default function Table({ shifts, handleBook, handleCancel }) {
  const isOverlapping = (shift1, shift2) => {
    return (
      shift1.startTime < shift2.endTime && shift1.endTime > shift2.startTime
    );
  };

  return (
    <table>
      <tbody>
        {shifts.map((day, index) => (
          <tr key={index}>
            <td>{Array.isArray(day) ? day[0].date : day.date}</td>
            <td>
              {Array.isArray(day) ? (
                day.map((shift, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "10px",
                      background: isOverlapping(shift, day[i + 1])
                        ? "red"
                        : "transparent",
                      // Add more styling or indicators if needed
                    }}
                  >
                    <p>{`${shift.startTime} - ${shift.endTime}`}</p>
                    <p>{shift.area}</p>
                    {handleBook && (
                      <button onClick={() => handleBook(shift.id)}>Book</button>
                    )}
                    {handleCancel && (
                      <button onClick={() => handleCancel(shift.id)}>
                        Cancel
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div
                  key={index}
                  style={{
                    marginBottom: "10px",
                    background: isOverlapping(day.shifts[0], day.shifts[1])
                      ? "red"
                      : "transparent",
                  }}
                >
                  <p>{`${day.shifts[0].startTime} - ${day.shifts[0].endTime}`}</p>
                  <p>{day.shifts[0].area}</p>
                  {handleBook && (
                    <button onClick={() => handleBook(day.shifts[0].id)}>
                      Book
                    </button>
                  )}
                  {handleCancel && (
                    <button onClick={() => handleCancel(day.shifts[0].id)}>
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </td>
            {/* If handleBook is present, you might want to add corresponding logic */}
            {handleBook && <td></td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
