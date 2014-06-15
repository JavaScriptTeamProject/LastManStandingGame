var spawnEnemy = function () {
    var spawnPositions = [
        [Position.x = 0, Position.y = 0],
        [Position.x = 0, Position.y = 640],
        [Position.x = 640, Position.y = 640],
        [Position.x = 640, Position.y = 0]
    ];

    var positionIndex = Math.floor((Math.random() * 4));

    var healthPoint = 80,
        movementSpeed = 40,
        attackDamage = 1,
        attackSpeed = 1;

    var enemy = initializeEnemy(spawnPositions[positionIndex][0], spawnPositions[positionIndex][1],
        healthPoint, movementSpeed, attackDamage, attackSpeed);

    return enemy;
}