// Camelize converts a snake_case string to camelCase
export type Camelize<S extends string> = S extends `id_${infer Rest}`
  ? `id${Capitalize<Camelize<Rest>>}` // If the string starts with id_, mantain as lowerCase
  : S extends `${infer Prefix}_id`
  ? `${Camelize<Prefix>}ID` // If the string ends with _id, convert it to ID
  : S extends `${infer Prefix}_id_${infer Rest}`
  ? `${Camelize<Prefix>}ID${Capitalize<Camelize<Rest>>}` // If the string contains _id_, convert it to ID
  : S extends `${infer Prefix}_${infer Rest}`
  ? `${Camelize<Prefix>}${Capitalize<Camelize<Rest>>}` // Otherwise camelCase the string
  : S; // Otherwise return the string as is

// CamelizeKeys converts a snake_case object to camelCase
export type CamelizeKeys<T> = T extends object
  ? {
      // For each key in T, convert it to camelCase
      [K in keyof T as Camelize<string & K>]: T[K] extends (infer U)[]
        ? CamelizeKeys<U>[] // If the value is an array, recursively convert each element
        : T[K] extends object
        ? CamelizeKeys<T[K]> // If the value is an object, recursively convert it
        : T[K]; // Otherwise camelCase the key
    }
  : T;
