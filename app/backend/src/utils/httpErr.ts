interface HTTP_ERROR extends Error {
  status?: number;
}

const httpError = (status: number, message: string): HTTP_ERROR => {
  const newError: HTTP_ERROR = new Error(message);
  newError.status = status;
  newError.name = 'HTTP_ERROR';
  return newError;
};

export default httpError;
