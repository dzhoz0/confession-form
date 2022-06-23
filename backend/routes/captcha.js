const express = require("express");
const router = express.Router();

const svgCaptcha = require("svg-captcha");
const axios = require("axios");

const api_base = `https://database.deta.sh/v1/${process.env.DETA_PROJECT_ID}/`;
const project_key = process.env.DETA_PROJECT_KEY;

router.get("/captcha", async function (req, res, next) {
  let captcha = svgCaptcha.create();

  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": project_key,
    },

    data: {
      item: {
        captcha: captcha.text,
      },
    },
  };

  let response = await axios(api_base + "/items", config);
  console.log(response.data);

  let id = response.data.key;
  res.send({
    id: id,
    captcha: captcha.data,
  });
});
module.exports = router;
