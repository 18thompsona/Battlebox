const Ship = require('../ship');

test('Create Ship and check status', () => {
    let ship = new Ship(3);
    expect(ship.IsSunk()).toBe(false);
});

test('After ship is hit, shows damage', () => {
    let ship = new Ship(3);
    ship.Hit();
    expect(ship.destroyedSpaces).toBe(1);
});

test('After ship is destroyed, shows as Destroyed', () => {
    let ship = new Ship(3);
    ship.Hit();
    ship.Hit();
    ship.Hit();
    expect(ship.IsSunk()).toBe(true);
});