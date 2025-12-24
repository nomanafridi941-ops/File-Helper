
import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import imageCompression from 'browser-image-compression';
import { Download, Minimize2, RefreshCw } from 'lucide-react';
import { generateOutputFileName } from '../utils/fileNameHelper';

const ImageCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState(0.8);

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setCompressedFile(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality,
      };
      const result = await imageCompression(file, options);
      setCompressedFile(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader onFilesSelected={handleFiles} accept="image/*" label="Select Image to Compress" />
      ) : (
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
              <h4 className="font-bold text-slate-800 mb-2">Original</h4>
              <p className="text-2xl font-black text-slate-400">{formatSize(file.size)}</p>
            </div>
            {compressedFile && (
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 text-center">
                <h4 className="font-bold text-blue-800 mb-2">Compressed</h4>
                <p className="text-2xl font-black text-blue-600">{formatSize(compressedFile.size)}</p>
                <p className="text-xs text-blue-400 mt-1">
                  Saved {Math.round((1 - compressedFile.size / file.size) * 100)}%
                </p>
              </div>
            )}
          </div>

          {!compressedFile && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <label className="block text-sm font-bold text-slate-700 mb-4">Compression Quality: {Math.round(quality * 100)}%</label>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05" 
                value={quality} 
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>More Compression</span>
                <span>Best Quality</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!compressedFile ? (
              <button 
                onClick={handleCompress}
                disabled={isProcessing}
                className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg shadow-blue-200"
              >
                {isProcessing ? <RefreshCw className="animate-spin mr-2" /> : <Minimize2 className="mr-2 w-5 h-5" />}
                Compress Now
              </button>
            ) : (
              <>
                <a 
                  href={URL.createObjectURL(compressedFile)} 
                  download={file.name}
                  className="px-10 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </a>
                <button 
                  onClick={() => { setFile(null); setCompressedFile(null); }}
                  className="px-10 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200"
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

export default ImageCompressor;
