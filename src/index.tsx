// import React from 'react';

// type UseFormField<T> = {
//   [K in keyof T as string & K]: {
//     current: T[K];
//     error: string | undefined;
//     getFiles: () => FileList | null;
//     set: (value: T[K]) => void;
//     setError: (value: string) => void;
//     reset: () => void;
//   };
// };

// type UseFormContextFocused<T> = UseFormField<T> & {
//   resetAll: () => void;
//   getFormData: () => FormData;
// };

// type UseFormHandleFileEvent<T> = {
//   [K in keyof T]: (event: React.ChangeEvent<HTMLInputElement>) => void;
// };

// export function createFormFocused<T extends PrimitiveRecord>(
//   options?: UseFormOptions<T>,
// ) {
//   const Context = React.createContext<UseFormContextFocused<T>>({
//     resetAll: () => {
//       return;
//     },
//   } as UseFormContextFocused<T>);
//   function Provider({ defaultValue: obj, children }: UseFormProviderProps<T>) {
//     const [complexState, setComplexState] = React.useState(() => ({
//       ...obj,
//     }));
//     const files = React.useRef({} as Record<string & keyof T, FileList | null>);
//     const fileText = React.useRef({} as Record<string & keyof T, string[]>);

//     const [error, setComplexStateError] = React.useState<UseFormErrors<T>>(() =>
//       Object.keys(obj).reduce(
//         (map, key) => ({
//           ...map,
//           [key]: undefined,
//         }),
//         {},
//       ),
//     );

//     const setError = React.useMemo(
//       () =>
//         (Object.keys(obj) as (string & keyof T)[]).reduce((map, key) => {
//           return {
//             ...map,
//             [key]: (error?: string) => {
//               setComplexStateError((old) => ({
//                 ...old,
//                 [key]: error,
//               }));
//             },
//           };
//         }, {} as UseFormSetError<T>),
//       [setComplexStateError, obj],
//     );

//     const name = React.useMemo(
//       () =>
//         Object.keys(obj).reduce(
//           (map, key) => ({
//             ...map,
//             [key]: Math.random().toString().split('.')[1],
//           }),
//           {},
//         ),
//       [obj],
//     ) as UseFormNames<T>;

//     const setCurrent = React.useMemo(
//       () =>
//         (Object.keys(obj) as (string & keyof T)[]).reduce((map, key) => {
//           return {
//             ...map,
//             [key]: (value: T[typeof key]) => {
//               const validateFn =
//                 options && options.validate && options.validate[key];
//               if (validateFn) {
//                 const error = validateFn(value, obj);
//                 setComplexStateError((old) => ({
//                   ...old,
//                   [key]: error,
//                 }));
//               }
//               setComplexState((old) => ({ ...old, [key]: value }));
//             },
//           };
//         }, {} as UseFormSetters<T>),
//       [setComplexState, setComplexStateError, obj],
//     );

//     const reset = React.useMemo(
//       () =>
//         Object.keys(obj).reduce(
//           (map, key) => ({
//             ...map,
//             [key]: () => {
//               delete files.current[key];
//               delete fileText.current[key];
//               setComplexState((old) => ({
//                 ...old,
//                 [key]: obj[key],
//               }));
//               setComplexStateError((old) => ({
//                 ...old,
//                 [key]: undefined,
//               }));
//             },
//           }),
//           {} as UseFormReset<T>,
//         ),
//       [setComplexState, setComplexStateError, obj],
//     );

//     const resetAll = React.useCallback(() => {
//       files.current = {} as Record<string & keyof T, FileList | null>;
//       fileText.current = {} as Record<string & keyof T, string[]>;
//       setComplexState(() => obj);
//       setComplexStateError(() => ({}));
//     }, [setComplexState, setComplexStateError, obj]);

//     const getFormData = React.useCallback(() => {
//       const formData = new FormData();
//       Object.keys(complexState).forEach((key) => {
//         formData.set(key, `${complexState[key]}`);
//       });
//       return formData;
//     }, [complexState]);

//     const handleFileEvent = React.useMemo(
//       () =>
//         Object.keys(obj).reduce(
//           (map, key: string & keyof T) => ({
//             ...map,
//             [key]: (event: React.ChangeEvent<HTMLInputElement>) => {
//               setCurrent[key](event.currentTarget.value as T[typeof key]);
//               if (event.currentTarget.files) {
//                 files.current[key] = event.currentTarget.files;
//               }
//             },
//           }),
//           {} as UseFormHandleFileEvent<T>,
//         ),
//       [obj, setCurrent],
//     );

//     const fields = React.useMemo(
//       () =>
//         Object.keys(obj).reduce(
//           (map, key) => ({
//             ...map,
//             [key]: {
//               current: complexState[key],
//               default: obj[key],
//               error: error[key],
//               name: name[key],
//               getFiles: () => files.current[key],
//               handleFileEvent: handleFileEvent[key],
//               reset: reset[key],
//               set: setCurrent[key],
//               setError: setError[key],
//             },
//           }),
//           {} as UseFormField<T>,
//         ),
//       [
//         obj,
//         complexState,
//         setCurrent,
//         error,
//         reset,
//         setError,
//         name,
//         handleFileEvent,
//       ],
//     );

//     return (
//       <Context.Provider value={{ ...fields, resetAll, getFormData }}>
//         {children}
//       </Context.Provider>
//     );
//   }
//   return {
//     Provider,
//     Context,
//   };
// }
