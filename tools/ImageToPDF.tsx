
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import FileUploader from '../components/FileUploader';
import { FileItem } from '../types';
import { Download, RefreshCw, FileText, X, AlertCircle } from 'lucide-react';
import { generateOutputFileName } from '../utils/fileNameHelper';

const ImageToPDF: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFiles = (newFiles: File[]) => {
    setErrorMessage(null);
    
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    const nonImageCount = newFiles.length - imageFiles.length;

    if (nonImageCount > 0) {
      setErrorMessage(`Skipped ${nonImageCount} file(s). Please only upload image formats like JPG, PNG, or WebP.`);
    }

    if (imageFiles.length === 0) return;

    const items = imageFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...items]);
    setResultUrl(null);
  };

  const generatePDF = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const pdf = new jsPDF();
      const firstFileName = files[0].file.name;
      
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        const imgData = await getBase64(item.file);
        
        // Get image dimensions
        const img = new Image();
        img.src = imgData;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => reject(new Error(`Failed to load image: ${item.file.name}`));
        });
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Scale image to fit page
        const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        const x = (pageWidth - w) / 2;
        const y = (pageHeight - h) / 2;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', x, y, w, h);
      }

      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setResultUrl(url);
      // Store the output filename
      sessionStorage.setItem('lastConvertedFileName', generateOutputFileName(firstFileName, 'pdf'));
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred while generating the PDF. Please try again with different images.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const reset = () => {
    setFiles([]);
    setResultUrl(null);
    setIsProcessing(false);
    setErrorMessage(null);
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (resultUrl) {
      const fileName = 'filehelper-images.pdf';
      const downloadUrl = `application/pdf:${fileName}:${resultUrl}`;
      e.dataTransfer.setData('DownloadURL', downloadUrl);
    }
  };

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="ml-auto text-amber-400 hover:text-amber-600 transition-colors">
             <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {files.length === 0 ? (
        <FileUploader onFilesSelected={handleFiles} accept="image/*" multiple label="Select Images to Convert" />
      ) : (
        <div className="space-y-6">
          {!resultUrl ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2">
              {files.map(f => (
                <div key={f.id} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={f.preview} className="w-full h-full object-cover" alt="preview" />
                  <button 
                    onClick={() => setFiles(prev => prev.filter(item => item.id !== f.id))}
                    className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-red-500 hover:text-white rounded-full transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => document.getElementById('add-more')?.click()}
                className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-50 transition-colors aspect-square"
              >
                <RefreshCw className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs font-medium text-slate-500">Add More</span>
                <input 
                  id="add-more" 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  onChange={e => e.target.files && handleFiles(Array.from(e.target.files))} 
                />
              </button>
            </div>
          ) : (
            <div 
              draggable="true"
              onDragStart={handleDragStart}
              className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:bg-slate-100 transition-all group"
            >
              <div className="bg-red-100 p-6 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <FileText className="w-12 h-12 text-red-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-lg">{generateOutputFileName(files[0].file.name, 'pdf')}</h4>
              <p className="text-sm text-slate-500 mb-8 text-center max-w-xs">
                Your PDF is ready! <br/> 
                <span className="hidden md:inline font-medium text-blue-600 text-xs">TIP: Drag this card to your desktop</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <a 
                  href={resultUrl} 
                  download={generateOutputFileName(files[0].file.name, 'pdf')}
                  className="px-8 py-3 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center shadow-lg shadow-green-100"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </a>
                <button 
                  onClick={reset}
                  className="px-8 py-3 bg-white text-slate-600 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Start New
                </button>
              </div>
            </div>
          )}

          {!resultUrl && (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={generatePDF}
                disabled={isProcessing}
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 disabled:bg-slate-300 transition-all flex items-center justify-center shadow-lg shadow-blue-100"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  'Convert to PDF'
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default ImageToPDF;
