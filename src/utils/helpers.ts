/* eslint-disable @typescript-eslint/no-use-before-define */
import MATH_OPERATIONS from './datasets';

// calculation helpers
export const parseBrackets = (str: string) => {
  let copiedStr = str;
  const out = str.match(/\((.*)\)/);

  if (out) {
    const expResult = parseBrackets(out[1]);
    copiedStr = copiedStr.replace(out[0], expResult);
    return calcExpr(copiedStr);
  }
  return calcExpr(copiedStr);
};

export function checkExpressionWithRegexp(str: string, action: typeof MATH_OPERATIONS[0]) {
  const reg = new RegExp(`((-?\\d+)\\s*\\${action.value}\\s*(\\d+))`);
  return str.match(reg);
}

export function parseExpr(str: string, action: typeof MATH_OPERATIONS[0]) {
  const out = checkExpressionWithRegexp(str, action);

  if (!out) return null;

  const result: { str: string; value: number } = {
    str: out[1],
    value: 0,
  };

  result.value = action.func(out[2], out[3]);
  return result;
}

export function calcExpr(str: string) {
  let copiedString = str;
  let res;

  MATH_OPERATIONS.forEach((action) => {
    res = parseExpr(str, action);

    if (res) {
      copiedString = copiedString.replace(res.str, res.value.toString());
      copiedString = calcExpr(copiedString);
    }
  });

  return copiedString;
}
