require("dotenv").config();

const crosOrigin = {
  // * frontend Url inside origin
  origin: process.env.FRONTEND_URL,
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true,
};

module.exports = crosOrigin;
