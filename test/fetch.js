const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export const fetch = (buildings) => {
    window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve(mockResponse(200, null, buildings)));
};