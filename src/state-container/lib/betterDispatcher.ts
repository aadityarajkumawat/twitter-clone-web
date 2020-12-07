interface DispatchParamsX {
  type: string;
}

export function betterDispatcher<Y>(
  dispatchFunction: React.Dispatch<Y>,
  dispatchParams: Y & DispatchParamsX
) {
  dispatchFunction(dispatchParams);

  const actionTypeSchema: any = {};

  type MapSchemaTypes = {
    string: string;
    boolean: boolean;
    number: number;
    regexp: RegExp;
    object: object;
  };

  type MapSchema<T extends Record<string, keyof MapSchemaTypes>> = {
    -readonly [K in keyof T]: MapSchemaTypes[T[K]];
  };

  if (dispatchParams.hasOwnProperty("type")) {
    const action = {
      type: "string",
    } as const;

    let keyName = dispatchParams.type;

    actionTypeSchema[keyName] = action;

    for (let key in actionTypeSchema) {
      type Action = MapSchema<typeof action> & MapSchema<typeof action>;
    }
  }
}
