import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import { Download, RefreshCw, Crop } from 'lucide-react';
import { generateOutputFileName } from '../utils/fileNameHelper';

const ImageCropper: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className="space-y-6">
      <FileUploader onFilesSelected={handleFiles} accept="image/*" label="Select Image to Crop" />
      {preview && (
        <div className="max-w-xl mx-auto">
          <img src={preview} className="w-full rounded-xl border border-slate-200" alt="preview" />
          <p className="text-sm text-slate-500 mt-4 text-center">Advanced cropping tool coming soon</p>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
