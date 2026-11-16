import Attitude from '../Attitude';
import AttitudeChanged from '../Rules/Attitude/Changed';
import AttitudeRecord from '../Records/AttitudeRecord';
import Effect from '@civ-clone/core-rule/Effect';
import InteractionRegistry from '../InteractionRegistry';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Turn from '@civ-clone/core-turn-based-game/Turn';
import { expect } from 'chai';

describe('Attitude', (): void => {
  const setUp = (options = {}) => {
    const ruleRegistry = new RuleRegistry(),
      turn = new Turn(),
      [a, b, c] = [1, 2, 3].map(() => new Player(ruleRegistry)),
      interactionRegistry = new InteractionRegistry(),
      attitude = new Attitude(interactionRegistry, ruleRegistry, turn, options);

    return { a, b, c, attitude, interactionRegistry, ruleRegistry, turn };
  };

  it('has no attitude, and keeps nothing, until one is set', (): void => {
    const { a, b, attitude, interactionRegistry } = setUp();

    expect(attitude.get(a, b)).to.equal(undefined);
    expect(attitude.get(b, a)).to.equal(undefined);
    expect(interactionRegistry.entries()).to.deep.equal([]);
  });

  it('keeps each direction of a pair apart', (): void => {
    const { a, b, c, attitude, interactionRegistry } = setUp();

    attitude.set(a, b, 30);
    attitude.set(b, a, 70);

    expect(attitude.get(a, b)).to.equal(30);
    expect(attitude.get(b, a)).to.equal(70);
    expect(attitude.get(a, c)).to.equal(undefined);
    expect(interactionRegistry.entries().length).to.equal(2);

    attitude.set(a, b, 40);

    expect(attitude.get(a, b)).to.equal(40);
    expect(attitude.get(b, a)).to.equal(70);
    expect(interactionRegistry.entries().length).to.equal(2);
  });

  it('adjusts from `initial`, or 0, when there is no attitude yet', (): void => {
    const { a, b, attitude } = setUp(),
      { a: c, b: d, attitude: started } = setUp({ initial: 50 });

    expect(attitude.adjust(a, b, -5)).to.equal(-5);
    expect(attitude.adjust(a, b, 10)).to.equal(5);
    expect(started.adjust(c, d, 10)).to.equal(60);
  });

  it('keeps any number with no range, and clamps to the range given', (): void => {
    const { a, b, attitude } = setUp(),
      { a: c, b: d, attitude: ranged } = setUp({ minimum: 0, maximum: 100 });

    expect(attitude.set(a, b, 1000)).to.equal(1000);
    expect(attitude.adjust(a, b, -2000)).to.equal(-1000);
    expect(ranged.set(c, d, 1000)).to.equal(100);
    expect(ranged.get(c, d)).to.equal(100);
    expect(ranged.adjust(c, d, -250)).to.equal(0);
  });

  it('announces each change, with what it was, what it is and why', (): void => {
    const { a, b, attitude, ruleRegistry } = setUp({ maximum: 100 }),
      heard: [
        Player,
        Player,
        number | undefined,
        number,
        string | undefined
      ][] = [];

    ruleRegistry.register(
      new AttitudeChanged(
        new Effect((holder, toward, from, to, reason) => {
          heard.push([holder, toward, from, to, reason]);
        })
      )
    );

    attitude.set(a, b, 30, 'met');
    attitude.adjust(a, b, -25, 'alliance');
    // No change, so nothing to say.
    attitude.set(a, b, 5);
    attitude.set(a, b, 150);
    attitude.adjust(a, b, 10, 'over');

    expect(heard).to.deep.equal([
      [a, b, undefined, 30, 'met'],
      [a, b, 30, 5, 'alliance'],
      [a, b, 5, 100, undefined],
    ]);
  });

  it('keeps its values as `AttitudeRecord`s between the two players, saying which way each goes', (): void => {
    const { a, b, attitude, interactionRegistry, turn } = setUp();

    turn.increment();
    turn.increment();

    attitude.set(b, a, 12);

    const [record] = interactionRegistry.getByPlayers(a, b) as AttitudeRecord[];

    expect(record).to.be.instanceOf(AttitudeRecord);
    expect(record.holder()).to.equal(b);
    expect(record.toward()).to.equal(a);
    expect(record.value()).to.equal(12);
    expect(record.when()).to.equal(turn.value());
    expect(record.stateKeys()).to.include.members([
      '_holder',
      '_toward',
      '_value',
    ]);
    expect(record.stateKeys()).not.to.include.members([
      '_ruleRegistry',
      '_turn',
    ]);
  });

  it('reads values another `Attitude` over the same registry set', (): void => {
    const { a, b, attitude, interactionRegistry, ruleRegistry, turn } = setUp();

    attitude.set(a, b, 8);

    expect(
      new Attitude(interactionRegistry, ruleRegistry, turn).get(a, b)
    ).to.equal(8);
  });
});
