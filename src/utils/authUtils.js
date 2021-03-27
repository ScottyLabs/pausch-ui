import jwt from "jsonwebtoken";

const readQuery = (query) => {
  if (query) {
    const queryArray = query.slice(query.indexOf("?") + 1).split("&");
    let result = {};
    for (let item of queryArray) {
      let tmp = item.split("=");
      result[tmp[0]] = tmp[1];
    }
    return result;
  }
};

export const checkAccessToken = (location) => {
  const getNewToken = (search) => {
    const query = readQuery(search);
    try {
      jwt.verify(query.accessToken, process.env.REACT_APP_JWT_SECRET);
      window.localStorage.setItem("accessToken", query.accessToken);
      return true;
    } catch (err) {
      return false;
    }
  };

  const accessToken = window.localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET);
      return true;
    } catch (err) {
      console.log(err);
      return getNewToken(location?.search);
    }
  } else if (!accessToken) {
    return getNewToken(location?.search);
  }
};

export const whoAmI = (location) => {
  const accessToken = window.localStorage.getItem("accessToken");
  const accessTokenValid = checkAccessToken(location);

  if (accessToken && accessTokenValid) {
    const decoded = jwt.decode(accessToken);
    return { email: decoded.email, name: decoded.name };
  } else {
    return null;
  }
};
