import { useContext } from 'react';

import { createForm } from 'createForm';

export default { title: 'forms/LoginForm' };

type Login = {
  email: string;
  password: string;
  session: boolean;
};

const DEFAULT_LOGIN: Login = {
  email: '',
  password: '',
  session: false,
};

const OPTIONS: UseFormOptions<Login> = {
  validate: {
    email: (value) =>
      value.length === 0 ? 'Email cannot be empty' : undefined,
    password: (value) =>
      value.length === 0 ? 'Password cannot be empty' : undefined,
  },
};

const LoginForm = createForm<Login>(OPTIONS);

function withLoginForm() {
  return (
    <LoginForm.Provider defaultValue={DEFAULT_LOGIN}>
      <LoginFormComponent />
    </LoginForm.Provider>
  );
}

function ErrorLabel({
  field,
  children,
}: React.PropsWithChildren<{
  field: UseFormFields<Login>[keyof Login];
}>) {
  return (
    <label
      htmlFor={field.name}
      style={{ color: field.error ? 'red' : 'currentcolor' }}
    >
      {field.error ? <span>{field.error}</span> : <span>{children}</span>}
    </label>
  );
}

function LoginFormComponent() {
  const form = useContext(LoginForm.Context);

  console.log(JSON.stringify(form));

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', width: 500, gap: 8 }}
    >
      <ErrorLabel field={form.email}>Email</ErrorLabel>
      <input
        value={form.email.current}
        name={form.email.name}
        onChange={(event) => form.email.set(event.target.value)}
        id={form.email.name}
        autoComplete="off"
      />
      <ErrorLabel field={form.password}>Password</ErrorLabel>
      <input
        value={form.password.current}
        name={form.password.name}
        onChange={(event) => form.password.set(event.target.value)}
        type="password"
        id={form.password.name}
        autoComplete="off"
      />
      <label>
        <input
          id={form.session.name}
          name={form.session.name}
          type="checkbox"
          onChange={(event) => form.session.set(event.target.checked)}
          checked={form.session.current}
        />
        <label htmlFor={form.session.name}>Keep me logged in</label>
      </label>
      <button onClick={() => form.resetAll()}>Reset</button>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}

export const loginForm = () => withLoginForm();
