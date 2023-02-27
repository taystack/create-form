type KeyOf<T> = string & keyof T;

type PrimitiveRecord = Record<string, string | number | boolean>;

type UseFormFields<T> = {
  [K in keyof T as string & K]: {
    current: T[K];
    default: T[K];
    error: string | undefined;
    name: string;
    getFiles: () => FileList | null;
    handleFileEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
    set: (value: T[K]) => void;
    setError: (value?: string) => void;
    reset: () => void;
  };
};

type UseFormHandleFileEvent<T> = {
  [K in keyof T]: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type UseFormOptionsValidate<T> = Partial<
  Readonly<{
    [K in keyof T]: (value: T[K], values: T) => string | undefined;
  }>
>;

type UseFormOptions<T extends PrimitiveRecord> = Readonly<{
  validate?: UseFormOptionsValidate<T>;
}>;

type UseFormNames<T> = Readonly<{
  [K in keyof T as string & K]: string;
}>;
type UseFormErrors<T> = Partial<
  Readonly<{
    [K in keyof T as string & K]: string | undefined;
  }>
>;
type UseFormReset<T> = Readonly<{
  [K in keyof T as string & K]: () => void;
}>;

type UseFormSetters<T extends PrimitiveRecord> = Readonly<{
  [K in keyof T]: (value: T[K]) => T[K];
}>;
type UseFormSetError<T extends PrimitiveRecord> = Readonly<{
  [K in keyof T]: (error?: string) => void;
}>;

type UseFormProviderProps<T> = React.PropsWithChildren<{
  defaultValue: Readonly<T>;
}>;

type UseFormContext<T> = UseFormFields<T> & {
  resetAll: () => void;
  toFormData: () => FormData;
  toJSON: () => T;
  toURLSearchParams: () => URLSearchParams;
};
