// Description
//   Convert text to ASCII art
//
// Commands:
//   hubot ascii <text> - Convert the given text to ASCII art
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Sander Ploegsma <sanderploegsma@gmail.com>

const figlet = require('figlet');

module.exports = robot => robot.respond(/ascii (.+)/i, res => {
  if (res.match[1]) {
    return figlet.text(res.match[1], 'Standard', (err, data) => {
      if (!err) {
        // To prevent adapters trimming whitespace at the beginning,
        // wrap the ASCII in a code environment.
        switch (robot.adapterName) {
          case 'slack': return res.send(`\`\`\`${data}\`\`\``);
          case 'hipchat': return res.send(`/code ${data}`);
          default: return res.send(`\n${data}`);
        }
      } else {
        return res.send(`Oops, something went wrong! Error: ${err}`);
      }
    });
  } else {
    return res.send("Oh no! You must supply text to convert!");
  }
});
