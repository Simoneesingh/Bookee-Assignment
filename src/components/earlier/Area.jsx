import { useEffect, useState } from "react";
import { mockShifts } from "../../../api/shifts-mock-api/mockShifts";

export default function Area() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const uniqueAreas = [...new Set(mockShifts.map((shift) => shift.area))];
    setAreas(uniqueAreas);
  }, []);

  return (
    <>
      <h1>Areas:</h1>
      <ul>
        {areas.map((area) => (
          <li key={area}>{area}</li>
        ))}
      </ul>
    </>
  );
}
