  const express = require("express");
  const app = express();
  const jwt = require("jsonwebtoken");
  const { default: axios } = require("axios");
  
  const password = "jsonwebtoken4finn";
  
  app.use(express.static("public"));
  app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    next();
  });

  const getExpireDate = (currenttime) => {
    return currenttime + 10 * 60 * 1000;
  };
  
  app.get("/login/:name/:passwd", (req, res) => {
    let isvalid = false;
    const ip = (req.headers["x-real-ip"] || "NO-IP").split(",")[0];
    timestamp = Date.now();
    var today = new Date();
    var date = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const name = req.params.name.replace(":", "");
    const passwd = req.params.passwd.replace(":", "");
    if (name !== "secret" || passwd !== password) {
      
        isvalid = false;
      res.json({
        valid: false,
        token: undefined,
      });

    } else {
      isvalid = true;
      const token = jwt.sign(
        { name: name, passwd: passwd, eat: getExpireDate(timestamp) },
        "lkjdsalkjfdsalkjfdsalkjdsa"
      );
      res.json({
        valid: true,
        token: token,
        eat: getExpireDate(timestamp),
      });
    }
  
  });
  
  app.get("/validate:token", (req, res) => {
    timestamp = Date.now();
    var today = new Date();
    var date =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const valid = jwt.verify(
      req.params.token.replace(":", ""),
      "lkjdsalkjfdsalkjfdsalkjdsa",
      (err, data) => {
        if (err) {
          return "false";
        } else {
          if (data.eat && data.eat > timestamp) {
            return "true";
          } else {
            return "false";
          }
        }
      }
    );
}
  
app.listen(5004, console.log("JWT RUNNING"));
  