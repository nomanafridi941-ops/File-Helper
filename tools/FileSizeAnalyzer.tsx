import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';

const FileSizeAnalyzer: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <div className="space-y-6">
      <FileUploader onFilesSelected={handleFiles} multiple label="Select Files to Analyze" />
      {files.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-slate-500">{files.length} file(s) selected</p>
          <p className="text-xs text-slate-400 mt-2">File size analyzer coming soon</p>
        </div>
      )}
    </div>
  );
};

export default FileSizeAnalyzer;
