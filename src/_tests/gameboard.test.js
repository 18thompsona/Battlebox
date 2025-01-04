const Gameboard = require('../gameboard');

let mockboard = new Gameboard(10, 10);
mockboard.AddShip(5,0,5,0,1);
// mockboard.AddShip(0,0,3,1,0);
mockboard.ReceiveAttack(1,0);
mockboard.TestPrint();

test('adds 1 + 2 to equal 3', () => {
  expect(1).toBe(1);
});