import Player from '../player';

test('Player Board is setup with empty spaces', () => {
    let player = new Player('test', 10);
    expect(player.board.board[0][0]).toBe('x');
  });

test('Player Board shows hits', () => {
  let player = new Player('test', 10);
  player.Attacked(0,0);
  expect(player.board.board[0][0]).toBe('o');
});

test('Player Board can set ships', () => {
  let player = new Player('test', 10);
  player.PlaceShip(0,0,5,1,0);
  expect(player.board.board[0][0]).toBe('S1');
});

test('Player Board ships can be hit', () => {
  let player = new Player('test', 10);
  player.PlaceShip(0,0,5,1,0);
  player.Attacked(0,0);
  expect(player.board.board[0][0]).toBe('s');
  expect(player.board.board[1][0]).toBe('S1');
  expect(player.board.board[2][0]).toBe('S1');
  expect(player.board.board[3][0]).toBe('S1');
  expect(player.board.board[4][0]).toBe('S1');
  expect(player.board.ships[0].IsSunk()).toBe(false);
  expect(player.board.ships[0].destroyedSpaces).toBe(1);
});

test('Player Board ships can be hit', () => {
  let player = new Player('test', 10);
  player.PlaceShip(0,0,5,1,0);
  player.Attacked(0,0);
  player.Attacked(1,0);
  player.Attacked(2,0);
  player.Attacked(3,0);
  player.Attacked(4,0);
  expect(player.board.board[0][0]).toBe('s');
  expect(player.board.board[1][0]).toBe('s');
  expect(player.board.board[2][0]).toBe('s');
  expect(player.board.board[3][0]).toBe('s');
  expect(player.board.board[4][0]).toBe('s');
  expect(player.board.ships[0].IsSunk()).toBe(true);
  expect(player.board.ships[0].destroyedSpaces).toBe(5);
});

test('Player loses when all ships are sunk', () => {
  let player = new Player('test', 10);
  player.PlaceShip(0,0,5,1,0);
  player.Attacked(0,0);
  player.Attacked(1,0);
  player.Attacked(2,0);
  player.Attacked(3,0);
  player.Attacked(4,0);
  expect(player.board.board[0][0]).toBe('s');
  expect(player.board.board[1][0]).toBe('s');
  expect(player.board.board[2][0]).toBe('s');
  expect(player.board.board[3][0]).toBe('s');
  expect(player.board.board[4][0]).toBe('s');
  expect(player.board.ships[0].IsSunk()).toBe(true);
  expect(player.board.ships[0].destroyedSpaces).toBe(5);
  expect(player.CheckLoss()).toBe(true);
});

test('Ships are generated Randomly', () => {
  let player = new Player('test', 10);
  let sizes = [5,4,3,2,1]
  player.RandomShipPlacement(sizes);
  player.board.TestPrint();
  expect(player.board.ships.length).toBe(5);
});