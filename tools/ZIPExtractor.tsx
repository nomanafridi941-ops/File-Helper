import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import { Download, Archive } from 'lucide-react';
import JSZip from 'jszip';

const ZIPExtractor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedFiles, setExtractedFiles] = useState<Array<{ name: string; size: number }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setExtractedFiles([]);
    }
  };

  const extractZip = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const zip = new JSZip();
      const loaded = await zip.loadAsync(file);
      const files: Array<{ name: string; size: number }> = [];

      loaded.forEach((relativePath, zipEntry) => {
        if (!zipEntry.dir) {
          files.push({ name: relativePath, size: 0 });
        }
      });

      setExtractedFiles(files);
    } catch (error) {
      console.error(error);
      alert('Error extracting ZIP file');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <FileUploader onFilesSelected={handleFiles} accept=".zip" label="Select ZIP File" />
      {file && (
        <>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <Archive className="w-5 h-5 text-slate-600" />
              <h4 className="font-bold text-slate-800">{file.name}</h4>
            </div>
            <p className="text-xs text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>

          {extractedFiles.length === 0 ? (
            <button 
              onClick={extractZip}
              disabled={isProcessing}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              {isProcessing ? 'Extracting...' : 'Extract Files'}
            </button>
          ) : (
            <div>
              <p className="text-sm font-bold text-slate-700 mb-4">Files in archive ({extractedFiles.length})</p>
              <div className="space-y-2">
                {extractedFiles.map((f, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600">
                    {f.name}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4 text-center">Full extraction tool coming soon</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ZIPExtractor;
