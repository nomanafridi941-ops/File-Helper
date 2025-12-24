
import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import FileUploader from '../components/FileUploader';
import { Download, RefreshCw, X, RotateCw, FileText } from 'lucide-react';
import { generateOutputFileName } from '../utils/fileNameHelper';

const PDFRotator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previews, setPreviews] = useState<{ url: string, rotation: number }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFiles = async (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      setResultUrl(null);
      setIsProcessing(true);
      
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const pageCount = Math.min(pdf.numPages, 30); // Limit preview for performance
        const p: { url: string, rotation: number }[] = [];
        
        for (let i = 1; i <= pageCount; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement('canvas');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise;
          p.push({ url: canvas.toDataURL(), rotation: 0 });
        }
        setPreviews(p);
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const rotatePage = (index: number) => {
    const newPreviews = [...previews];
    newPreviews[index].rotation = (newPreviews[index].rotation + 90) % 360;
    setPreviews(newPreviews);
  };

  const rotateAll = () => {
    setPreviews(previews.map(p => ({ ...p, rotation: (p.rotation + 90) % 360 })));
  };

  const saveRotated = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      previews.forEach((p, i) => {
        if (pages[i] && p.rotation !== 0) {
          pages[i].setRotation(degrees(p.rotation));
        }
      });

      const bytes = await pdfDoc.save();
      setResultUrl(URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })));
    } catch (err) {
      console.error(err);
      alert('Error saving rotations.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreviews([]);
    setResultUrl(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader onFilesSelected={handleFiles} accept=".pdf" label="Select PDF to Rotate" />
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Adjust Page Orientations</h3>
            {!resultUrl && (
               <button onClick={rotateAll} className="flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
                <RotateCw className="w-4 h-4 mr-2" />
                Rotate All
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-h-[500px] overflow-y-auto p-2 border rounded-3xl">
            {previews.map((p, i) => (
              <div key={i} className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer" onClick={() => rotatePage(i)}>
                <div 
                  className="aspect-[3/4] bg-slate-50 transition-transform duration-300" 
                  style={{ transform: `rotate(${p.rotation}deg)` }}
                >
                  <img src={p.url} className="w-full h-full object-contain" alt={`Page ${i+1}`} />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center">
                  <RotateCw className="w-8 h-8 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-sm" />
                </div>
                <div className="p-2 bg-slate-50 text-[10px] font-bold text-slate-500 text-center">Page {i+1}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            {!resultUrl ? (
              <button 
                onClick={saveRotated}
                disabled={isProcessing}
                className="px-12 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg flex items-center"
              >
                {isProcessing ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <RotateCw className="w-5 h-5 mr-2" />}
                Apply Rotations & Save
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                 <a 
                  href={resultUrl} 
                  download={file.name}
                  className="px-10 py-4 bg-green-600 text-white font-bold rounded-2xl flex items-center justify-center shadow-md"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </a>
                <button onClick={reset} className="px-10 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl">New File</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFRotator;
