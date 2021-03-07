const validateURL = (inStr) => {
  console.log("Validating./..", inStr);

  if (inStr == "" || inStr == null || inStr == undefined) {
    return false;
  }
  return true;
};

module.exports = validateURL;
