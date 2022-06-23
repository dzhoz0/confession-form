const crypto = require("crypto");

const sha256 = (x) =>
  crypto.createHash("sha256").update(x, "utf8").digest("hex");

const express = require("express");
const router = express.Router();

const axios = require("axios");

const api_base = `https://database.deta.sh/v1/${process.env.DETA_PROJECT_ID}/cfs/query`;
const project_key = process.env.DETA_PROJECT_KEY;

const PLAIN_KEY = process.env.ADMIN_PASSWORD;

const VERIFY_KEY = sha256(sha256(PLAIN_KEY));

router.post("/get", async (req, res) => {
  const { key } = req.body;
  if (sha256(key) !== VERIFY_KEY) {
    res.status(401).send({ error: "Invalid key" });
    return;
  } else {
    const options = {
      method: "POST",
      url: api_base,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": project_key,
      },
      data: {},
    };
    const response = await axios(options);
    res.send(response.data.items);
  }
  //res.send(api_base);
});

module.exports = router;
