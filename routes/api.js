"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;

    if (!input) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === "Invalid number" && initUnit === "Invalid unit") {
      return res.status(400).json({ error: "Invalid number and unit" });
    }
    if (initNum === "Invalid number") {
      return res.status(400).json({ error: "Invalid number" });
    }
    if (initUnit === "Invalid unit") {
      return res.status(400).json({ error: "Invalid unit" });
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
