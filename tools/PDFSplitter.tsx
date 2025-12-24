
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import FileUploader from '../components/FileUploader';
import { Download, RefreshCw, X, Scissors, FileText } from 'lucide-react';
import { generateOutputFileName } from '../utils/fileNameHelper';

const PDFSplitter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setResultUrl(null);
      setProgress(0);
    }
  };

  const splitPDF = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(10);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const mainPdf = await PDFDocument.load(arrayBuffer);
      const pageCount = mainPdf.getPageCount();
      const zip = new JSZip();

      for (let i = 0; i < pageCount; i++) {
        const subPdf = await PDFDocument.create();
        const [copiedPage] = await subPdf.copyPages(mainPdf, [i]);
        subPdf.addPage(copiedPage);
        const bytes = await subPdf.save();
        zip.file(`page-${i + 1}.pdf`, bytes);
        
        setProgress(Math.round(10 + (i / pageCount) * 80));
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      setResultUrl(URL.createObjectURL(zipBlob));
      setProgress(100);
    } catch (err) {
      console.error(err);
      alert('Error splitting PDF. It may be encrypted or corrupted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResultUrl(null);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader onFilesSelected={handleFiles} accept=".pdf" label="Select PDF to Split" />
      ) : (
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 relative flex flex-col items-center">
             <button onClick={reset} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><X className="w-5 h-5"/></button>
             <div className="bg-red-100 p-4 rounded-2xl mb-4">
                <FileText className="w-8 h-8 text-red-600" />
             </div>
             <h4 className="font-bold text-slate-800 text-center">{file.name}</h4>
             <p className="text-xs text-slate-400 mt-1">{(file.size / (1024*1024)).toFixed(2)} MB</p>
          </div>

          {!resultUrl ? (
            <button 
              onClick={splitPDF}
              disabled={isProcessing}
              className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all flex items-center justify-center shadow-lg shadow-orange-100"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Splitting ({progress}%)...
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5 mr-2" />
                  Split Every Page
                </>
              )}
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <a 
                href={resultUrl} 
                download={generateOutputFileName(file.name, 'zip')}
                className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center shadow-lg shadow-green-100"
              >
                <Download className="w-5 h-5 mr-2" />
                Download All Pages (ZIP)
              </a>
              <button onClick={reset} className="text-sm font-semibold text-slate-500 hover:underline">Start New</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFSplitter;
