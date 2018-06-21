const request = jest.fn((arg) => {
    return Promise.resolve({ data: {} });
  });

export default request;