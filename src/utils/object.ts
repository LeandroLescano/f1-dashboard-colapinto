import {CamelizeKeys} from "@interfaces/generic";

// toCamel converts a snake_case object to camelCase
export const toCamel = <T>(item: T): CamelizeKeys<T> => {
  if (Array.isArray(item)) {
    // If the item is an array, recursively convert each element
    return item.map((el) => toCamel(el)) as unknown as CamelizeKeys<T>;
  } else if (typeof item === "function" || item !== Object(item)) {
    // If the item is a function or not an object, return it as is
    return item as unknown as CamelizeKeys<T>;
  }

  return Object.fromEntries(
    // Extract the key-value pairs from the object
    Object.entries(item as Record<string, unknown>) // Convert the object to an array of key-value pairs
      .map(([key, value]: [string, unknown]) => [
        key
          .replace(/(_id)/g, "ID") // Replace id with ID only if is not the first word
          .replace(/([-_](\d|[a-z]))/gi, (c) =>
            c.toUpperCase().replace(/[-_]/g, "")
          ), // Convert snake_case to camelCase
        toCamel(value),
      ])
  ) as unknown as CamelizeKeys<T>;
};
