const chai = require("chai");
chai.use(require("chai-string"));
const expect = chai.expect;

const Helper = require("hubot-test-helper");
const helper = new Helper("../src/ascii.js");

async function waitForResponse() {
  return new Promise((resolve) => {
    setTimeout(resolve, 10);
  });
}

/*
  _            _
 | |_ ___  ___| |_
 | __/ _ \/ __| __|
 | ||  __/\__ \ |_
  \__\___||___/\__|
*/
const testAscii =
  "  _            _   \n | |_ ___  ___| |_ \n | __/ _ \\/ __| __|\n | ||  __/\\__ \\ |_ \n  \\__\\___||___/\\__|\n                   ";

describe("ascii", () => {
  it("transforms the given text to ascii art", async () => {
    var room = helper.createRoom({ httpd: false });
    await room.user.say("alice", "@hubot ascii test");
    await waitForResponse();
    expect(room.messages).to.have.lengthOf(2);
    expect(room.messages[1][1]).to.contain(testAscii);
  });

  it("does nothing when no text is given", async () => {
    var room = helper.createRoom({ httpd: false });
    await room.user.say("alice", "@hubot ascii");
    await waitForResponse();
    expect(room.messages).to.have.lengthOf(1);
  });

  // Disabled: hubot-test-helper does not pass an adapter argument to hubot, so the adapter name is null
  xit("wraps the ascii art in a code block when using the hipchat adapter", async () => {
    var room = helper.createRoom({ name: "hipchat" });
    await room.user.say("alice", "@hubot ascii test");
    await waitForResponse();
    expect(room.messages).to.have.lengthOf(2);
    expect(room.messages[1][1]).to.contain(testAscii).and.startWith("/code ");
  });

  // Disabled: hubot-test-helper does not pass an adapter argument to hubot, so the adapter name is null
  xit("wraps the ascii art in a code block when using the slack adapter", async () => {
    var room = helper.createRoom({ name: "slack" });
    await room.user.say("alice", "@hubot ascii test");
    await waitForResponse();
    expect(room.messages).to.have.lengthOf(2);
    expect(room.messages[1][1])
      .to.contain(testAscii)
      .and.startWith("```")
      .and.endWith("```");
  });
});
