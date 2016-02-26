# Description
#   Convert text to ASCII art
#
# Commands:
#   hubot ascii <text> - Convert the given text to ASCII art
#
# Notes:
#   <optional notes required for the script>
#
# Author:
#   Sander Ploegsma <sanderploegsma@gmail.com>

figlet = require('figlet')

module.exports = (robot) ->
  robot.respond /ascii (.+)/i, (res) ->
    if res.match[1]
      figlet.text res.match[1], 'Standard', (err, data) ->
        if !err
          # To prevent adapters trimming whitespace at the beginning,
          # wrap the ASCII in a code environment.
          switch robot.adapterName
            when 'slack' then res.send "```#{data}```"
            when 'hipchat' then res.send "/code #{data}"
            else res.send "\n#{data}"
        else
          res.send "Oops, something went wrong! Error: #{err}"
    else
      res.send "Oh no! You must supply text to convert!"
