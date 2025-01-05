const Gameboard = require('../gameboard');


test('board is setup with xs', () => {
  let mockboard = new Gameboard(10, 10);
  expect(mockboard.board[0][0]).toBe('x');
});

test('Board Shows Hits', () => {
  let mockboard = new Gameboard(10, 10);
  mockboard.ReceiveAttack(0,0);
  expect(mockboard.board[0][0]).toBe('o');
});

test('Ships show on gameboard', () => {
  let mockboard = new Gameboard(10, 10);
  mockboard.AddShip(0,0,5,1,0)
  expect(mockboard.board[0][0]).toBe('S1');
  expect(mockboard.board[0][1]).toBe('S1');
  expect(mockboard.board[0][2]).toBe('S1');
  expect(mockboard.board[0][3]).toBe('S1');
  expect(mockboard.board[0][4]).toBe('S1');
});

test('Ship is able to be hit', () => {
  let mockboard = new Gameboard(10, 10);
  mockboard.AddShip(0,0,5,1,0)
  mockboard.ReceiveAttack(0,0);
  expect(mockboard.board[0][0]).toBe('o');
  expect(mockboard.ships[0].destroyedSpaces).toBe(1);
});

test('Ships Destroyed equals game over', () => {
    let mockboard = new Gameboard(10, 10);
    mockboard.AddShip(0,0,5,1,0);
    mockboard.AddShip(0,1,3,1,0);
    mockboard.ReceiveAttack(0,0);
    mockboard.ReceiveAttack(1,0);
    mockboard.ReceiveAttack(2,0);
    mockboard.ReceiveAttack(3,0);
    mockboard.ReceiveAttack(4,0);
    mockboard.ReceiveAttack(0,1);
    mockboard.ReceiveAttack(1,1);
    mockboard.ReceiveAttack(2,1);
    mockboard.TestPrint();
    expect(mockboard.CheckGameOver()).toBe(true);
});