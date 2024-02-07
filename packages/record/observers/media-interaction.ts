import { mirror } from '@mood/snapshot';
import { each, on } from '@mood/utils';
import { SourceTypes } from '../types';

const ACTIONS = <const>['play', 'pause'];

export type SubscribeToMediaInteraction = (typeof ACTIONS)[number];

export type MediaInteractionEmitArg = {
  source: SourceTypes.MEDIA_INTERACTION;
  action: SubscribeToMediaInteraction;
  id: number;
};

export type SubscribeToMediaInteractionHandler = (arg: MediaInteractionEmitArg) => void;

export function $$mediaInteraction(cb: SubscribeToMediaInteractionHandler, doc?: Document) {
  const handler = (act: SubscribeToMediaInteraction) => (event: Event) => {
    const { target } = event;
    if (target) {
      cb({ source: SourceTypes.MEDIA_INTERACTION, id: mirror.getId(target), action: act });
    }
  };

  const unsubscribes = ACTIONS.map(k => on(doc || document, k, handler(k)));

  return () => each(unsubscribes, u => u());
}
