interface MediaQueryParams {
  min: number
  max: number
}

const mediaQuery = (params: MediaQueryParams): boolean => {
  const { min, max } = params;
  const currentWindowWidth = document.body.offsetWidth;
  let result = false;

  if (min <= currentWindowWidth && max >= currentWindowWidth) result = true;

  return result;
};

export default mediaQuery;
