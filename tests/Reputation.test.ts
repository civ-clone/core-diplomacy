import Effect from '@civ-clone/core-rule/Effect';
import InteractionRegistry from '../InteractionRegistry';
import Player from '@civ-clone/core-player/Player';
import Reputation from '../Reputation';
import ReputationChanged from '../Rules/Reputation/Changed';
import ReputationCreditRecord from '../Records/ReputationCreditRecord';
import ReputationRecord from '../Records/ReputationRecord';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Turn from '@civ-clone/core-turn-based-game/Turn';
import { expect } from 'chai';

describe('Reputation', (): void => {
  const setUp = (options = {}) => {
    const ruleRegistry = new RuleRegistry(),
      turn = new Turn(),
      [a, b, c] = [1, 2, 3].map(() => new Player(ruleRegistry)),
      interactionRegistry = new InteractionRegistry(),
      reputation = new Reputation(
        interactionRegistry,
        ruleRegistry,
        turn,
        options
      );

    return { a, b, c, reputation, interactionRegistry, ruleRegistry };
  };

  it('is `initial`, or 0, and keeps nothing, until one is set', (): void => {
    const { a, b, reputation, interactionRegistry } = setUp(),
      { a: c, reputation: started } = setUp({ initial: 2 });

    expect(reputation.get(a)).to.equal(0);
    expect(reputation.credit(a, b)).to.equal(0);
    expect(started.get(c)).to.equal(2);

    // Setting what it already is keeps nothing either.
    reputation.set(a, 0);
    reputation.setCredit(a, b, 0);

    expect(interactionRegistry.entries()).to.deep.equal([]);
  });

  it('keeps a value per player', (): void => {
    const { a, b, reputation, interactionRegistry } = setUp();

    reputation.adjust(a, 1);
    reputation.adjust(a, 1);
    reputation.set(b, 5);

    expect(reputation.get(a)).to.equal(2);
    expect(reputation.get(b)).to.equal(5);
    expect(
      interactionRegistry
        .entries()
        .map((record) => (record as ReputationRecord).player())
    ).to.deep.equal([a, b]);
    expect(interactionRegistry.entries()[0]).to.be.instanceOf(ReputationRecord);
  });

  it('clamps to the range given', (): void => {
    const { a, reputation } = setUp({ minimum: 0, maximum: 6 });

    expect(reputation.adjust(a, 10)).to.equal(6);
    expect(reputation.adjust(a, -10)).to.equal(0);
  });

  it('keeps a signed credit per observer, each way apart', (): void => {
    const { a, b, c, reputation, interactionRegistry } = setUp();

    reputation.setCredit(b, a, 2);
    reputation.setCredit(c, a, -1);

    expect(reputation.credit(b, a)).to.equal(2);
    expect(reputation.credit(c, a)).to.equal(-1);
    expect(reputation.credit(a, b)).to.equal(0);

    reputation.setCredit(b, a, 0);

    expect(reputation.credit(b, a)).to.equal(0);

    const [record] = interactionRegistry.getByPlayers(
      a,
      b
    ) as ReputationCreditRecord[];

    expect(record).to.be.instanceOf(ReputationCreditRecord);
    expect(record.observer()).to.equal(b);
    expect(record.player()).to.equal(a);
    // A credit isn't a reputation.
    expect(reputation.get(a)).to.equal(0);
  });

  it('announces each change to a reputation', (): void => {
    const { a, reputation, ruleRegistry } = setUp({ maximum: 3 }),
      heard: [Player, number, number, string | undefined][] = [];

    ruleRegistry.register(
      new ReputationChanged(
        new Effect((player, from, to, reason) => {
          heard.push([player, from, to, reason]);
        })
      )
    );

    reputation.adjust(a, 1, 'broke-treaty');
    reputation.set(a, 1);
    reputation.adjust(a, 5);
    reputation.adjust(a, 1);

    expect(heard).to.deep.equal([
      [a, 0, 1, 'broke-treaty'],
      [a, 1, 3, undefined],
    ]);
  });
});
