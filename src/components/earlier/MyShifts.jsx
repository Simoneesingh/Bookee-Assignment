import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

export default function MyShifts() {
  const [myShifts, setMyShifts] = useState([]);
  const { response, loading, error } = useAxios("/shifts?booked=true");

  useEffect(() => {
    if (response) {
      setMyShifts(response.data);
    }
  }, [response]);

  const cancelShift = (id) => {
    fetch(`http://127.0.0.1:8080/shifts/${id}/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((canceledShift) =>
        console.log("Shift canceled successfully:", canceledShift)
      )
      .catch((error) => console.error("Error while canceling shift:", error));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>{new Date().toLocaleDateString()}</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
