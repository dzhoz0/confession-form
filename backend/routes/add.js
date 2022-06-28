const express = require("express");
const router = express.Router();

const axios = require("axios");

const api_base = `https://database.deta.sh/v1/${process.env.DETA_PROJECT_ID}/`;
const project_key = process.env.DETA_PROJECT_KEY;

async function verifyCaptcha(id, ans) {
  try {
    const optionsGet = {
      method: "GET",
      url: api_base + "captcha/items/" + id,
      headers: { "X-API-Key": project_key },
    };
    const optionsDel = {
      method: "DELETE",
      url: api_base + "captcha/items/" + id,
      headers: { "X-API-Key": project_key },
    };

    const resGet = await axios(optionsGet);
    await axios(optionsDel);

    if (resGet.data.captcha === ans) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function addCfs(content, time) {
  try {
    const options = {
      method: "POST",
      url: api_base + "cfs/items",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": project_key,
      },
      data: { item: { content: content, time: time } },
    };

    const res = await axios(options);

    return res.data.key;
  } catch (err) {
    console.log(err);
    return false;
  }
}

router.post("/add", async (req, res) => {
  let { content, time, captcha } = req.body;

  let verified = await verifyCaptcha(captcha.id, captcha.answer);
  if (verified == true) {
    let id = await addCfs(content, time);
    if (!id) {
      res.send({
        success: false,
        error: "Failed to add confession",
      });
      return;
    }
    res.send({
      id: id,
      success: true,
    });
  } else {
    res.send({ success: false, error: "Failed to verify captcha" });
  }
});

module.exports = router;
