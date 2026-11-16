import Attitude from '../Attitude';
import AttitudeRecord from '../Records/AttitudeRecord';
import { IInteraction } from '../Interaction';
import InteractionRegistry from '../InteractionRegistry';
import Negotiation from '../Negotiation';
import Player from '@civ-clone/core-player/Player';
import RelationRecord from '../Records/RelationRecord';
import Reputation from '../Reputation';
import ReputationCreditRecord from '../Records/ReputationCreditRecord';
import ReputationRecord from '../Records/ReputationRecord';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Turn from '@civ-clone/core-turn-based-game/Turn';
import { expect } from 'chai';

// What core-save-game does, in small: an entity is written as its saved fields (`stateKeys()`), with players as
//  references and sets as lists, through JSON; it's read back with `Object.create` and no constructor, and the loading
//  game supplies the transient collaborators (`_ruleRegistry`, `_turn`), as `Game.inject` does.
type Encoded = unknown;

const encode = (value: unknown): Encoded => {
  if (value instanceof Player) {
    return { $ref: value.id() };
  }

  if (value instanceof Set) {
    return { $set: Array.from(value).map(encode) };
  }

  if (Array.isArray(value)) {
    return value.map(encode);
  }

  if (value !== null && typeof value === 'object') {
    throw new TypeError('Not expected in these records.');
  }

  return value;
};

const decode = (value: any, players: Map<string, Player>): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => decode(item, players));
  }

  if (value !== null && typeof value === 'object') {
    if ('$ref' in value) {
      return players.get(value.$ref);
    }

    if ('$set' in value) {
      return new Set(value.$set.map((item: any) => decode(item, players)));
    }
  }

  return value;
};

const saveAndLoad = (
  interactionRegistry: InteractionRegistry,
  players: Player[],
  ruleRegistry: RuleRegistry,
  turn: Turn
): InteractionRegistry => {
  const file = JSON.stringify(
      interactionRegistry.entries().map((entity) => ({
        type: entity.constructor.name,
        id: entity.id(),
        keys: (entity as any)._keys,
        state: Object.fromEntries(
          entity.stateKeys().map((key) => [key, encode((entity as any)[key])])
        ),
      }))
    ),
    classes = new Map<string, Function>(
      [
        AttitudeRecord,
        ReputationRecord,
        ReputationCreditRecord,
        Negotiation,
      ].map((Type) => [Type.name, Type])
    ),
    byId = new Map(players.map((player) => [player.id(), player])),
    loaded = new InteractionRegistry();

  JSON.parse(file).forEach(({ type, id, keys, state }: any) => {
    const entity = Object.create(classes.get(type)!.prototype);

    Object.entries(state).forEach(([key, value]) => {
      entity[key] = decode(value, byId);
    });

    entity._id = id;
    entity._keys = keys;
    entity._ruleRegistry = ruleRegistry;
    entity._turn = turn;

    loaded.register(entity as IInteraction);
  });

  return loaded;
};

describe('saving and loading', (): void => {
  it('keeps attitudes, reputations and credits, each way, and the records say what they are', (): void => {
    const ruleRegistry = new RuleRegistry(),
      turn = new Turn(),
      [a, b] = [1, 2].map(() => new Player(ruleRegistry)),
      interactionRegistry = new InteractionRegistry(),
      attitude = new Attitude(interactionRegistry, ruleRegistry, turn),
      reputation = new Reputation(interactionRegistry, ruleRegistry, turn);

    attitude.set(a, b, 30);
    attitude.set(b, a, 70);
    reputation.set(b, 4);
    reputation.setCredit(a, b, 2);

    interactionRegistry
      .entries()
      .forEach((record) => expect(record).to.be.instanceOf(RelationRecord));

    const loaded = saveAndLoad(interactionRegistry, [a, b], ruleRegistry, turn),
      loadedAttitude = new Attitude(loaded, ruleRegistry, turn),
      loadedReputation = new Reputation(loaded, ruleRegistry, turn);

    expect(loaded.entries().length).to.equal(4);
    expect(loadedAttitude.get(a, b)).to.equal(30);
    expect(loadedAttitude.get(b, a)).to.equal(70);
    expect(loadedReputation.get(b)).to.equal(4);
    expect(loadedReputation.get(a)).to.equal(0);
    expect(loadedReputation.credit(a, b)).to.equal(2);
    expect(loadedReputation.credit(b, a)).to.equal(0);

    // And they carry on from where they were, without making new records.
    expect(loadedAttitude.adjust(a, b, 5)).to.equal(35);
    expect(loaded.entries().length).to.equal(4);
  });

  it('keeps who opened a negotiation', (): void => {
    const ruleRegistry = new RuleRegistry(),
      turn = new Turn(),
      [a, b] = [1, 2].map(() => new Player(ruleRegistry)),
      interactionRegistry = new InteractionRegistry();

    interactionRegistry.register(new Negotiation(b, a, ruleRegistry));

    const [negotiation] = saveAndLoad(
      interactionRegistry,
      [a, b],
      ruleRegistry,
      turn
    ).entries() as Negotiation[];

    expect(negotiation).to.be.instanceOf(Negotiation);
    expect(negotiation.initiator()).to.equal(b);
    expect(negotiation.players()).to.deep.equal([b, a]);
  });
});
