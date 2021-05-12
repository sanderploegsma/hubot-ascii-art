// Description
//   Convert text to ASCII art
//
// Commands:
//   hubot ascii <text> - Convert the given text to ASCII art
//
// Author:
//   Sander Ploegsma <sanderploegsma@gmail.com>

const figlet = require("figlet");

const knownAdapters = {
  slack: "slack",
  hipchat: "hipchat",
};

function format(ascii, adapter) {
  // To prevent adapters trimming whitespace at the beginning,
  // wrap the ASCII in a code environment.
  switch (adapter) {
    case knownAdapters.slack:
      return `\`\`\`${ascii}\`\`\``;
    case knownAdapters.hipchat:
      return `/code ${ascii}`;
    default:
      return `\n${ascii}`;
  }
}

function transform(text, adapter, cb) {
  figlet.text(text, "Standard", (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, format(data, adapter));
    }
  });
}

module.exports = (robot) => {
  robot.respond(/ascii (.+)/i, (res) => {
    transform(res.match[1], robot.adapterName, (err, data) => {
      if (err) {
        return res.send(`Oops, something went wrong! Error: ${err}`);
      }

      return res.send(data);
    });
  });
};
