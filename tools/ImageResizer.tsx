
import React, { useState, useEffect } from 'react';
import FileUploader from '../components/FileUploader';
import { Download, RefreshCw, X, Maximize } from 'lucide-react';
import { generateOutputFileName } from '../utils/fileNameHelper';

const ImageResizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [originalDims, setOriginalDims] = useState({ w: 0, h: 0 });
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreview(url);
      
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setOriginalDims({ w: img.width, h: img.height });
        setDims({ w: img.width, h: img.height });
      };
      setResultUrl(null);
    }
  };

  const updateWidth = (w: number) => {
    if (maintainRatio && originalDims.w > 0) {
      const h = Math.round((w / originalDims.w) * originalDims.h);
      setDims({ w, h });
    } else {
      setDims({ ...dims, w });
    }
  };

  const updateHeight = (h: number) => {
    if (maintainRatio && originalDims.h > 0) {
      const w = Math.round((h / originalDims.h) * originalDims.w);
      setDims({ w, h });
    } else {
      setDims({ ...dims, h });
    }
  };

  const handleResize = async () => {
    if (!file || !preview) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = dims.w;
      canvas.height = dims.h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, dims.w, dims.h);
        setResultUrl(canvas.toDataURL(file.type));
      }
      setIsProcessing(false);
    };
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResultUrl(null);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader onFilesSelected={handleFiles} accept="image/*" label="Select Image to Resize" />
      ) : (
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 relative">
            <button onClick={reset} className="absolute top-4 right-4 text-slate-400"><X/></button>
            <img src={preview!} className="max-h-64 mx-auto rounded-xl shadow-sm" alt="Preview" />
          </div>

          {!resultUrl ? (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Width (px)</label>
                    <input 
                      type="number" 
                      value={dims.w} 
                      onChange={e => updateWidth(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Height (px)</label>
                    <input 
                      type="number" 
                      value={dims.h} 
                      onChange={e => updateHeight(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                    />
                  </div>
               </div>
               <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={maintainRatio} 
                    onChange={e => setMaintainRatio(e.target.checked)}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600 font-medium">Maintain aspect ratio</span>
               </label>
               <button 
                onClick={handleResize}
                disabled={isProcessing || dims.w <= 0 || dims.h <= 0}
                className="w-full py-4 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 transition-all flex items-center justify-center shadow-lg shadow-rose-100"
              >
                {isProcessing ? <RefreshCw className="animate-spin mr-2" /> : <Maximize className="w-5 h-5 mr-2" />}
                Resize Image
              </button>
            </div>
          ) : (
            <div className="space-y-4">
               <div className="bg-green-50 border border-green-100 p-6 rounded-3xl text-center">
                  <p className="text-green-800 font-bold mb-4">Resize Complete!</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href={resultUrl} 
                      download={file.name}
                      className="px-8 py-3 bg-green-600 text-white font-bold rounded-2xl flex items-center justify-center shadow-md"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resized
                    </a>
                    <button onClick={reset} className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl">New Resize</button>
                  </div>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
