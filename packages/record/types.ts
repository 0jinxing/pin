import { SNWithId } from '@mood/snapshot';
import {
  InputEmitArg,
  MediaInteractionEmitArg,
  MouseInteractionEmitArg,
  MouseMoveEmitArg,
  MutationEmitArg,
  CanvasEmitArg,
  ScrollEmitArg,
  SelectionEmitArg,
  StyleSheetEmitArg,
  ViewportResizeEmitArg
} from './observers';

export enum EventTypes {
  META = 'META',
  LOADED = 'LOADED',
  DOM_CONTENT_LOADED = 'DOM_CONTENT_LOADED',
  FULL_SNAPSHOT = 'FULL_SNAPSHOT',
  INCREMENTAL_SNAPSHOT = 'INCREMENTAL_SNAPSHOT',
  CUSTOM = 'CUSTOM'
}

export enum SourceTypes {
  MUTATION = 'MUTATION',
  MOUSE_MOVE = 'MOUSE_MOVE',
  MOUSE_INTERACTION = 'MOUSE_INTERACTION',
  SCROLL = 'SCROLL',
  VIEWPORT_RESIZE = 'VIEWPORT_RESIZE',
  INPUT = 'INPUT',
  TOUCH_MOVE = 'TOUCH_MOVE',
  MEDIA_INTERACTION = 'MEDIA_INTERACTION',
  STYLE_SHEETRULE = 'STYLE_SHEETRULE',
  SELECTION = 'SELECTION',
  CANVAS = 'CANVAS'
}

export type EmitArg =
  | MutationEmitArg
  | MouseMoveEmitArg
  | MouseInteractionEmitArg
  | ScrollEmitArg
  | ViewportResizeEmitArg
  | InputEmitArg
  | MediaInteractionEmitArg
  | StyleSheetEmitArg
  | SelectionEmitArg
  | CanvasEmitArg;

export type DomContentLoadedEvent = {
  type: EventTypes.DOM_CONTENT_LOADED;
};

export type LoadedEvent = {
  type: EventTypes.LOADED;
};

export type FullSnapshotEvent = {
  type: EventTypes.FULL_SNAPSHOT;
  adds: SNWithId[];
  offset: [top: number, left: number];
};

export type IncrementalSnapshotEvent = {
  type: EventTypes.INCREMENTAL_SNAPSHOT;
} & EmitArg;

export type MetaEvent = {
  type: EventTypes.META;
  href: string;
  width: number;
  height: number;
};

export type CustomEvent<T = unknown> = {
  type: EventTypes.CUSTOM;
  tag: string;
  payload: T;
};

export type RecordEvent =
  | DomContentLoadedEvent
  | LoadedEvent
  | FullSnapshotEvent
  | IncrementalSnapshotEvent
  | MetaEvent
  | CustomEvent;

export type RecordEventWithTime = RecordEvent & { timestamp: number };

export type EmitHandler = (data: EmitArg) => void;
