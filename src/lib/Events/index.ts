import { getContext, onDestroy } from "svelte";

type EventCallback = (data?: any) => void;

export class EventBus {
  private listeners = new Map<string, Set<EventCallback>>();

  on(eventName: string, callback: EventCallback) {
    let listenerSet = this.listeners.get(eventName);
    if (!listenerSet) {
      listenerSet = new Set();
      this.listeners.set(eventName, listenerSet);
    }
    listenerSet.add(callback);

    onDestroy(() => {
      listenerSet.delete(callback);
    });
  }

  dispatch(eventName: string, data?) {
    let listenerSet = this.listeners.get(eventName);
    if (!listenerSet) return;

    for (const cb of listenerSet) {
      cb(data);
    }
  }
}

export function getEventBusContext(key = "eventBus") {
  return getContext(key) as EventBus;
}
