import {
  MouseInteractionCallBack,
  ListenerHandler,
  MouseInteractions,
  mirror,
  TNode,
} from "@traps/common";
import { on } from "../utils";

export function initMouseInteractionObserver(
  cb: MouseInteractionCallBack
): ListenerHandler {
  const handlers: ListenerHandler[] = [];
  const getHandler = (eventKey: keyof typeof MouseInteractions) => {
    return (event: MouseEvent | TouchEvent) => {
      const id = mirror.getId(event.target as TNode);
      const { clientX, clientY } =
        event instanceof TouchEvent ? event.changedTouches[0] : event;
      cb({ type: MouseInteractions[eventKey], id, x: clientX, y: clientY });
    };
  };
  Object.keys(MouseInteractions).forEach(
    (eventKey: keyof typeof MouseInteractions) => {
      const eventName = eventKey.replace(/\_/g, "").toLowerCase();
      const handler = getHandler(eventKey);
      handlers.push(on(eventName, handler));
    }
  );
  return () => {
    handlers.forEach((h) => h());
  };
}

export default initMouseInteractionObserver;