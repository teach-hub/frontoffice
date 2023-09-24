export type Mutable<T> = T extends object
  ? { -readonly [P in keyof T]: Mutable<T[P]> }
  : { -readonly [P in keyof T]: T[P] };
export type FormErrors<T> = { [P in keyof Partial<T>]: string };

export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;

type B = number extends object ? string : number;
