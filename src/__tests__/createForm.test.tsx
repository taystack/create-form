import { act, fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useContext } from 'react';

import { createForm } from 'createForm';

type Login = {
  email: string;
  password: string;
  session: boolean;
};

const DEFAULT_LOGIN_VALUES: Login = {
  email: '',
  password: '',
  session: false,
};

describe('createForm', () => {
  test('default context - BlankForm', () => {
    const BlankForm = createForm<{}>();
    const { result } = renderHook(() => useContext(BlankForm.Context));
    expect(result.current.toJSON()).toEqual({});
    expect(result.current.toFormData()).toEqual(new FormData());
    expect(result.current.toURLSearchParams()).toEqual(new URLSearchParams());
    expect(() => {
      result.current.resetAll();
    }).not.toThrowError();
  });

  test('form.field.set', () => {
    const LoginForm = createForm<Login>();
    const { result } = renderHook(() => useContext(LoginForm.Context), {
      wrapper: LoginForm.Provider,
      initialProps: {
        defaultValue: DEFAULT_LOGIN_VALUES,
      },
    });

    act(() => {
      result.current.email.set('foo@bar.com');
      result.current.password.set('Password123');
      result.current.session.set(true);
    });
    expect(result.current.email.current).toEqual('foo@bar.com');
    expect(result.current.password.current).toEqual('Password123');
    expect(result.current.session.current).toBeTruthy();
  });

  test('options.validate', () => {
    const LoginForm = createForm<Login>({
      validate: {
        email: (value) =>
          value.length === 0 ? 'Email cannot be empty' : undefined,
        password: (value) =>
          value.length === 0 ? 'Password cannot be empty' : undefined,
      },
    });
    const { result } = renderHook(() => useContext(LoginForm.Context), {
      wrapper: LoginForm.Provider,
      initialProps: {
        defaultValue: {
          email: 'foo@gmail.com',
          password: 'password',
          session: false,
        },
      },
    });

    expect(result.current.email.error).toBeUndefined();
    expect(result.current.password.error).toBeUndefined();

    act(() => {
      result.current.email.set('');
      result.current.password.set('');
    });
    expect(result.current.email.error).toEqual('Email cannot be empty');
    expect(result.current.password.error).toEqual('Password cannot be empty');
  });

  test('form.field.setError', () => {
    const LoginForm = createForm<Login>();
    const { result } = renderHook(() => useContext(LoginForm.Context), {
      wrapper: LoginForm.Provider,
      initialProps: {
        defaultValue: {
          email: 'foo@gmail.com',
          password: 'password',
          session: false,
        },
      },
    });

    expect(result.current.email.error).toBeUndefined();
    expect(result.current.password.error).toBeUndefined();

    act(() => {
      result.current.email.setError('Invalid email');
      result.current.password.setError('Invalid password');
    });

    expect(result.current.email.error).toEqual('Invalid email');
    expect(result.current.password.error).toEqual('Invalid password');

    act(() => {
      result.current.email.setError();
      result.current.password.setError();
    });

    expect(result.current.email.error).toBeUndefined();
    expect(result.current.password.error).toBeUndefined();
  });

  test('form.field.reset', () => {
    const LoginForm = createForm<Login>();
    const { result } = renderHook(() => useContext(LoginForm.Context), {
      wrapper: LoginForm.Provider,
      initialProps: {
        defaultValue: DEFAULT_LOGIN_VALUES,
      },
    });

    act(() => {
      result.current.email.set('foo@bar.com');
      result.current.password.set('Password123');
      result.current.session.set(true);
    });

    act(() => {
      result.current.email.reset();
    });
    expect(result.current.email.current).toEqual(DEFAULT_LOGIN_VALUES.email);
  });

  test('form.resetAll', () => {
    const LoginForm = createForm<Login>();
    const { result } = renderHook(() => useContext(LoginForm.Context), {
      wrapper: LoginForm.Provider,
      initialProps: {
        defaultValue: DEFAULT_LOGIN_VALUES,
      },
    });

    act(() => {
      result.current.email.set('foo@bar.com');
      result.current.password.set('Password123');
      result.current.session.set(true);
    });

    act(() => {
      result.current.resetAll();
    });
    expect(result.current.toJSON()).toEqual(DEFAULT_LOGIN_VALUES);
  });

  test('form.field.handleFileEvent', () => {
    const FileForm = createForm<{ myField: string }>();
    function FileFormComponent({
      callback,
    }: {
      callback: (fileList: FileList | null) => void;
    }) {
      const { myField } = useContext(FileForm.Context);
      return (
        <>
          <input
            data-testid="myField"
            id={myField.name}
            onChange={myField.handleFileEvent}
          />
          <button onClick={() => callback(myField.getFiles())}>
            GET_FILES
          </button>
        </>
      );
    }
    const file = new File([new Blob(['MOCK_FILE_TEXT'])], 'text/plain');
    let userInput: FileList | null = null;
    const callback = (fileList: FileList | null) => {
      userInput = fileList;
    };
    const { getByTestId, getByText } = render(
      <FileFormComponent callback={callback} />,
      {
        wrapper: ({ children }) => (
          <FileForm.Provider defaultValue={{ myField: '' }}>
            {children}
          </FileForm.Provider>
        ),
      },
    );
    act(() => {
      fireEvent.change(getByTestId('myField'), {
        target: { files: [file], value: 'my_file.txt' },
      });
    });
    act(() => {
      fireEvent.click(getByText('GET_FILES'));
    });
    expect(userInput).toEqual([file]);
  });

  test('form.toJSON', () => {
    const LoginForm = createForm<Login>();
    const { result } = renderHook(() => useContext(LoginForm.Context), {
      wrapper: LoginForm.Provider,
      initialProps: {
        defaultValue: DEFAULT_LOGIN_VALUES,
      },
    });
    act(() => {
      result.current.email.set('foo@gmail.com');
      result.current.password.set('password');
    });
    const json = result.current.toJSON();
    expect(json).toEqual({
      email: 'foo@gmail.com',
      password: 'password',
      session: false,
    });
  });

  test('form.toFormData', () => {
    const LoginForm = createForm<Login>();
    const { result } = renderHook(() => useContext(LoginForm.Context), {
      wrapper: LoginForm.Provider,
      initialProps: {
        defaultValue: DEFAULT_LOGIN_VALUES,
      },
    });
    act(() => {
      result.current.email.set('foo@gmail.com');
      result.current.password.set('password');
    });
    const formData = result.current.toFormData();
    expect(formData.get('email')).toEqual('foo@gmail.com');
    expect(formData.get('password')).toEqual('password');
    expect(formData.get('session')).toEqual('false');
  });

  test('form.toURLSearchParams', () => {
    const LoginForm = createForm<Login>();
    const { result } = renderHook(() => useContext(LoginForm.Context), {
      wrapper: LoginForm.Provider,
      initialProps: {
        defaultValue: DEFAULT_LOGIN_VALUES,
      },
    });
    act(() => {
      result.current.email.set('foo@gmail.com');
      result.current.password.set('password');
    });
    const urlSearchParams = result.current.toURLSearchParams();
    expect(urlSearchParams.get('email')).toEqual('foo%40gmail.com');
    expect(urlSearchParams.get('password')).toEqual('password');
    expect(urlSearchParams.get('session')).toEqual('false');
    expect(urlSearchParams.toString()).toEqual(
      'email=foo%2540gmail.com&password=password&session=false',
    );
  });
});
