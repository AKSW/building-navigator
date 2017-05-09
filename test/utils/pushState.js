// mock history push state method
export const pushState = (obj, title, path) => {
    history.pushState = (obj, title, path) =>
        true;
};
