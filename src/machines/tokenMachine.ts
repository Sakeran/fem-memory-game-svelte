import { forwardTo, send } from "xstate/lib/actions";
import { createModel } from "xstate/lib/model";
import { eventBusService } from "../lib/EventBus";

const tokenModel = createModel({
  value: 0,
  id: "token",
});

export const tokenMachine = tokenModel.createMachine(
  {
    context: tokenModel.initialContext,
    tsTypes: {} as import("./tokenMachine.typegen").Typegen0,
    invoke: {
      src: "eventBus",
      id: "eventBus",
    },
    initial: "Hidden",
    states: {
      Hidden: {
        on: {
          REVEAL: {
            target: "Revealed",
          },
          tokenClick: {
            actions: "sendClickToBus",
          },
        },
      },
      Revealed: {
        on: {
          HIDE: {
            target: "Hidden",
          },
          MATCHED: {
            target: "Matched",
          },
        },
      },
      Matched: {},
    },
    id: "tokenMachine",
  },
  {
    services: {
      eventBus: eventBusService(),
    },
    actions: {
      sendClickToBus: forwardTo("eventBus"),
    },
  }
);
