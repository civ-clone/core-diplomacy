import Accept from '../Proposal/Accept';
import Accepted from '../Rules/Proposal/Accepted';
import Acknowledge from '../Proposal/Acknowledge';
import Criterion from '@civ-clone/core-rule/Criterion';
import Decline from '../Proposal/Decline';
import Declined from '../Rules/Proposal/Declined';
import Effect from '@civ-clone/core-rule/Effect';
import Initiate from '../Negotiation/Initiate';
import InteractionRule from '../Rules/Negotiation/Interaction';
import Negotiation from '../Negotiation';
import Player from '@civ-clone/core-player/Player';
import Proposal from '../Negotiation/Proposal';
import Resolved from '../Rules/Proposal/Resolved';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Step from '../Rules/Negotiation/Step';
import Terminate from '../Negotiation/Terminate';
import Terminated from '../Rules/Negotiation/Terminated';
import { expect } from 'chai';

class OfferPeace extends Proposal {}

describe('Negotiation and Proposal hooks', (): void => {
  const setUp = () => {
    const ruleRegistry = new RuleRegistry(),
      [a, b] = [1, 2].map(() => new Player(ruleRegistry)),
      heard: string[] = [];

    return { a, b, heard, ruleRegistry };
  };

  it('works with no rules for the hooks, as before', async (): Promise<void> => {
    const { a, b, ruleRegistry } = setUp(),
      negotiation = new Negotiation(a, b, ruleRegistry),
      offer = new OfferPeace(a, negotiation, ruleRegistry);

    negotiation.proceed(offer);

    const accept = new Accept(b, offer, ruleRegistry);

    negotiation.proceed(accept);
    await offer.resolve(accept);

    negotiation.proceed(new Terminate(a, negotiation, ruleRegistry));

    expect(offer.resolution()).to.equal(accept);
    expect(negotiation.terminated()).to.equal(true);
  });

  it('hears `Accepted` and `Declined` once the `Resolved` effects have happened, and neither for anything else', async (): Promise<void> => {
    const { a, b, heard, ruleRegistry } = setUp();

    ruleRegistry.register(
      new Resolved(
        new Effect(async (resolution) => {
          heard.push(`resolved ${resolution.constructor.name}`);
        })
      ),
      new Accepted(
        new Effect((proposal) => {
          heard.push(`accepted ${proposal.constructor.name}`);
        })
      ),
      new Declined(
        new Effect((proposal) => {
          heard.push(`declined ${proposal.constructor.name}`);
        })
      )
    );

    const negotiation = new Negotiation(a, b, ruleRegistry),
      initiate = new Initiate(a, negotiation, ruleRegistry),
      offer = new OfferPeace(a, negotiation, ruleRegistry),
      other = new OfferPeace(b, negotiation, ruleRegistry);

    await initiate.resolve(new Acknowledge(b, initiate, ruleRegistry));
    await offer.resolve(new Accept(b, offer, ruleRegistry));
    await other.resolve(new Decline(a, other, ruleRegistry));

    expect(heard).to.deep.equal([
      'resolved Acknowledge',
      'resolved Accept',
      'accepted OfferPeace',
      'resolved Decline',
      'declined OfferPeace',
    ]);
  });

  it('hears `Terminated` once the ending is recorded, after its `Interaction` rules', (): void => {
    const { a, b, heard, ruleRegistry } = setUp();

    ruleRegistry.register(
      new InteractionRule(
        new Effect((interaction) => {
          heard.push(`step ${interaction.constructor.name}`);
        })
      ),
      new Terminated(
        new Effect((negotiation) => {
          heard.push(
            `terminated ${negotiation.terminated()} ${
              negotiation.interactions().length
            }`
          );
        })
      )
    );

    const negotiation = new Negotiation(a, b, ruleRegistry);

    negotiation.proceed(new Initiate(a, negotiation, ruleRegistry));
    negotiation.proceed(new Terminate(b, negotiation, ruleRegistry));

    expect(heard).to.deep.equal([
      'step Initiate',
      'step Terminate',
      'terminated true 2',
    ]);
  });

  it('is opened by either player: the first given is the initiator, and ends it when nothing else applies', (): void => {
    const { a, b, ruleRegistry } = setUp(),
      ab = new Negotiation(a, b, ruleRegistry),
      ba = new Negotiation(b, a, ruleRegistry);

    expect(ab.initiator()).to.equal(a);
    expect(ba.initiator()).to.equal(b);

    const [step] = ba.nextSteps();

    expect(step).to.be.instanceOf(Terminate);
    expect(step.by()).to.equal(b);
  });

  it('offers the `Step`s the rules give, whoever opened it', (): void => {
    const { a, b, ruleRegistry } = setUp();

    ruleRegistry.register(
      new Step(
        new Criterion((negotiation) => negotiation.lastInteraction() === null),
        new Effect(
          (negotiation) =>
            new Initiate(negotiation.initiator(), negotiation, ruleRegistry)
        )
      )
    );

    const [step] = new Negotiation(b, a, ruleRegistry).nextSteps();

    expect(step).to.be.instanceOf(Initiate);
    expect(step.by()).to.equal(b);
  });
});
