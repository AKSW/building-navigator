// response header for fetch
const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

// create windows.fetch method, overwrites whatwg-fetch method on load json
export const fetch = (data) => {
    window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve(mockResponse(200, null, data)));
};