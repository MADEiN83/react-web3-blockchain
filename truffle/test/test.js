const Player = artifacts.require("../contracts/Player.sol");

contract("Player", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await Player.new();
  });

  it("should have no player when instance is created", async () => {
    const output = await instance.getTotalPlayers();
    assert.equal(output.toNumber(), 0);
  });

  it("should have one player when create a new player", async () => {
    await instance.create("MADEiN83", 100, 10);

    const output = await instance.getTotalPlayers();
    assert.equal(output.toNumber(), 1);
  });

  it("should return player stats when create a new player", async () => {
    await instance.create("MADEiN83", 100, 10);

    const { name, maxLife, life, strength, experience, level } =
      await instance.getPlayerById(0);

    assert.equal(name, "MADEiN83");
    assert.equal(maxLife, 100);
    assert.equal(life, 100);
    assert.equal(strength, 10);
    assert.equal(experience, 0);
    assert.equal(level, 1);
  });

  it("should return list of players when create new players", async () => {
    await instance.create("MADEiN83", 100, 10);
    await instance.create("Aly", 100, 10);

    const [player1, player2] = await instance.getPlayers();

    assert.equal(player1.name, "MADEiN83");
    assert.equal(player1.maxLife, 100);
    assert.equal(player1.life, 100);
    assert.equal(player1.strength, 10);
    assert.equal(player1.experience, 0);
    assert.equal(player1.level, 1);

    assert.equal(player2.name, "Aly");
    assert.equal(player2.maxLife, 100);
    assert.equal(player2.life, 100);
    assert.equal(player2.strength, 10);
    assert.equal(player2.experience, 0);
    assert.equal(player2.level, 1);
  });

  it("should decrease life when player hits himself", async () => {
    const life = 100;
    const strength = 10;
    await instance.create("MADEiN83", life, strength);
    await instance.hit(0, 0);

    const player = await instance.getPlayerById(0);

    assert.equal(player.maxLife, life);
    assert.equal(player.life, life - strength);
    assert.equal(player.strength, strength);
    assert.equal(player.experience, 22);
    assert.equal(player.level, 1);
  });

  it("should decrease life when player hits another player", async () => {
    const life = 100;
    const strength = 10;
    await instance.create("MADEiN83", life, strength);
    await instance.create("Aly", life, strength);

    await instance.hit(0, 1);
    await instance.hit(1, 0);
    await instance.hit(1, 0);

    const [player1, player2] = await instance.getPlayers();

    assert.equal(player1.maxLife, life);
    assert.equal(player1.life, life - strength * 2);
    assert.equal(player1.experience, 22);

    assert.equal(player2.maxLife, life);
    assert.equal(player2.life, life - strength);
    assert.equal(player2.experience, 22 * 2);
  });

  it("should kill player when life is <= 0", async () => {
    const life = 100;
    const strength = 10;
    await instance.create("MADEiN83", life, strength);
    await instance.create("Aly", life, strength * 10);

    await instance.hit(1, 0);

    const output = await instance.getTotalPlayers();
    assert.equal(output.toNumber(), 1);

    const [player] = await instance.getPlayers();

    assert.equal(player.name, "Aly");
    assert.equal(player.maxLife, life);
    assert.equal(player.life, life);
    assert.equal(player.strength, strength * 10);
    assert.equal(player.experience, 51);
    assert.equal(player.level, 1);
  });

  it("should level up when multiple kills", async () => {
    const life = 100;
    const strength = 10;
    await instance.create("Aly", life, strength * 10);
    await instance.create("MADEiN83", life, strength);
    await instance.create("Dunno", life, strength);

    await instance.hit(0, 1);
    await instance.hit(0, 1);

    const [player] = await instance.getPlayers();

    assert.equal(player.name, "Aly");
    assert.equal(player.maxLife, life + 2);
    assert.equal(player.life, life + 2);
    assert.equal(player.strength, strength * 10 + 2);
    assert.equal(player.experience, 2);
    assert.equal(player.level, 2);
  });

  it("should be healed when level up and received some damages", async () => {
    const life = 100;
    const strength = 10;

    await instance.create("Aly", life, strength * 10);
    await instance.create("MADEiN83", life, strength);
    await instance.create("Dunno", life, strength);

    // hit Aly
    await instance.hit(1, 0);

    let player = await instance.getPlayerById(0);
    assert.equal(player.maxLife, life);
    assert.equal(player.life, life - strength);
    assert.equal(player.experience, 0);
    assert.equal(player.level, 1);

    await instance.hit(0, 1);
    await instance.hit(0, 1);

    player = await instance.getPlayerById(0);

    assert.equal(player.name, "Aly");
    assert.equal(player.maxLife, life + 2);
    assert.equal(player.life, life + 2);
    assert.equal(player.strength, strength * 10 + 2);
    assert.equal(player.experience, 2);
    assert.equal(player.level, 2);
  });

  /**
   * EVENTS.
   */
  it("[event] should trigger the `PlayerCreated` event and return player stats", async () => {
    const { logs } = await instance.create("MADEiN83", 100, 10);
    const {
      event,
      args: { player },
    } = logs[0];

    assert.equal(event, "PlayerCreated");
    assert.notEqual(player, null);

    assert.equal(player.name, "MADEiN83");
    assert.equal(player.maxLife, 100);
    assert.equal(player.life, 100);
    assert.equal(player.strength, 10);
    assert.equal(player.experience, 0);
    assert.equal(player.level, 1);
  });

  it("[event] should trigger the `PlayerIsDead` event and return remaining players length", async () => {
    await instance.create("MADEiN83", 100, 10);
    await instance.create("Aly", 100, 100);

    const { logs } = await instance.hit(1, 0);

    const {
      event,
      args: { counter },
    } = logs[0];

    assert.equal(event, "PlayerIsDead");
    assert.equal(counter.toNumber(), 1);
  });
});
