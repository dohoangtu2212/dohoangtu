import {
  isArray,
  flatMap,
  isPlainObject,
  keys,
  map,
  concat,
  isString,
  get,
} from "lodash";
import type { FormikErrors, FormikTouched } from "formik";

// List all available paths to get values from an object/array
// Can use "parentKey" to specify the prefix/start of paths
export function paths(
  obj: any[] | { [key: string]: any },
  parentKey?: string
): string[] {
  let result: string[];
  if (isArray(obj)) {
    let idx = 0;
    result = flatMap(obj, function (obj: any) {
      // e.g. a[0], b[1]
      return paths(obj, (parentKey || "") + "[" + idx++ + "]");
    });
  } else if (isPlainObject(obj)) {
    result = flatMap(keys(obj), function (key) {
      return map(paths(obj[key], key), function (subkey) {
        // e.g. a.b, a.c.d
        return (parentKey ? parentKey + "." : "") + subkey;
      });
    });
  } else {
    result = [];
  }
  return concat(result, parentKey || []);
}

export const formikGetErrorMessages = (
  errors: FormikErrors<any>,
  touched: FormikTouched<any>
): string[] => {
  const touchedPaths = paths(touched);
  const pathsHavingError = touchedPaths.filter((path) => {
    return isString(get(errors, path));
  });
  const messagesOfTouchedFields = pathsHavingError.map((path) =>
    get(errors, path)
  );

  return messagesOfTouchedFields as string[];
};

export const formikGetIsDisabled = (
  errors: FormikErrors<any>,
  touched: FormikTouched<any>
): boolean => {
  const noFieldTouched =
    Object.values(touched).findIndex((val) => !!val) === -1;
  const errorMessages = formikGetErrorMessages(errors, touched);
  const hasError = !!errorMessages.length;

  return hasError || noFieldTouched;
};
