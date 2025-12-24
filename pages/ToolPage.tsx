
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { TOOLS } from '../constants';
import { ToolType } from '../types';
import { ChevronRight, Shield, ArrowLeft } from 'lucide-react';
import { updateMetaTags } from '../utils/seoHelper';

// Image Tools
import ImageToPDF from '../tools/ImageToPDF';
import JPGToPNG from '../tools/JPGToPNG';
import PNGToJPG from '../tools/PNGToJPG';
import ImageCompressor from '../tools/ImageCompressor';
import ImageResizer from '../tools/ImageResizer';
import ImageCropper from '../tools/ImageCropper';
import WebPConverter from '../tools/WebPConverter';
import ImageWatermark from '../tools/ImageWatermark';
import ImageBackgroundRemover from '../tools/ImageBackgroundRemover';
import BatchImageConverter from '../tools/BatchImageConverter';

// PDF Tools
import PDFToImage from '../tools/PDFToImage';
import MergePDF from '../tools/MergePDF';
import PDFSplitter from '../tools/PDFSplitter';
import CompressPDF from '../tools/CompressPDF';
import PDFToWord from '../tools/PDFToWord';
import WordToPDF from '../tools/WordToPDF';
import PDFRotator from '../tools/PDFRotator';
import PDFPasswordProtect from '../tools/PDFPasswordProtect';
import PDFUnlock from '../tools/PDFUnlock';
import BatchPDFMerge from '../tools/BatchPDFMerge';
import PDFOCR from '../tools/PDFOCR';

// Utility Tools
import FileSizeAnalyzer from '../tools/FileSizeAnalyzer';
import FileRenamer from '../tools/FileRenamer';
import OCRImageToText from '../tools/OCRImageToText';
import ScanToPDF from '../tools/ScanToPDF';
import ZIPExtractor from '../tools/ZIPExtractor';

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = TOOLS.find(t => t.id === toolId);

  useEffect(() => {
    if (tool) {
      updateMetaTags(
        `${tool.title} - FileHelper.xyz | Free Online Tool`,
        tool.seoDesc
      );
    }
  }, [tool]);

  if (!tool) {
    return <Navigate to="/" replace />;
  }

  const renderTool = () => {
    switch (tool.id) {
      // Image Tools
      case ToolType.IMAGE_TO_PDF: return <ImageToPDF />;
      case ToolType.JPG_TO_PNG: return <JPGToPNG />;
      case ToolType.PNG_TO_JPG: return <PNGToJPG />;
      case ToolType.COMPRESS_IMAGE: return <ImageCompressor />;
      case ToolType.IMAGE_RESIZER: return <ImageResizer />;
      case ToolType.IMAGE_CROPPER: return <ImageCropper />;
      case ToolType.WEBP_CONVERTER: return <WebPConverter />;
      case ToolType.IMAGE_WATERMARK: return <ImageWatermark />;
      case ToolType.IMAGE_BG_REMOVER: return <ImageBackgroundRemover />;
      case ToolType.BATCH_IMAGE_CONVERTER: return <BatchImageConverter />;
      
      // PDF Tools
      case ToolType.PDF_TO_IMAGE: return <PDFToImage />;
      case ToolType.MERGE_PDF: return <MergePDF />;
      case ToolType.PDF_SPLITTER: return <PDFSplitter />;
      case ToolType.COMPRESS_PDF: return <CompressPDF />;
      case ToolType.PDF_TO_WORD: return <PDFToWord />;
      case ToolType.WORD_TO_PDF: return <WordToPDF />;
      case ToolType.PDF_ROTATOR: return <PDFRotator />;
      case ToolType.PDF_PASSWORD_PROTECT: return <PDFPasswordProtect />;
      case ToolType.PDF_UNLOCK: return <PDFUnlock />;
      case ToolType.BATCH_PDF_MERGE: return <BatchPDFMerge />;
      case ToolType.PDF_OCR: return <PDFOCR />;
      
      // Utility Tools
      case ToolType.ZIP_EXTRACTOR: return <ZIPExtractor />;
      case ToolType.FILE_RENAMER: return <FileRenamer />;
      case ToolType.FILE_SIZE_ANALYZER: return <FileSizeAnalyzer />;
      case ToolType.OCR_IMAGE_TO_TEXT: return <OCRImageToText />;
      case ToolType.SCAN_TO_PDF: return <ScanToPDF />;
      
      default: return <div className="p-8 text-center text-slate-600"><span className="text-slate-400 italic">Tool loading...</span></div>;
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20">
      {/* Tool Header */}
      <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 py-8">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-xs text-slate-400 dark:text-slate-500 mb-4">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-600 dark:text-slate-300 font-medium">{tool.title}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">{tool.title}</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{tool.shortDesc}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-4 py-2 rounded-xl border border-green-100 dark:border-green-800 flex items-center shadow-sm">
              <Shield className="w-4 h-4 mr-2" />
              100% Private Client-Side
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Tool Area */}
          <div className="lg:col-span-9 space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 md:p-10 shadow-sm border border-slate-200 dark:border-slate-700">
              {renderTool()}
            </div>

            {/* SEO Content Section */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 dark:text-slate-100">About {tool.title}</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-10 text-lg">
                {tool.seoDesc}
              </p>

              <h3 className="text-xl font-bold mb-6 dark:text-slate-100">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {tool.faqs.map((faq, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-600">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{faq.q}</h4>
                    <p className="text-slate-500 dark:text-slate-300 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center pt-8">
              <Link to="/" className="inline-flex items-center text-blue-600 font-semibold hover:underline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to all tools
              </Link>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Related Tools</h3>
              <ul className="space-y-3 text-sm">
                {TOOLS.filter(t => t.id !== tool.id && t.category === tool.category).slice(0, 6).map(t => (
                  <li key={t.id}>
                    <Link to={`/${t.id}`} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center transition-colors font-medium">
                      <ChevronRight className="w-3 h-3 mr-2 text-slate-300 dark:text-slate-600" />
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ad Placeholder */}
            <div className="sticky top-24">
              <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl h-[600px] flex flex-col items-center justify-center p-6 text-center">
                 <div className="w-full h-full border border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center">
                    <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest font-bold">Advertisement</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
