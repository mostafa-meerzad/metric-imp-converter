function ConvertHandler() {

  this.getNum = function (input) {
    let numStr = input.match(/^[\d/.]+/); // Extract only the number part

    if (!numStr) return 1; // Default to 1 if no number is provided
    numStr = numStr[0];

    // Check if it's a fraction (single "/")
    if (numStr.includes("/")) {
      let fractionParts = numStr.split("/");
      if (fractionParts.length !== 2) return "invalid number"; // Reject multiple "/"

      let numerator = fractionParts[0];
      let denominator = fractionParts[1];

      if (isNaN(numerator) || isNaN(denominator)) return "invalid number";

      return parseFloat(numerator) / parseFloat(denominator); // Perform division
    }

    // If not a fraction, check if it's a valid number
    if (isNaN(numStr)) return "invalid number";

    return parseFloat(numStr); // Convert to a float number
  };

  this.getUnit = function (input) {
    const validUnits = ["gal", "l", "lbs", "kg", "mi", "km"];
    let result = input.match(/[a-zA-Z]+$/);
    console.log("match get unit: ", result); // Matches letters at the end
    if (!result || !validUnits.includes(result[0].toLowerCase()))
      return "invalid unit";
    return result[0].toLowerCase() === "l" ? "L" : result[0].toLowerCase(); // Handle case sensitivity
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: "L",
      l: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };
    return unitMap[initUnit.toLowerCase()] || "invalid unit";
  };

  this.spellOutUnit = function (unit) {
    const unitNames = {
      gal: "gallons",
      l: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    };
    return unitNames[unit.toLowerCase()] || "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    const conversionFactors = {
      gal: 3.78541,
      l: 1 / 3.78541,
      lbs: 0.453592,
      kg: 1 / 0.453592,
      mi: 1.60934,
      km: 1 / 1.60934,
    };
    let factor = conversionFactors[initUnit.toLowerCase()];
    if (!factor) return "invalid unit";
    return parseFloat((initNum * factor).toFixed(5)); // Return result rounded to 5 decimals
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let fullInitUnit = this.spellOutUnit(initUnit);
    let fullReturnUnit = this.spellOutUnit(returnUnit);
    return `${initNum} ${fullInitUnit} converts to ${returnNum} ${fullReturnUnit}`;
  };
}

module.exports = ConvertHandler;
