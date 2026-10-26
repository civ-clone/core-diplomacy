import Interaction from '../Interaction';
import InteractionRegistry from '../InteractionRegistry';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Turn from '@civ-clone/core-turn-based-game/Turn';
import { expect } from 'chai';

describe('InteractionRegistry', (): void => {
  const setUp = () => {
    const ruleRegistry = new RuleRegistry(),
      turn = new Turn(),
      [a, b, c] = [1, 2, 3].map(() => new Player(ruleRegistry)),
      interactionRegistry = new InteractionRegistry(),
      between = (...players: Player[]): Interaction =>
        new Interaction(...players, ruleRegistry, turn);

    return { a, b, c, between, interactionRegistry };
  };

  it('should find the interactions between exactly the players given, in any order', (): void => {
    const { a, b, c, between, interactionRegistry } = setUp(),
      ab = between(a, b),
      bc = between(b, c),
      abc = between(a, b, c),
      ba = between(b, a);

    interactionRegistry.register(ab, bc, abc, ba);

    expect(interactionRegistry.getByPlayers(a, b)).to.deep.equal([ab, ba]);
    expect(interactionRegistry.getByPlayers(b, a)).to.deep.equal([ab, ba]);
    expect(interactionRegistry.getByPlayers(a, b, a)).to.deep.equal([ab, ba]);
    expect(interactionRegistry.getByPlayers(c, a, b)).to.deep.equal([abc]);
    expect(interactionRegistry.getByPlayers(a, c)).to.deep.equal([]);
    expect(interactionRegistry.getByPlayers(a)).to.deep.equal([]);
  });

  it('should agree with `isBetween` for every pair', (): void => {
    const { a, b, c, between, interactionRegistry } = setUp(),
      interactions = [
        between(a, b),
        between(c, a),
        between(a, b, c),
        between(b, c),
        between(a, c),
      ];

    interactionRegistry.register(...interactions);

    [
      [a, b],
      [b, a],
      [a, c],
      [c, b],
      [a, b, c],
    ].forEach((players: Player[]): void =>
      expect(interactionRegistry.getByPlayers(...players)).to.deep.equal(
        interactions.filter((interaction: Interaction): boolean =>
          interaction.isBetween(...players)
        )
      )
    );
  });

  it('should stop finding an interaction once it is unregistered', (): void => {
    const { a, b, between, interactionRegistry } = setUp(),
      first = between(a, b),
      second = between(a, b);

    interactionRegistry.register(first, second);
    interactionRegistry.unregister(first);

    expect(interactionRegistry.getByPlayers(a, b)).to.deep.equal([second]);
  });

  it('should not let a caller change what it finds', (): void => {
    const { a, b, between, interactionRegistry } = setUp(),
      interaction = between(a, b);

    interactionRegistry.register(interaction);
    interactionRegistry.getByPlayers(a, b).pop();

    expect(interactionRegistry.getByPlayers(a, b)).to.deep.equal([interaction]);
  });
});
