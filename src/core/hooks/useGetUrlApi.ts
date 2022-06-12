export const useGetUrlApi = () => {
  const currentUrlAPi = window.location.href;
  const currentUrlOrigin = window.location.origin;

  return {
    currentUrlAPi,
    currentUrlOrigin,
  };
};
