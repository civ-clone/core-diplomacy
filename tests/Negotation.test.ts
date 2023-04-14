import Accept from '../Proposal/Accept';
import Advance from '@civ-clone/core-science/Advance';
import AdvanceRegistry from '@civ-clone/core-science/AdvanceRegistry';
import Alphabet from '@civ-clone/base-science-advance-alphabet/Alphabet';
import BronzeWorking from '@civ-clone/base-science-advance-bronzeworking/BronzeWorking';
import Criterion from '@civ-clone/core-rule/Criterion';
import Declaration from '../Declaration';
import Decline from '../Proposal/Decline';
import Dialogue from '../Negotiation/Dialogue';
import Effect from '@civ-clone/core-rule/Effect';
import { IAction } from '../Negotiation/Action';
import { IConstructor } from '@civ-clone/core-registry/Registry';
import { IInteraction } from '../Interaction';
import Initiate from '../Negotiation/Initiate';
import Interaction from '../Rules/Negotiation/Interaction';
import InteractionRegistry from '../InteractionRegistry';
import Negotiation from '../Negotiation';
import Never from '../Expiries/Never';
import Player from '@civ-clone/core-player/Player';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import PlayerResearchRegistry from '@civ-clone/core-science/PlayerResearchRegistry';
import Pottery from '@civ-clone/base-science-advance-pottery/Pottery';
import Proposal from '../Negotiation/Proposal';
import Resolution from '../Proposal/Resolution';
import ResolutionValue from '../Proposal/Resolution';
import Resolved from '../Rules/Proposal/Resolved';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Step from '../Rules/Negotiation/Step';
import Terminate from '../Negotiation/Terminate';
import TheWheel from '@civ-clone/base-science-advance-thewheel/TheWheel';
import { expect } from 'chai';

class Peace extends Declaration {}
class OfferPeace extends Proposal {}
class DemandTribute extends Proposal {}
class ExchangeKnowledge extends Proposal {}
class WelcomeDialogue extends Dialogue {}
class AcceptPeaceDialogue extends Dialogue {}
class DeclinePeaceDialogue extends Dialogue {}
class AcceptDemandDialogue extends Dialogue {}
class DeclineDemandDialogue extends Dialogue {}

