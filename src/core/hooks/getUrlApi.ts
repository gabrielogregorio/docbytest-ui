export const getUrlApi = () => {
  const currentUrlAPi = window.location.href;
  const currentUrlOrigin = window.location.origin;

  // const currentUrlAPi = 'http://127.0.0.1:3333/docs'; // window.location.href;
  // const currentUrlOrigin = 'http://127.0.0.1:3333'; // window.location.origin;

  return {
    currentUrlAPi,
    currentUrlOrigin,
  };
};
