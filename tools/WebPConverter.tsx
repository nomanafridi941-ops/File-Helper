
import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import { Download, RefreshCw, X } from 'lucide-react';
import { generateOutputFileName } from '../utils/fileNameHelper';

const WebPConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
      setResultUrl(null);
    }
  };

  const convertToWebP = async () => {
    if (!file) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL('image/webp', 0.8);
        setResultUrl(url);
      }
      setIsProcessing(false);
    };
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResultUrl(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader onFilesSelected={handleFiles} accept="image/*" label="Select Image for WebP" />
      ) : (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 relative">
            <button onClick={reset} className="absolute top-6 right-6 p-1 bg-white border rounded-full text-slate-400 hover:text-red-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
            <img src={preview!} className="w-full rounded-xl shadow-sm" alt="Source" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!resultUrl ? (
              <button 
                onClick={convertToWebP}
                disabled={isProcessing}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg shadow-blue-200"
              >
                {isProcessing ? <RefreshCw className="animate-spin mr-2" /> : null}
                Convert to WebP
              </button>
            ) : (
              <>
                <a 
                  href={resultUrl} 
                  download={generateOutputFileName(file.name, 'webp')}
                  className="px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download WebP
                </a>
                <button 
                  onClick={reset}
                  className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200"
                >
                  New Image
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebPConverter;
