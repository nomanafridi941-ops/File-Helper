import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';

const BatchImageConverter: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <div className="space-y-6">
      <FileUploader onFilesSelected={handleFiles} accept="image/*" multiple label="Select Multiple Images" />
      {files.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-slate-500">{files.length} file(s) selected</p>
          <p className="text-xs text-slate-400 mt-2">Batch conversion tool coming soon</p>
        </div>
      )}
    </div>
  );
};

export default BatchImageConverter;
