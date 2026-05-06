const fs = require("fs");
const path = require("path");

function logMessage(message) {
  const today = new Date().toISOString().slice(0, 10);
  const logDir = path.join(__dirname, "log");
  const filePath = path.join(logDir, `${today}.log`);
  fs.appendFileSync(filePath, message + "\n", "utf8");
}

logMessage("첫 로그");
logMessage("두번째 로그");
