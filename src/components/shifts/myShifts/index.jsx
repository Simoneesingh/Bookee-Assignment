import convertMillisecondsToHourAndMinute from "../../../util/utilityFunctions";
import getTotalDurationOfShifts from "../../../util/utilityFunctions";
import GreenSpinner from "../../../assets/spinner_green.svg";
import RedSpinner from "../../../assets/spinner_red.svg";
import useMyShifts from "./useMyShifts";

const redSpinnerImage = (
  <img src={RedSpinner} alt="red spinner" className="loader" />
);
const greenSpinnerImage = (
  <img src={GreenSpinner} alt="green spinner" className="loader" />
);

const MyShifts = ({ refreshAPIResults }) => {
  const { cancelAShift, loading, shiftGroups, isApiLoading } =
    useMyShifts(refreshAPIResults);

  return (
    <div>
      {Object.keys(shiftGroups).map((shift) => {
        let shiftCount = shiftGroups[shift].length;
        return (
          <div key={shift}>
            <h3 className=" bg-white border-b-2 p-5">
              {shift}{" "}
              <span className="font-bold">
                {shiftCount} {shiftCount > 1 ? "shifts" : "shift"},{" "}
                {getTotalDurationOfShifts(shiftGroups[shift])}
              </span>
            </h3>
            {shiftGroups[shift].map((shift) => {
              return (
                <div
                  className="flex justify-between gap-5 flex-wrap items-center p-5 border-b-2"
                  key={shift.id}
                >
                  <div className="shift-timing">
                    <p className="time text-blue-500 text-lg">
                      {convertMillisecondsToHourAndMinute(shift.startTime)}-
                      {convertMillisecondsToHourAndMinute(shift.endTime)}
                    </p>
                    <p className="city mt-1 text-blue-100 text-base">
                      {shift.area}
                    </p>
                  </div>
                  <button
                    className={`${
                      Date.now() >= shift.endTime ? "btn-green" : "btn-pink"
                    } ${
                      Date.now() > shift.startTime
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => cancelAShift(shift.id)}
                  >
                    {loading === shift.id
                      ? redSpinnerImage
                      : Date.now() >= shift.endTime
                      ? "Finished"
                      : "Cancel"}
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
      {!isApiLoading && Object.keys(shiftGroups).length === 0 && (
        <p className="no-shifts text-center text-blue-100 mt-10">
          No shifts found!
        </p>
      )}
      {isApiLoading && (
        <p className="no-shifts text-center">{greenSpinnerImage}</p>
      )}
    </div>
  );
};

export default MyShifts;
