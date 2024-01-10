import { convertMillisecondsToHourAndMinute } from "../../../util/utilityFunctions";
import GreenSpinner from "../../../assets/spinner_green.svg";
import RedSpinner from "../../../assets/spinner_red.svg";
import ShiftCityFilter from "../shiftCityFilter";
import useAvailableShifts from "./useAvailableShifts";

const greenSpinnerImage = (
  <img src={GreenSpinner} alt="green spinner" className="loader" />
);
const redSpinnerImage = (
  <img src={RedSpinner} alt="red spinner" className="loader" />
);

const AvailableShifts = ({ refreshAPIResults }) => {
  const {
    bookAShift,
    cancelAShift,
    checkIfAnShiftIsOverLapping,
    loading,
    currentShifts,
    currentArea,
    shiftGroupsByCity,
    shiftGroupsByDate,
    setCurrentArea,
    isApiLoading,
  } = useAvailableShifts(refreshAPIResults);

  return (
    <div className="shifts-container">
      <ShiftCityFilter
        shiftGroupsByCity={shiftGroupsByCity}
        currentArea={currentArea}
        setCurrentArea={setCurrentArea}
      />
      {Object.keys(currentShifts).map((shift) => {
        return (
          <div className="shifts-group-container" key={shift}>
            <h3 className="shift-group">{shift}</h3>
            {currentShifts[shift].map((shift) => {
              return (
                <div className="shift-details" key={shift.id}>
                  <div className="shift-timing">
                    <p className="time">
                      {convertMillisecondsToHourAndMinute(shift.startTime)}-
                      {convertMillisecondsToHourAndMinute(shift.endTime)}
                    </p>
                  </div>
                  <div
                    className={`booking-status
                  ${
                    shift.booked
                      ? "booked"
                      : !shift.booked && checkIfAnShiftIsOverLapping(shift)
                      ? "overlapping"
                      : ""
                  }`}
                  >
                    {shift.booked
                      ? "Booked"
                      : !shift.booked && checkIfAnShiftIsOverLapping(shift)
                      ? "Overlapping"
                      : ""}
                  </div>
                  <button
                    className={`${shift.booked ? "btn-pink" : "btn-green"}`}
                    disabled={
                      checkIfAnShiftIsOverLapping(shift) ||
                      Date.now() > shift.startTime
                    }
                    onClick={() => {
                      !shift.booked
                        ? bookAShift(shift.id)
                        : cancelAShift(shift.id);
                    }}
                  >
                    {!shift.booked
                      ? loading === shift.id
                        ? greenSpinnerImage
                        : "Book"
                      : loading === shift.id
                      ? redSpinnerImage
                      : "Cancel"}
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
      {!isApiLoading && Object.keys(shiftGroupsByDate).length === 0 && (
        <p className="no-shifts">No shifts found!</p>
      )}
      {isApiLoading && <p className="no-shifts">{greenSpinnerImage}</p>}
    </div>
  );
};

export default AvailableShifts;
