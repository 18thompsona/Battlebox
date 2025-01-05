const Ship = require('../ship');

test('Create Ship and check status', () => {
    let ship = new Ship(3);
    expect(ship.IsSunk()).toBe(false);
});