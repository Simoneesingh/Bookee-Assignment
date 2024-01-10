import HTTPService from "../httpService";

export const cancelAShiftById = (id) => {
  return HTTPService.post(`/${id}/cancel`, {});
};

export const ISingleShift = {
  id: "",
  booked: false,
  area: "",
  startTime: 0,
  endTime: 0,
};

export const TCancelShiftAPIResponse = {
  statusCode: 200,
  message: "",
  data: ISingleShift,
};
