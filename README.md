# core-diplomacy

Contains base entities for basic diplomacy.

- `Interaction` for anything that happens involving `Player`s.
- `Declaration` for tracking persistent state between `Player`s.
- `Expiry` for terminating `Declaration`s based on the current `Turn`.
- `Proposal` for handling a decision within a `Negotiation`.
- `Resolution` for resolving `Proposal`s.
- `Negotiation` for tracking chains of `Proposal`s. Either player may open one: the first player it's made with is its
  `initiator()`, and the other answers.
- `Attitude` for how each player feels about each other, one number per direction of each pair, and `Reputation` for
  each player's standing, with a credit each other player may give them against it. What the numbers mean is the rule
  set's; each takes an optional range. Their values are kept as `AttitudeRecord`, `ReputationRecord` and
  `ReputationCreditRecord` interactions in the `InteractionRegistry`, made the first time one is set, so a game that
  never sets one has none, and a game that does saves them with the rest of its diplomacy. All three are
  `RelationRecord`s: values kept about players, not something that happened between them. **A reader that takes any
  interaction between two players as a sign they've met must skip `RelationRecord`s.** To load a save that has them,
  the loading game must register the three classes (core-save-game's `registerClasses`, or a rule set's own).

## `Rule`s to help manage some of the above entities

### For `Interaction`s

- `Created` - fired on creation
- `Sentiment` - declared for a rule set that wants to score a `Proposal`, for example how a computer player would
  answer it. Nothing here processes it: a rule set that registers `Sentiment` rules asks them itself.

### For `Negotiation`s

- `Interaction` - fired at each completed step of a `Negotiation`
- `Step` - controls which `Interaction`s are available at any given point in a `Negotiation`.
- `Terminated` - fired once the `Negotiation` has ended, after the ending step's own `Interaction` rules and before
  whoever drives the negotiation registers it (the drivers register it when their loop ends). `proceed` isn't async:
  a `Terminated` rule that throws throws from `proceed`, with the negotiation already ended, and one that returns a
  promise isn't waited for.

### For `Proposal`s

- `Resolved` - fired when a `Proposal` is resolved, with the `Resolution`
- `Accepted`/`Declined` - fired after the `Resolved` effects, when the `Resolution` was an `Accept` or a `Decline`. Like
  `Resolved`, they're awaited, so a handler that throws or rejects rejects `resolve`. They're heard for every proposal
  resolved that way, the opening `Initiate` included, so a rule that means one kind of proposal checks its class.

### For `Attitude` and `Reputation`

- `AttitudeChanged` - fired when an attitude changes, with what it was (`undefined` if there was none), what it is now
  and the reason given
- `ReputationChanged` - fired when a reputation changes, likewise. A credit's changes aren't announced, and a credit
  isn't kept to the reputation's range: what limits it is the rule set's.

`Attitude` and `Reputation` refuse a range whose minimum is above its maximum.

All interactions (anything that inherits from `Interaction`) can be stored in the `InteractionRegistry`.

## Future ideas

I'm sure some of these approaches might not work out further down the line, the implementation of using the
`chooseFromList` mechanism in the `Client` in particular might need altering, which might encourage further changes to
the flow here, but this is "good enough" for now.

Other ideas:

- `Voter`s. Maybe this is just an interface and any object can be a `Voter`, `Proposal`s could then be `vote`d on by any
  entity that implements the interface and the concept could work for any type of diplomacy like UN, internal `City`
  elections, etc
- Full support for more than two participants.
- `ResolutionStrategy`s for requirements like `Unanimous` and `Majority` to allow `Proposal`s to be actioned.
- `Dialogue` probably shouldn't be a `Proposal`...
