import { useContext } from 'react';

import { createForm } from 'createForm';

export default { title: 'forms/FileListForm' };

type FileListForm = {
  myFileField: string;
};

const DEFAULT_LOGIN: FileListForm = {
  myFileField: '',
};

const OPTIONS: UseFormOptions<FileListForm> = {};

const FileListForm = createForm<FileListForm>(OPTIONS);

function withFileListForm() {
  return (
    <FileListForm.Provider defaultValue={DEFAULT_LOGIN}>
      <FileListFormComponent />
    </FileListForm.Provider>
  );
}

function FileListFormComponent() {
  const form = useContext(FileListForm.Context);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', width: 500, gap: 8 }}
    >
      <label htmlFor={form.myFileField.name}>Select files to upload</label>
      <input
        type="file"
        value={form.myFileField.current}
        name={form.myFileField.name}
        onChange={form.myFileField.handleFileEvent}
        id={form.myFileField.name}
        autoComplete="off"
      />
      <button onClick={() => form.resetAll()}>Reset</button>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}

export const fileListForm = () => withFileListForm();
