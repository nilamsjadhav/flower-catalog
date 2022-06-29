const parseSearchParams = ({ searchParams }) => {
  const queryParams = {};

  for (const [param, value] of searchParams) {
    queryParams[param] = value;
  }
  return queryParams;
};

module.exports = { parseSearchParams };
