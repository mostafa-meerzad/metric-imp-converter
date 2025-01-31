"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const input = req.query.input; // Get the `input` query parameter
    if (!input) {
      return res.status(400).json({ error: "Invalid input" }); // Handle missing input
    }

    // Extract number and unit from input
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    // Validate inputs
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.send("invalid number and unit");
    }
    if (initNum === "invalid number") {
      return res.send("invalid number");
    }
    if (initUnit === "invalid unit") {
      return res.send("invalid unit");
    }

    // Perform the conversion
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    // Return the response
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};
