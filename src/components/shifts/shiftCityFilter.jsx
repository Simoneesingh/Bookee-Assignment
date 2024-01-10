// import { IShiftGroupsType } from './availableShifts/useAvailableShifts';

const ShiftCityFilter = ({
  shiftGroupsByCity,
  setCurrentArea,
  currentArea,
}) => {
  return (
    <div className="city-filter">
      {Object.keys(shiftGroupsByCity).map((area, index) => {
        return (
          <button
            key={area}
            className={`${currentArea === area ? "active" : ""}`}
            onClick={() => {
              setCurrentArea(area);
            }}
          >
            {area} ({shiftGroupsByCity[area].length})
          </button>
        );
      })}
    </div>
  );
};

export default ShiftCityFilter;
