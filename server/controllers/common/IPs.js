const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const myIP = async () => {
  try {
    const response = await fetch("https://ipinfo.io/ip", {
      method: "GET",
    });
    const data = await response.text();
    console.log(data);
    return {
      IP: data,
      express_ip: `http://${data}:5000`,
      react_ip: `http://${data}:3000`,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  myIP,
};
