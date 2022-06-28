import { assign } from "xstate";
import { send } from "xstate/lib/actions";
import { createModel } from "xstate/lib/model";

import { eventBusService } from "../lib/EventBus";

export const boardModel = createModel({
  size: 4 as 4 | 6,
  icons: true,
  tokens: [] as { id: string; value: number }[],
});

export const boardMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCED2BDAThAsugxgBYCWAdmAHQCSpxALgMQDKAKgIIBKLioADqrHrFUpHiAAeiALQA2AEwUADHICMMgBwBWLQGY5AThkAWTQBoQAT2kmK6mQHYdRvZp3qDdgL6fzaLLgIScgoWAFdMUgYOAFEmAHkAGQA1aIB9FgBVDgA5MX5BOmFRJAlpeSVVDW1XA2MzS0QVRQojGU19exVNOU1lHU17GW9fDGw8IjJKMIiGOlQAazBSAGEAG2J8ebyBIRExSQQVLopenR0VdXU3bpV7eqsEKSMFfSdFHQ7FeTuB4ZA-MaBSYUDhwVCrABuYGmkWy0QA6uksrkSvldsVQAdZAplGotLpaiZzA9tC02oZFJojOp3nd7N4fCBSKgIHAxACAhNgjR6NsCkV9tIepoKPp2nJFEZnDp7HIZG1idJ7PYKDoHGr9Ld3IomvTGRzxkEpuEMSA0YU9iUDkcdCd9Ip1Cp7fLLiYjIqEEZ9EpycYLt85Zo-gagcFQbBwVCYXz0YLHnIjM19IYZMmdd1k5p7ohnhQZHp5GKE3J3F59aNOUaYxbTVi5PZvWL9BKpWdZfLs48us01Y5Wq91MqswzPEA */
  boardModel.createMachine(
    {
      context: boardModel.initialContext,
      tsTypes: {} as import("./boardMachine.typegen").Typegen0,
      initial: "Init",
      invoke: {
        id: "eventBus",
        src: "eventBus",
      },
      states: {
        Init: {
          entry: "initBoard",
          on: {
            START: {
              target: "Turn",
            },
          },
        },
        Turn: {
          on: {
            RESOLVE_TURN: {
              target: "ResolveTurn",
            },
            tokenClick: {
              actions: "tokenClick",
            },
          },
        },
        ResolveTurn: {
          on: {
            NEW_TURN: {
              target: "Turn",
            },
          },
        },
      },
      id: "BoardMachine",
    },
    {
      services: {
        eventBus: eventBusService("tokenClick"),
      },
      actions: {
        initBoard: assign({
          tokens: (context) => {
            const res = [];

            for (let i = 0; i < (context.size * context.size) / 2; i++) {
              res.push(
                { value: i, id: `token-${i}-1` },
                { value: i, id: `token-${i}-2` }
              );
            }

            return res;
          },
        }),
        tokenClick: (context, event) => {
          console.log("Board: token clicked");
        },
      },
    }
  );
