import { useContext } from 'react';

import { createForm } from 'createForm';

export default { title: 'forms/ExampleForm' };

type Example = {
  checkbox: boolean;
  color: string;
  date: string;
  datetimeLocal: string;
  number: number;
  radioNumber: number;
  radioString: string;
  range: number;
  text: string;
  select: string;
};

const DEFAULT_EXAMPLE: Example = {
  checkbox: false,
  color: '#f94885',
  date: '',
  datetimeLocal: '',
  number: 0,
  radioNumber: -1,
  radioString: '',
  range: 0,
  text: '',
  select: '',
};

const OPTIONS: UseFormOptions<Example> = {
  validate: {
    text: (value) => (value.length === 0 ? 'Dirty check error' : undefined),
    number: (value) => (value === 0 ? 'Dirty check error' : undefined),
    checkbox: (value) => (value ? 'Dirty check error' : undefined),
  },
};

const ExampleForm = createForm<Example>(OPTIONS);

function withExampleForm() {
  return (
    <ExampleForm.Provider defaultValue={DEFAULT_EXAMPLE}>
      <ExampleFormComponent />
    </ExampleForm.Provider>
  );
}

function ExampleFormComponent() {
  const form = useContext(ExampleForm.Context);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: 500,
        gap: 8,
      }}
    >
      <label htmlFor={form.text.name}>text</label>
      <input
        value={form.text.current}
        name={form.text.current}
        onChange={(event) => form.text.set(event.target.value)}
        id={form.text.name}
        autoComplete="off"
      />
      <label htmlFor={form.checkbox.name}>checkbox</label>
      <input
        id={form.checkbox.name}
        type="checkbox"
        checked={form.checkbox.current}
        onChange={(event) => form.checkbox.set(event.currentTarget.checked)}
      />
      <label htmlFor={form.color.name}>color</label>
      <input
        type="color"
        value={form.color.current}
        id={form.color.name}
        onChange={(event) => form.color.set(event.currentTarget.value)}
      />
      <label htmlFor={form.date.name}>date</label>
      <input
        type="date"
        value={form.date.current}
        id={form.date.name}
        onChange={(event) => form.date.set(event.currentTarget.value)}
      />
      <label htmlFor={form.datetimeLocal.name}>datetime-local</label>
      <input
        type="datetime-local"
        value={form.datetimeLocal.current}
        id={form.datetimeLocal.name}
        onChange={(event) => form.datetimeLocal.set(event.currentTarget.value)}
      />
      <label htmlFor={form.number.name}>number</label>
      <input
        type="number"
        value={form.number.current}
        id={form.number.name}
        onChange={(event) =>
          form.number.set(parseInt(event.currentTarget.value))
        }
      />
      <label htmlFor={form.range.name}>range</label>
      <input
        type="range"
        value={form.range.current}
        id={form.range.name}
        onChange={(event) =>
          form.range.set(parseInt(event.currentTarget.value))
        }
      />
      <label htmlFor="radio-number-0">radio (number)</label>
      {[0, 1, 2, 3].map((id: number) => (
        <div key={id}>
          <input
            type="radio"
            value={id}
            name={form.radioNumber.name}
            checked={form.radioNumber.current === id}
            id={`radio-number-${id}`}
            onChange={(event) =>
              form.radioNumber.set(parseInt(event.currentTarget.value))
            }
          />
          <label htmlFor={`radio-number-${id}`}>Number option {id}</label>
        </div>
      ))}
      <label htmlFor="radio-string-0">radio (number)</label>
      {['A', 'B', 'C', 'D'].map((id: string) => (
        <div key={id}>
          <input
            type="radio"
            value={id}
            name={form.radioString.name}
            checked={form.radioString.current === id}
            id={`radio-string-${id}`}
            onChange={(event) =>
              form.radioString.set(event.currentTarget.value)
            }
          />
          <label htmlFor={`radio-string-${id}`}>String option {id}</label>
        </div>
      ))}
      <label htmlFor={form.select.name}>select</label>
      <select
        name={form.select.name}
        id={form.select.name}
        value={form.select.current}
        onChange={(event) => form.select.set(event.currentTarget.value)}
      >
        <option value="" disabled></option>
        {['A', 'B', 'C', 'D'].map((id: string) => (
          <option key={id} value={id}>
            String option {id}
          </option>
        ))}
      </select>
      <button onClick={() => form.resetAll()}>Reset</button>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}

export const exampleForm = () => withExampleForm();
