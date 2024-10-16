const base64Url = (str) => {
    return btoa(str).replace(/\+/, "-").replace(/\//, "-").replace(/\=/, "");
};

export { base64Url };
