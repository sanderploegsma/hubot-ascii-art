const fs = require("fs");
const path = require("path");

module.exports = function (robot, scripts) {
  const scriptsPath = path.resolve(__dirname, "src");
  if (fs.existsSync(scriptsPath)) {
    return fs
      .readdirSync(scriptsPath)
      .filter(
        (script) =>
          scripts == null || scripts.includes("*") || scripts.includes(script)
      )
      .map((script) => robot.loadFile(scriptsPath, script));
  }
};
