import { LooseObject } from "../types";

export const isNumberInRange = (
  number: number,
  min: number,
  max: number,
  excludedNumbers: number[] = []
): boolean => {
  return number >= min && number <= max && !excludedNumbers.includes(number);
};

export const get = (object: LooseObject, path: any, defaultValue: string) => {
  // Convert the path to an array if it is not already
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  // Reduce the path array to traverse the object
  const result = pathArray.reduce(
    (acc: LooseObject, key: string) => acc && acc[key],
    object
  );

  // Return the resolved value or the default value if the result is undefined
  return result === undefined ? defaultValue : result;
};
