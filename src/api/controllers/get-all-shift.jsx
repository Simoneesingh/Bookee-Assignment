import HTTPService from "../httpService";

export const getListOfAllShifts = () => {
  return HTTPService.get("");
};

export const ISingleShift = {
  id: "",
  booked: false,
  area: "",
  startTime: 0,
  endTime: 0,
};

export const TGetListOfAllShiftsAPIResponse = {
  statusCode: 200,
  message: "",
  data: [ISingleShift],
};
