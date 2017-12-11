const ascii = require('../src/ascii');

const robot = {
  respond: jest.fn(),
  hear: jest.fn()
};

beforeEach(() => {
  jest.resetAllMocks();
  ascii(robot);
});

it('registers a respond listener', () => {
  expect(robot.respond).toHaveBeenCalledWith(/ascii (.+)/i, expect.any(Function));
});

it('does not register other hear or respond listeners', () => {
  expect(robot.hear).not.toHaveBeenCalledWith(/orly/, expect.any(Function));
  expect(robot.respond).not.toHaveBeenCalledWith(/image/, expect.any(Function));
});
