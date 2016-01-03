import { List } from 'immutable';

export function removePlayerFromPossibleOwners(player) {
  return (card) => {
    if (card.get('owner')) return card;

    return card.set('possibleOwners', card.get('possibleOwners').filter(owner => owner !== player))
  };
}

export function simplifyPossibleOwners(card) {
  return card.get('possibleOwners', List()).size === 1 ? card.set('owner', card.get('possibleOwners').get(0)) : card;
};
