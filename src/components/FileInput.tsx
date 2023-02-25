import { useCallback, useState } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { CloseIcon } from '../icons/CloseIcon';
import { FileIcon } from '../icons/FileIcon';
import { UploadIcon } from '../icons/UploadIcon';

interface InputProps {
  dropzone: DropzoneState;
}

interface HasFileProps {
  file?: File;
  removeFile: () => void;
}

export const FileInput = () => {
  const [file, setFile] = useState<File | null>(null);

  const removeFile = useCallback(() => {
    setFile(null);
  }, [file]);

  const onDrop = useCallback((files: File[]) => {
    setFile(files[0]);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  if (file) return <HasFile file={file} removeFile={removeFile} />;

  return <Input dropzone={dropzone} />;
};

const Input = ({ dropzone }: InputProps) => {
  const { getRootProps, getInputProps, isDragActive } = dropzone;

  return (
    <div
      {...getRootProps()}
      className={`w-1/2 h-full rounded-lg border-dashed border-4 hover:border-gray-500 bg-gray-700 hover:bg-gray-600 transition-all
      ${isDragActive ? 'border-blue-500' : 'border-gray-600'}`}
    >
      <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full h-full">
          <UploadIcon
            className={`w-10 h-10 mb-3 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
          />
          {isDragActive ? (
            <p className="font-bold text-lg text-blue-400">Solte para adicionar</p>
          ) : (
            <>
              <p className="mb-2 text-lg text-gray-400">
                <span className="font-bold">Clique para enviar</span> ou arraste até aqui
              </p>
              <p className="text-gray-400 text-sm">PDF</p>
            </>
          )}
        </div>
      </label>
      <input {...getInputProps()} className="hidden" />
    </div>
  );
};

const HasFile = ({ file, removeFile }: HasFileProps) => {
  return (
    <div className="w-1/2 h-full rounded-lg border-dashed border-4 border-gray-600 bg-gray-700 flex justify-center items-center">
      <div className="bg-white w-36 rounded-md shadow-md flex gap-3 items-center justify-center">
        <FileIcon className="w-5 h-5 my-4 ml-4" />
        <span className="text-sm text-gray-500 my-4">{file?.name}</span>
        <button type="button" onClick={removeFile} className="place-self-start mt-1 p-1">
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
