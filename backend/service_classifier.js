const DISC_RE = new RegExp("^https://.*amp.com.*/music", "g");
const ALB_RE = new RegExp("^https://.*amp.com.*/album/.*", "g");
const TR_RE = new RegExp("^https://.*amp.com.*/track/.*", "g");

const determine_service_type = (url) => {
  url = url.trim();
  let outType = -1;
  outType = TR_RE.test(url) ? 0 : -1;
  outType == -1 ? (outType = ALB_RE.test(url) ? 1 : -1) : null;
  outType == -1 ? (outType = DISC_RE.test(url) ? 2 : -1) : null;
  return outType;
};

module.exports = determine_service_type;
