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
  never sets one has none, and a game that does saves them with the rest of its diplomacy.

## `Rule`s to help manage some of the above entities

### For `Interaction`s

- `Created` - fired on creation
- `Sentiment` - declared for a rule set that wants to score a `Proposal`, for example how a computer player would
  answer it. Nothing here processes it: a rule set that registers `Sentiment` rules asks them itself.

### For `Negotiation`s

- `Interaction` - fired at each completed step of a `Negotiation`
- `Step` - controls which `Interaction`s are available at any given point in a `Negotiation`.
- `Terminated` - fired once the `Negotiation` has ended, after the ending step's own `Interaction` rules

### For `Proposal`s

- `Resolved` - fired when a `Proposal` is resolved, with the `Resolution`
- `Accepted`/`Declined` - fired after the `Resolved` effects, when the `Resolution` was an `Accept` or a `Decline`

### For `Attitude` and `Reputation`

- `AttitudeChanged` - fired when an attitude changes, with what it was (`undefined` if there was none), what it is now
  and the reason given
- `ReputationChanged` - fired when a reputation changes, likewise

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
