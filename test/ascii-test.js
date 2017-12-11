const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const { expect } = chai;

describe('ascii', function() {
  beforeEach(function() {
    this.robot = {
      respond: sinon.spy(),
      hear: sinon.spy()
    };

    return require('../src/ascii')(this.robot);
  });

  it('registers a respond listener', function() {
    return expect(this.robot.respond).to.have.been.calledWith(/ascii (.+)/i);
  });

  return it('does not register other hear or respond listeners', function() {
    expect(this.robot.hear).to.not.have.been.calledWith(/orly/);
    return expect(this.robot.respond).to.not.have.been.calledWith(/image/);
  });
});