describe('Negotiation', () => {
  it('should handle `Step`s as expected', () => {
    const ruleRegistry = new RuleRegistry(),
      interactionRegistry = new InteractionRegistry(),
      playerResearchRegistry = new PlayerResearchRegistry();

    ruleRegistry.register(
      new Interaction(
        new Effect((interaction) => interactionRegistry.register(interaction))
      ),

      new Resolved(
        new Criterion(
          (resolution, proposal) =>
            resolution instanceof Decline && proposal instanceof Initiate
        ),
        new Effect(async (resolution, proposal) =>
          proposal
            .negotiation()
            .proceed(
              new Terminate(
                resolution.by(),
                proposal.negotiation(),
                ruleRegistry
              )
            )
        )
      ),
      new Resolved(
        new Criterion(
          (resolution, proposal) =>
            resolution instanceof Accept && proposal instanceof OfferPeace
        ),
        new Effect(async (resolution, proposal) =>
          interactionRegistry.register(
            new Peace(...proposal.players(), new Never(), ruleRegistry)
          )
        )
      ),
      new Resolved(
        new Criterion(
          (resolution, proposal) =>
            resolution instanceof Accept &&
            proposal instanceof ExchangeKnowledge
        ),
        new Effect(async (resolution, proposal) => {
          const byResearch = playerResearchRegistry.getByPlayer(
              resolution.by()
            ),
            forResearch = playerResearchRegistry.getByPlayer(
              resolution.for()[0]
            ),
            forAdvances = byResearch
              .complete()
              .filter(
                (completedAdvance) =>
                  !forResearch.completed(completedAdvance.sourceClass())
              ),
            byAdvances = forResearch
              .complete()
              .filter(
                (completedAdvance) =>
                  !byResearch.completed(completedAdvance.sourceClass())
              );

          // const byClient = clientRegistry.getByPlayer(resolution.by()),
          //   byAdvance = await byClient.chooseFromList(new ChoiceMeta(byAdvances.map((advance) => advance.sourceClass()), 'diplomacy.exchange-knowledge', resolution)),
          //   forClient = clientRegistry.getByPlayer(resolution.for()[0]),
          //   forAdvance = await forClient.chooseFromList(new ChoiceMeta(forAdvances.map((advance) => advance.sourceClass()), 'diplomacy.exchange-knowledge', resolution));
          //
          // byResearch.addAdvance(byAdvance);
          // forResearch.addAdvance(forAdvance);

          byResearch.addAdvance(byAdvances[0].sourceClass());
          forResearch.addAdvance(forAdvances[0].sourceClass());
        })
      )
    );

    const onlyOncePerNegotiation = (
        InteractionType: typeof Proposal | typeof ResolutionValue
      ): Criterion =>
        // if it's a `Resolution` it could be used many times in a discussion
        Object.prototype.isPrototypeOf.call(ResolutionValue, InteractionType)
          ? new Criterion(() => true)
          : new Criterion(
              // TODO: also check the `for` and `proposer` fields match
              (negotiation) =>
                !interactionRegistry
                  .getByPlayers(...negotiation.players())
                  .some(
                    (interaction) =>
                      // We've already presented `InteractionType` within this `Negotiation`
                      interaction instanceof InteractionType &&
                      interaction.negotiation() === negotiation
                  )
            ),
      lastInteractionWasResolutionForProposal = (
        ProposalType: typeof Proposal
      ): Criterion =>
        new Criterion(
          (negotiation) =>
            negotiation.lastInteraction() instanceof ResolutionValue &&
            negotiation.lastInteraction().proposal() instanceof ProposalType
        ),
      getNextBy = (negotiation: Negotiation) =>
        negotiation.lastInteraction()
          ? negotiation.lastInteraction() instanceof Dialogue
            ? negotiation.lastInteraction()!.by()
            : negotiation
                .players()
                .filter(
                  (player) => player !== negotiation.lastInteraction()!.by()
                )[0]
          : negotiation.players()[0],
      proposalAction = (ActionType: IConstructor<IAction>) =>
        new Effect(
          (negotiation) =>
            new ActionType(getNextBy(negotiation), negotiation, ruleRegistry)
        ),
      resolutionAction = (ActionType: typeof ResolutionValue) =>
        new Effect(
          (negotiation) =>
            new ActionType(
              getNextBy(negotiation),
              negotiation.lastInteraction(),
              ruleRegistry
            )
        ),
      dialogueAction = (ActionType: typeof Dialogue, key: string) =>
        new Effect(
          (negotiation) =>
            new ActionType(
              getNextBy(negotiation),
              key,
              negotiation,
              ruleRegistry
            )
        );

    const namedStateResults = {
      standardTopics: [
        [
          onlyOncePerNegotiation(OfferPeace),
          new Criterion(
            (negotiation) =>
              !interactionRegistry.getByPlayers(...negotiation.players()).some(
                (interaction) =>
                  // We already have a `Peace` treaty....
                  interaction instanceof Peace && interaction.active()
              )
          ),
          proposalAction(OfferPeace),
        ],
        [
          onlyOncePerNegotiation(DemandTribute),
          proposalAction(DemandTribute),
          // TODO: check relationship status and relative 'strength'
        ],
        [
          new Criterion((negotiation) => {
            const [firstPlayerResearch, secondPlayerResearch] = negotiation
                .players()
                .map((player: Player) =>
                  playerResearchRegistry.getByPlayer(player)
                ),
              firstPlayerAdvances = firstPlayerResearch
                .complete()
                .filter(
                  (completedAdvance: Advance) =>
                    !secondPlayerResearch.completed(
                      completedAdvance.sourceClass()
                    )
                ),
              secondPlayerAdvances = secondPlayerResearch
                .complete()
                .filter(
                  (completedAdvance: Advance) =>
                    !firstPlayerResearch.completed(
                      completedAdvance.sourceClass()
                    )
                );

            return (
              firstPlayerAdvances.length > 0 && secondPlayerAdvances.length > 0
            );
          }),
          proposalAction(ExchangeKnowledge),
        ],
        // [
        //   proposalAction(DeclareWarOnPlayer),
        //   // TODO: check that proposed `Player` is not currently at `War` with the mutual `Player`
        // ],
        [proposalAction(Terminate)],
      ],
    };

    const acceptDecline = [
      [resolutionAction(Accept)],
      [resolutionAction(Decline)],
    ];

    const diplomacyNegotiationMap = [
      // [ {From [Interaction]}, {To {Interaction}[]],
      [[null], [[proposalAction(Initiate)]]],
      [[Initiate], acceptDecline],
      [
        [Decline, lastInteractionWasResolutionForProposal(Initiate)],
        [[proposalAction(Terminate)]],
      ],
      [
        [Accept, lastInteractionWasResolutionForProposal(Initiate)],
        [[dialogueAction(WelcomeDialogue, 'neutral')]],
      ],

      // Some more examples:
      // [
      //   [Accept, lastInteractionWasResolutionForProposal(Initiate)],
      //   [[
      //     new Criterion((negotiation) => unitRegistry.getByPlayer(negotiation.lastInteraction().proposal().by()).filter((unit) => unit instanceof Nuclear).length > 0),
      //     dialogueAction(WelcomeDialogue, 'welcome.neutral.backed-by-nuclear-weapons')
      //     // and the inverse of thigs too
      //   ]],
      // ],
      // [
      //   [Accept, lastInteractionWasResolutionForProposal(Initiate)],
      //   [[
      //     new Criterion((negotiation) => unitRegistry.getByPlayer(negotiation.lastInteraction().proposal().by()).filter((unit) => unit instanceof Nuclear).length > 0),
      //     dialogueAction(WelcomeDialogue, 'welcome.neutral.backed-by-nuclear-weapons')
      //   ]],
      // ],

      [[WelcomeDialogue], namedStateResults.standardTopics],

      [[OfferPeace], acceptDecline],
      [
        [Decline, lastInteractionWasResolutionForProposal(OfferPeace)],
        [[dialogueAction(DeclinePeaceDialogue, 'neutral')]],
      ],
      [
        [Accept, lastInteractionWasResolutionForProposal(OfferPeace)],
        [[dialogueAction(AcceptPeaceDialogue, 'neutral')]],
      ],

      [[DeclinePeaceDialogue], namedStateResults.standardTopics],
      [[AcceptPeaceDialogue], namedStateResults.standardTopics],
      [[DemandTribute], acceptDecline],

      [
        [Decline, lastInteractionWasResolutionForProposal(DemandTribute)],
        [[dialogueAction(DeclineDemandDialogue, 'neutral')]],
      ],
      [
        [Accept, lastInteractionWasResolutionForProposal(DemandTribute)],
        [[dialogueAction(AcceptDemandDialogue, 'neutral')]],
      ],

      [[DeclineDemandDialogue], namedStateResults.standardTopics],
      [[AcceptDemandDialogue], namedStateResults.standardTopics],

      [[ExchangeKnowledge], acceptDecline],
      [
        [Decline, lastInteractionWasResolutionForProposal(ExchangeKnowledge)],
        namedStateResults.standardTopics,
      ],
      [
        [Accept, lastInteractionWasResolutionForProposal(ExchangeKnowledge)],
        namedStateResults.standardTopics,
      ],
    ] as [
      [IConstructor<IInteraction> | null, ...Criterion[]],
      (Criterion | Effect)[][]
    ][];

    diplomacyNegotiationMap.forEach(
      ([
        [SourceInteractionType, ...additionalCriteria],
        validNextInteractions,
      ]: [
        [IConstructor<IInteraction> | null, ...Criterion[]],
        (Criterion | Effect)[][]
      ]) =>
        validNextInteractions.forEach(
          ([...effectsAndCriteria]: [...(Criterion | Effect)[]]) =>
            ruleRegistry.register(
              new Step(
                new Criterion((negotiation: Negotiation) =>
                  SourceInteractionType === null
                    ? negotiation.lastInteraction() === null
                    : negotiation.lastInteraction() instanceof
                      SourceInteractionType
                ),
                ...additionalCriteria,
                ...effectsAndCriteria
              )
            )
        )
    );

    (
      [
        [[[Initiate]], [[Accept, Decline], 1]],
        [
          [[Initiate]],
          [[Accept, Decline]],
          [[WelcomeDialogue]],
          [[OfferPeace, DemandTribute, ExchangeKnowledge, Terminate]],
          [[Accept, Decline], 1],
          [[DeclinePeaceDialogue]],
          [[DemandTribute, ExchangeKnowledge, Terminate], 2],
        ],
        [
          [[Initiate]],
          [[Accept, Decline]],
          [[WelcomeDialogue]],
          [[OfferPeace, DemandTribute, ExchangeKnowledge, Terminate]],
          [[Accept, Decline]],
          [[AcceptPeaceDialogue]],
          [[DemandTribute, ExchangeKnowledge, Terminate], 1],
          [[Accept, Decline]],
          [[DemandTribute, ExchangeKnowledge, Terminate]],
          [[Accept, Decline], 1],
          [[DeclineDemandDialogue]],
          [[ExchangeKnowledge, Terminate]],
          [[Accept, Decline]],
          [[Terminate]],
        ],
      ] as [IConstructor<IAction>[], number?][][]
    ).forEach((items) => {
      const player1 = new Player(ruleRegistry),
        player2 = new Player(ruleRegistry),
        negotiation = new Negotiation(ruleRegistry, player1, player2),
        advanceRegistry = new AdvanceRegistry(),
        player1Research = new PlayerResearch(
          player1,
          advanceRegistry,
          ruleRegistry
        ),
        player2Research = new PlayerResearch(
          player2,
          advanceRegistry,
          ruleRegistry
        );

      playerResearchRegistry.register(player1Research, player2Research);

      advanceRegistry.register(Alphabet, BronzeWorking, Pottery, TheWheel);

      player1Research.addAdvance(Alphabet);
      player1Research.addAdvance(BronzeWorking);
      player2Research.addAdvance(Pottery);
      player2Research.addAdvance(TheWheel);

      items.forEach(([ActionTypes, actionToUse = 0]) => {
        const steps = negotiation.nextSteps(),
          lastInteraction = negotiation.lastInteraction();

        expect(steps.length).eq(ActionTypes.length);
        expect(
          ActionTypes.every(
            (ActionType, index) => steps[index] instanceof ActionType
          )
        );

        const step = steps[actionToUse];

        negotiation.proceed(step);

        if (lastInteraction instanceof Proposal && step instanceof Resolution) {
          lastInteraction.resolve(step);
        }
      });

      expect(negotiation.terminated()).true;
    });
  });
});
