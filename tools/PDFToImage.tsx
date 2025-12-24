
import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import FileUploader from '../components/FileUploader';
import { Download, FileText, RefreshCw, Eye, X } from 'lucide-react';
import { generateOutputFileName, getFileBaseName } from '../utils/fileNameHelper';

// Setup worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFToImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setImages([]);
    }
  };

  const processPDF = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const imageUrls: string[] = [];

      // Limit for browser memory safety (e.g., first 50 pages)
      const pagesToProcess = Math.min(totalPages, 50);
      
      for (let i = 1; i <= pagesToProcess; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          imageUrls.push(canvas.toDataURL('image/png'));
        }
      }
      setImages(imageUrls);
    } catch (err) {
      console.error(err);
      alert('Error reading PDF. It might be protected or unsupported.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setImages([]);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader onFilesSelected={handleFiles} accept=".pdf" label="Select PDF to Extract Images" />
      ) : (
        <div className="space-y-8">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col items-center relative">
             <button 
              onClick={reset}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <FileText className="w-16 h-16 text-red-500 mb-4" />
            <h4 className="font-bold text-lg text-slate-800 text-center px-4">{file.name}</h4>
            <p className="text-sm text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>

          <div className="flex justify-center">
            {images.length === 0 ? (
              <button 
                onClick={processPDF}
                disabled={isProcessing}
                className="px-12 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 disabled:bg-slate-300 transition-all flex items-center shadow-lg shadow-blue-200"
              >
                {isProcessing ? <RefreshCw className="animate-spin mr-2" /> : null}
                {isProcessing ? 'Extracting Pages...' : 'Extract as Images'}
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-sm text-slate-500 mb-4 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100 font-medium">
                  {images.length} pages extracted
                </span>
                <button 
                  onClick={reset}
                  className="px-8 py-2 text-blue-600 font-semibold hover:underline"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((img, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden group shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-[3/4] overflow-hidden bg-slate-100 relative">
                    <img src={img} className="w-full h-full object-cover" alt={`Page ${idx + 1}`} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                       <a 
                        href={img} 
                        download={`${getFileBaseName(file.name)}-page-${idx + 1}.png`}
                        className="p-3 bg-white text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700">Page {idx + 1}</span>
                    <a 
                      href={img} 
                      download={`${getFileBaseName(file.name)}-page-${idx + 1}.png`}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Download PNG
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFToImage;
