# core-diplomacy

Contains base entities for basic diplomacy.

- `Interaction` for anything that happens involving `Player`s.
- `Declaration` for tracking persistent state between `Player`s.
- `Expiry` for terminating `Declaration`s based on the current `Turn`.
- `Proposal` for handling a decision within a `Negotiation`.
- `Resolution` for resolving `Proposal`s.
- `Negotiation` for tracking chains of `Proposal`s.

## `Rule`s to help manage some of the above entities

### For `Interaction`s

- `Created` - fired on creation
- `Sentiment` - allows a point system to be implemented for building a relationship score of `Player`s based on their 
  `Interaction`s

### For `Negotiation`s

- `Interaction` - fired at each completed step of a `Negotiation`
- `Step` - controls which `Interaction`s are available at any given point in a `Negotiation`.
- `Terminated` - when the `Negotiation` is complete

### For `Proposal`s

- `Accepted`/`Declined`/`Resolved` - fired when `Proposal`s are affected

All interactions (anything that inherits from `Interaction`) can be stored in the `InteractionRegistry` to enable
sentiment analysis.

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
