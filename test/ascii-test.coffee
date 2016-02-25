chai = require 'chai'
sinon = require 'sinon'
chai.use require 'sinon-chai'

expect = chai.expect

describe 'ascii', ->
  beforeEach ->
    @robot =
      respond: sinon.spy()
      hear: sinon.spy()

    require('../src/ascii')(@robot)

  it 'registers a respond listener', ->
    expect(@robot.respond).to.have.been.calledWith(/ascii (.+)/i)

  it 'does not register other hear or respond listeners', ->
    expect(@robot.hear).to.not.have.been.calledWith(/orly/)
    expect(@robot.respond).to.not.have.been.calledWith(/image/)
