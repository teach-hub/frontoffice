export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export type FormErrors<T> = { [P in keyof Partial<T>]: string };

export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
