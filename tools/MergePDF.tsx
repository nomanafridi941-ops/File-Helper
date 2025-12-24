
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import FileUploader from '../components/FileUploader';
import { Download, RefreshCw, X, FileText } from 'lucide-react';
import { generateOutputFileName } from '../utils/fileNameHelper';

const MergePDF: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setResultUrl(null);
  };

  const mergeFiles = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const donorPdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(donorPdf, donorPdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert('Error merging PDFs. Please ensure they are not encrypted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <FileUploader onFilesSelected={handleFiles} accept=".pdf" multiple label="Select PDFs to Merge" />
      
      {files.length > 0 && (
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <h4 className="font-bold text-slate-700 mb-4 px-2">Files to combine:</h4>
            <div className="space-y-2">
              {files.map((file, i) => (
                <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-sm font-medium text-slate-700 truncate max-w-[200px] sm:max-w-md">{file.name}</span>
                  </div>
                  <button onClick={() => removeFile(i)} className="p-1 hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {!resultUrl ? (
              <button 
                onClick={mergeFiles}
                disabled={isProcessing || files.length < 2}
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 disabled:bg-slate-300 transition-all flex items-center justify-center shadow-lg shadow-blue-200"
              >
                {isProcessing ? <RefreshCw className="animate-spin mr-2" /> : null}
                {files.length < 2 ? 'Select at least 2 PDFs' : 'Merge Files Now'}
              </button>
            ) : (
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <a 
                  href={resultUrl} 
                  download={generateOutputFileName(files[0].name, 'pdf')}
                  className="flex-grow px-10 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Merged PDF
                </a>
                <button 
                  onClick={() => { setFiles([]); setResultUrl(null); }}
                  className="px-10 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MergePDF;
