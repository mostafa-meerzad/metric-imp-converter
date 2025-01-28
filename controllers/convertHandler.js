function ConvertHandler() {
  this.getNum = function (input) {
    let result = input.match(/^[\d./]+/);

    if (!result) return 1;
    result = eval(result[0]);

    return isNaN(result) ? "Invalid number" : result;
  };

  this.getUnit = function (input) {
    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    let result = input.match(/[a-zA-Z]+$/);

    if (!result || validUnits.includes(result[0].toLowerCase()))
      return "Invalid unit";

    return result[0] === "l" ? "L" : result[0].toLowerCase();
  };

  this.getReturnUnit = function (initUnit) {
    const unitsMap = {
      gal: "L",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    return unitsMap[initUnit.toLowerCase()] || "Invalid unit";
  };

  this.spellOutUnit = function (unit) {
    const unitNames = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    return unitNames[unit.toLowerCase()] || "Invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    const conversionFactors = {
      gal: 3.78541,
      l: 0.264172,
      mi: 1.60934,
      km: 0.621371,
      lbs: 0.453592,
      kg: 2.20462,
    };
    const factor = conversionFactors[initUnit.toLowerCase()];

    if (!factor) return "Invalid unit";
    return parseFloat((initNum * factor).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let fullInitUnit = this.spellOutUnit(initUnit);
    let fullReturnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${fullInitUnit} converts to ${returnNum} ${fullReturnUnit}`;
  };
}

module.exports = ConvertHandler;
