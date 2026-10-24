import Criterion from '@civ-clone/core-rule/Criterion';
import Declaration from '../Declaration';
import Effect from '@civ-clone/core-rule/Effect';
import Expired from '../Rules/Declaration/Expired';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Turn from '@civ-clone/core-turn-based-game/Turn';
import { expect } from 'chai';

describe('Declaration', (): void => {
  const setUp = () => {
    const ruleRegistry = new RuleRegistry(),
      a = new Player(ruleRegistry),
      b = new Player(ruleRegistry),
      declaration = new Declaration(a, b, ruleRegistry, new Turn()),
      expiredBy: (Player | null)[] = [];

    ruleRegistry.register(
      new Expired(
        new Criterion((expired: Declaration) => expired === declaration),
        new Effect((expired: Declaration, by: Player | null) => {
          expiredBy.push(by);
        })
      )
    );

    return { a, declaration, expiredBy };
  };

  it('should tell the `Expired` rules who ended it', (): void => {
    const { a, declaration, expiredBy } = setUp();

    declaration.expire(a);

    expect(declaration.expired()).true;
    expect(expiredBy).to.deep.equal([a]);
  });

  it('should tell the `Expired` rules no one ended it when no one is given', (): void => {
    const { declaration, expiredBy } = setUp();

    declaration.expire();

    expect(declaration.expired()).true;
    expect(expiredBy).to.deep.equal([null]);
  });
});
