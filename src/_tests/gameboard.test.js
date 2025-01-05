const Gameboard = require('../gameboard');



test('adds 1 + 2 to equal 3', () => {
    let mockboard = new Gameboard(10, 10);
    mockboard.AddShip(0,0,5,0,1);
    mockboard.AddShip(0,1,3,0,1);
    mockboard.ReceiveAttack(0,0);
    mockboard.ReceiveAttack(1,0);
    mockboard.ReceiveAttack(2,0);
    mockboard.ReceiveAttack(3,0);
    mockboard.ReceiveAttack(4,0);
    mockboard.ReceiveAttack(0,1);
    mockboard.ReceiveAttack(1,1);
    mockboard.ReceiveAttack(2,1);
    mockboard.ReceiveAttack(3,1);
    mockboard.TestPrint();
    expect(mockboard.CheckGameOver()).toBe(true);
});