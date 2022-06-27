import { createModel } from "xstate/lib/model";

const tokenModel = createModel({
  value: 0,
  icon: false,
});

export const tokenMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2BrMA7AsgQwGMALASyzADoBVLWMAGzAOTwCNGBiAUQDkBBAEIAZLgH0AylxEBhACoBJAPI9EoAA6pYJZCVRZVIAB6IAbACYKAdgCsADgCcZywGYzDyyZPWALABoQAJ6Izt4W9taeAIwm3j6WttZmJgC+yf5omLiEpOQU4gxMLOxgHAAi8uKCIhJSXHJKKkggGlo6egbGCOZWdo4ubvYeXn6BiGb23hThXvbODgAMts72tqnpGNj4xGSU+YzMbJySMrKisooA0rwSsnwASrIGLdq6+k2doSYUzr3OkfP2SLeGLWSz+IIIcaTaYmaLLayuLzONYgDKbbI7PIFZiQDg4PiyaQACTOl14T00L3a71MFhsDicrncnh84MQkRWUwisJcJmWSO8KLRWW2uT2hVxVB4xzqp3OV0a6kpbTeoE63XpfSZgxZIwhZmBXKifJ+thMlksZiFGxFOUofCwJAAtngdFgoOLmK8ODK5KSFaJeKUKa1Xh0xiZbBRPF44a5IrYzM4waMELZodz5pZvJEPCtgak0iAsKgIHADMKtnbqLRsUVGCGqaqjIgALSRP5THNZyJJ8KLQFsyH2L4DCYJ3PeZYha2ZKuYz31sCNlXhyExb5mIF-GzeWweMxDtxR6bWeyA5yw7wrWfo0W7OuQFdhmkIdvzCyJhIOEzzTz77w9UQeIKFiTwDWceZ5kRC1b1tTF8GQYgnyaZ5V1fJJJnjKdcx8fdzCHDkwm5LdbGiBJ-zg+dcgdZ1XTID06xfJVQ2pNVTDmKwt2WJZL0iBFbCHC0KDHPkVjMMx5jsZEi0rDFyGfNiWzffjrC7f5LF7eEB0iIdJjHQDJITa8ARSQsgA */
  tokenModel.createMachine({
    tsTypes: {} as import("./tokenMachine.typegen").Typegen0,
    context: tokenModel.initialContext,
    initial: "Unselectable",
    states: {
      Unselectable: {
        on: {
          ENABLE_SELECTION: {
            target: "Selectable",
          },
        },
      },
      Selectable: {
        on: {
          DISABLE_SELECTION: {
            target: "Unselectable",
          },
          SELECT_TOKEN_START: {
            target: "AnimatingSelection",
          },
          CLICK: {
            actions: (context) => {
              console.log("click"); // stub
            },
          },
        },
      },
      Selected: {
        on: {
          MATCH_TOKEN: {
            target: "Matched",
          },
          UNSELECT_TOKEN: {
            target: "Selectable",
          },
        },
      },
      Matched: {},
      AnimatingSelection: {
        on: {
          SELECT_TOKEN_END: {
            target: "Selected",
          },
        },
      },
    },
    id: "tokenMachine",
  });
