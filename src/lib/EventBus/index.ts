type CallbackFunction = (event) => void;
type ListenerDeclarations = string[];

class EventBus {
  private listeners: Map<string, Set<CallbackFunction>> = new Map();

  private getListeners(eventName: string) {
    let cbSet = this.listeners.get(eventName);
    if (cbSet === undefined) {
      cbSet = new Set();
      this.listeners.set(eventName, cbSet);
    }
    return cbSet;
  }

  public addListener(eventName: string, callback: CallbackFunction) {
    console.log(eventName);
    
    const listenerSet = this.getListeners(eventName);
    listenerSet.add(callback);
  }

  public removeListener(eventName: string, callback: CallbackFunction) {
    const listenerSet = this.getListeners(eventName);
    listenerSet.delete(callback);
  }

  public dispatch(event) {
    const type = event.type;

    if (!this.listeners.has(type)) {
      console.warn(`EventBus was dispatched unknown event ${type}.`);
      return;
    }

    const listenerSet = this.getListeners(type);
    for (const callback of listenerSet) {
      callback(event);
    }
  }
}

const eventBus = new EventBus();

export const eventBusService = (...events: ListenerDeclarations) => {
  return (_context, _event) => (callback, onReceive) => {
    // Add listeners
    for (const event of events) {
      eventBus.addListener(event, callback);
    }

    onReceive((parentEvent) => {
      eventBus.dispatch(parentEvent);
    });

    return () => {
      // Remove listeners on cleanup
      for (const event of events) {
        eventBus.removeListener(event, callback);
      }
    };
  };
};
