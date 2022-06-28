import { assign } from "xstate";
import { createModel } from "xstate/lib/model";

export const boardModel = createModel({
  size: 4 as 4 | 6,
  icons: true,
  tokens: [] as { id: string; value: number }[],
});

export const boardMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCED2BDAThAsugxgBYCWAdmAHQCSpxALgMSKgAOqs9xqpzIAHogC0AJgCMANgoBmYcICcUxQAZ5AVikAWKQBoQATyEbJE1UoDswjQA4rUq0tFyAvk91osuAiXIUAKgFdMUgYAJQBRAGUAeQAZADUwgH1fAFUQgDleNg46Lh4kfiEzKQphM1FrcTlbUStTM10DBGEShSMNaqkzJXEZJVUXNwxsPCIyShC4VAAbADcwAKCGdLCAdWS0zILszm5eAQRBVTMKDRULOWFxcRa7YUbEUVkKMzrysw0zOQ-hY5dXECkVAQOC8dwjLzjai0OhZdi7fKgA4ibrSVTiKwmJQ9DRiDQPQ6iUSqCj9Y79THE8x1QYgcGeMY+RaIkA7XJ7ArIsRKCgYuRKDqqKzCKzfBr6RByF6-VRCpRSCqaFS0+mjbwTKZzBaBFlsvL7SWSZR1DQSfrCAUE0QnLRGeotVSWJRyDQq4YM9VwnL6zlCeQaNEYrE4vEEwS1Kyk2XdKziCrC0RSf5OIA */
  boardModel.createMachine(
    {
      tsTypes: {} as import("./boardMachine.typegen").Typegen0,
      context: boardModel.initialContext,
      initial: "Init",
      states: {
        Init: {
          entry: "initBoard",
          always: {
            target: "Turn",
          },
        },
        Turn: {
          entry: "enableClicks",
          on: {
            RESOLVE_TURN: {
              target: "ResolveTurn",
            },
          },
        },
        ResolveTurn: {
          entry: "disableClicks",
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
        enableClicks: () => {
          // stub
        },
        disableClicks: () => {
          // stub
        },
      },
    }
  );
