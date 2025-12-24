import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';

const CompressPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFiles = (files: File[]) => {
    if (files.length > 0) setFile(files[0]);
  };

  return (
    <div className="space-y-6">
      <FileUploader onFilesSelected={handleFiles} accept=".pdf" label="Select PDF to Compress" />
      {file && <p className="text-sm text-slate-500 text-center">PDF compression tool coming soon</p>}
    </div>
  );
};

export default CompressPDF;
