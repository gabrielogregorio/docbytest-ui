export const getUrlApi = (): { currentUrlOrigin: string } => {
  const currentUrlOrigin: string = window.location.origin;

  // const currentUrlOrigin: string = 'http://127.0.0.1:3333'; // window.location.origin;

  return {
    currentUrlOrigin,
  };
};
