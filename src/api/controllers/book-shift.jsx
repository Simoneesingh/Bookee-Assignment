import HTTPService from "../httpService";

export const bookAShiftById = (id) => {
  return HTTPService.post(`/${id}/book`, {});
};

export const ISingleShift = {
  id: "",
  booked: false,
  area: "",
  startTime: 0,
  endTime: 0,
};

export const TBookShiftAPIResponse = {
  statusCode: 200,
  message: "",
  data: ISingleShift,
};
