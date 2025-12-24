
import React from 'react';
import { 
  FileImage, 
  FileText, 
  Image as ImageIcon, 
  Minimize2, 
  PlusSquare, 
  RefreshCw, 
  Zap,
  Layers,
  Maximize,
  Scissors,
  RotateCw,
  Archive,
  Crop,
  Droplet,
  Wand2,
  Lock,
  Unlock,
  Eye,
  BookOpen,
  FileJson,
  Loader
} from 'lucide-react';
import { ToolType, ToolMetadata } from './types';

export const TOOLS: ToolMetadata[] = [
  // IMAGE TOOLS
  {
    id: ToolType.IMAGE_TO_PDF,
    title: 'Image to PDF',
    shortDesc: 'Convert images to high-quality PDF files.',
    icon: <FileImage className="w-8 h-8 text-blue-600" />,
    category: 'Image',
    seoDesc: 'Easily convert your images (JPG, PNG, WebP) to professional PDF documents right in your browser. All processing happens locally for maximum privacy.',
    faqs: [
      { q: "Is it safe to use?", a: "Yes, your files never leave your computer." },
      { q: "Can I convert multiple images?", a: "Yes, they will be merged into a single PDF." }
    ]
  },
  {
    id: ToolType.JPG_TO_PNG,
    title: 'JPG to PNG',
    shortDesc: 'Convert JPG images to PNG format.',
    icon: <ImageIcon className="w-8 h-8 text-green-600" />,
    category: 'Image',
    seoDesc: 'Quickly change your JPG images to PNG format. Ideal for cases where transparency or lossless compression is required.',
    faqs: [
      { q: "Does this remove backgrounds?", a: "No, it just changes the file format." }
    ]
  },
  {
    id: ToolType.PNG_TO_JPG,
    title: 'PNG to JPG',
    shortDesc: 'Convert PNGs to optimized JPG images.',
    icon: <Layers className="w-8 h-8 text-purple-600" />,
    category: 'Image',
    seoDesc: 'Convert PNG images to JPG quickly. Ideal for reducing file size when transparency is not needed.',
    faqs: [
      { q: "Will I lose quality?", a: "We use high-quality JPG settings to minimize visible loss." }
    ]
  },
  {
    id: ToolType.COMPRESS_IMAGE,
    title: 'Compress Image',
    shortDesc: 'Reduce image file size with smart compression.',
    icon: <Minimize2 className="w-8 h-8 text-amber-600" />,
    category: 'Image',
    seoDesc: 'Optimize your images for web use. Our smart compression reduces file size significantly while maintaining excellent visual fidelity.',
    faqs: [
      { q: "How much can I reduce?", a: "Typically 50-80% reduction without noticeable quality loss." }
    ]
  },
  {
    id: ToolType.IMAGE_RESIZER,
    title: 'Image Resizer',
    shortDesc: 'Change dimensions of your images quickly.',
    icon: <Maximize className="w-8 h-8 text-rose-600" />,
    category: 'Image',
    seoDesc: 'Resize your images by pixel dimensions or percentage. Perfect for meeting specific upload requirements or scaling down large photos.',
    faqs: [
      { q: "Can I resize multiple images?", a: "Currently, we support resizing one image at a time for precision." }
    ]
  },
  {
    id: ToolType.IMAGE_CROPPER,
    title: 'Image Cropper',
    shortDesc: 'Crop and trim your images precisely.',
    icon: <Crop className="w-8 h-8 text-teal-600" />,
    category: 'Image',
    seoDesc: 'Crop images to exact dimensions with an interactive preview. Perfect for creating thumbnails or removing unwanted parts of your photos.',
    faqs: [
      { q: "Can I set custom aspect ratios?", a: "Yes, choose from presets or define your own aspect ratio." }
    ]
  },
  {
    id: ToolType.WEBP_CONVERTER,
    title: 'WebP Converter',
    shortDesc: 'Convert any image to modern WebP format.',
    icon: <Zap className="w-8 h-8 text-cyan-600" />,
    category: 'Image',
    seoDesc: 'WebP is the modern image format for the web. Speed up your website and improve SEO with high-quality, low file size images.',
    faqs: [
      { q: "Is WebP better than JPG?", a: "Yes, it typically offers 25-35% better compression at similar quality." }
    ]
  },
  {
    id: ToolType.IMAGE_WATERMARK,
    title: 'Image Watermark',
    shortDesc: 'Add text or image watermarks to protect your work.',
    icon: <Droplet className="w-8 h-8 text-indigo-600" />,
    category: 'Image',
    seoDesc: 'Protect your images by adding custom text or image watermarks. Control opacity, position, and size for professional results.',
    faqs: [
      { q: "Can I add multiple watermarks?", a: "Yes, layer text and image watermarks together." }
    ]
  },
  {
    id: ToolType.IMAGE_BG_REMOVER,
    title: 'Background Remover',
    shortDesc: 'Remove backgrounds from images automatically.',
    icon: <Wand2 className="w-8 h-8 text-pink-600" />,
    category: 'Image',
    seoDesc: 'Remove image backgrounds instantly using AI. Perfect for product photos, portraits, and creating transparent PNGs.',
    faqs: [
      { q: "Does it preserve the subject?", a: "Yes, our AI carefully preserves edges and details." }
    ]
  },
  {
    id: ToolType.BATCH_IMAGE_CONVERTER,
    title: 'Batch Image Converter',
    shortDesc: 'Convert multiple images to different formats at once.',
    icon: <RefreshCw className="w-8 h-8 text-orange-600" />,
    category: 'Image',
    seoDesc: 'Convert entire folders of images between JPG, PNG, WebP, and other formats in one click. Save hours of manual work.',
    faqs: [
      { q: "How many images can I convert?", a: "There is no hard limit, but we recommend batches under 50 images for best performance." }
    ]
  },

  // PDF TOOLS
  {
    id: ToolType.PDF_TO_IMAGE,
    title: 'PDF to Image',
    shortDesc: 'Extract pages from PDF as JPG or PNG images.',
    icon: <FileText className="w-8 h-8 text-red-600" />,
    category: 'PDF',
    seoDesc: 'Convert PDF pages into high-resolution JPG or PNG images. Perfect for extracting slides or specific pages from large documents.',
    faqs: [
      { q: "What formats are supported?", a: "Currently, you can extract pages as PNG or JPEG files." },
      { q: "Is there a page limit?", a: "We process up to 50 pages at once for browser stability." }
    ]
  },
  {
    id: ToolType.MERGE_PDF,
    title: 'Merge PDF',
    shortDesc: 'Combine multiple PDF files into one.',
    icon: <PlusSquare className="w-8 h-8 text-indigo-600" />,
    category: 'PDF',
    seoDesc: 'Join multiple PDF documents into a single file. Drag, drop, and arrange them in the order you need.',
    faqs: [
      { q: "Can I merge password-protected PDFs?", a: "No, please unlock them first." }
    ]
  },
  {
    id: ToolType.PDF_SPLITTER,
    title: 'Split PDF',
    shortDesc: 'Separate a PDF into individual pages.',
    icon: <Scissors className="w-8 h-8 text-orange-600" />,
    category: 'PDF',
    seoDesc: 'Split a large PDF into smaller, more manageable documents. Choose to extract all pages or a specific range.',
    faqs: [
      { q: "How do I download the split pages?", a: "The tool generates a ZIP file containing all your split pages." }
    ]
  },
  {
    id: ToolType.COMPRESS_PDF,
    title: 'Compress PDF',
    shortDesc: 'Reduce PDF file size without losing quality.',
    icon: <Minimize2 className="w-8 h-8 text-amber-600" />,
    category: 'PDF',
    seoDesc: 'Shrink large PDF files for easier sharing and storage. Our compression algorithm preserves document quality.',
    faqs: [
      { q: "How much smaller will my PDF be?", a: "Typically 30-60% reduction depending on the original file." }
    ]
  },
  {
    id: ToolType.PDF_TO_WORD,
    title: 'PDF to Word',
    shortDesc: 'Convert PDF to editable Word documents.',
    icon: <FileText className="w-8 h-8 text-blue-600" />,
    category: 'PDF',
    seoDesc: 'Transform your PDF files into editable Microsoft Word (.docx) documents. Perfect for recovering lost source files.',
    faqs: [
      { q: "Is the formatting preserved?", a: "We preserve layouts and formatting to the best extent possible." }
    ]
  },
  {
    id: ToolType.WORD_TO_PDF,
    title: 'Word to PDF',
    shortDesc: 'Convert Word documents to professional PDF.',
    icon: <FileImage className="w-8 h-8 text-purple-600" />,
    category: 'PDF',
    seoDesc: 'Convert your .docx, .doc, and .odt files to PDF with perfect formatting. Share your documents confidently.',
    faqs: [
      { q: "What Word formats are supported?", a: "We support .docx, .doc, and .odt files." }
    ]
  },
  {
    id: ToolType.PDF_ROTATOR,
    title: 'PDF Rotator',
    shortDesc: 'Fix the orientation of your PDF pages.',
    icon: <RotateCw className="w-8 h-8 text-emerald-600" />,
    category: 'PDF',
    seoDesc: 'Upside down or sideways PDF? Rotate individual pages or the entire document to the correct orientation in seconds.',
    faqs: [
      { q: "Can I rotate just one page?", a: "Yes, our interface allows per-page rotation control." }
    ]
  },
  {
    id: ToolType.PDF_PASSWORD_PROTECT,
    title: 'Password Protect PDF',
    shortDesc: 'Add password protection to your PDFs.',
    icon: <Lock className="w-8 h-8 text-red-600" />,
    category: 'PDF',
    seoDesc: 'Secure your sensitive PDF documents with strong password protection. Prevent unauthorized access and copying.',
    faqs: [
      { q: "How strong is the encryption?", a: "We use industry-standard 256-bit AES encryption." }
    ]
  },
  {
    id: ToolType.PDF_UNLOCK,
    title: 'Unlock PDF',
    shortDesc: 'Remove password protection from PDFs.',
    icon: <Unlock className="w-8 h-8 text-green-600" />,
    category: 'PDF',
    seoDesc: 'Remove password restrictions from locked PDF files. Regain full access to your documents.',
    faqs: [
      { q: "Can I unlock any PDF?", a: "Yes, as long as you have the correct password." }
    ]
  },
  {
    id: ToolType.BATCH_PDF_MERGE,
    title: 'Batch PDF Merge',
    shortDesc: 'Merge multiple PDF batches automatically.',
    icon: <PlusSquare className="w-8 h-8 text-blue-600" />,
    category: 'PDF',
    seoDesc: 'Process and merge large batches of PDF documents at once. Ideal for combining reports, invoices, or contracts.',
    faqs: [
      { q: "Is there a limit to batch size?", a: "We handle batches of 100+ PDFs efficiently." }
    ]
  },
  {
    id: ToolType.PDF_OCR,
    title: 'PDF OCR',
    shortDesc: 'Convert scanned PDFs to searchable text.',
    icon: <Eye className="w-8 h-8 text-slate-600" />,
    category: 'PDF',
    seoDesc: 'Transform scanned PDFs into searchable, selectable text using advanced OCR technology. Perfect for archiving documents.',
    faqs: [
      { q: "What languages does OCR support?", a: "We support 25+ languages including English, Spanish, French, German, Chinese, and more." }
    ]
  },

  // UTILITY TOOLS
  {
    id: ToolType.ZIP_EXTRACTOR,
    title: 'ZIP Extractor',
    shortDesc: 'Unzip and extract files directly in browser.',
    icon: <Archive className="w-8 h-8 text-slate-600" />,
    category: 'Utility',
    seoDesc: 'Extract files from ZIP archives without installing any software. Super fast and works entirely offline.',
    faqs: [
      { q: "Does it work with large ZIPs?", a: "Yes, but browser memory limits apply. Files under 100MB work best." }
    ]
  },
  {
    id: ToolType.FILE_RENAMER,
    title: 'File Renamer',
    shortDesc: 'Bulk rename files with advanced patterns.',
    icon: <FileJson className="w-8 h-8 text-yellow-600" />,
    category: 'Utility',
    seoDesc: 'Rename multiple files at once using powerful pattern matching and regular expressions. Save time on file organization.',
    faqs: [
      { q: "Can I use regular expressions?", a: "Yes, our tool supports full regex patterns for advanced renaming." }
    ]
  },
  {
    id: ToolType.FILE_SIZE_ANALYZER,
    title: 'File Size Analyzer',
    shortDesc: 'Analyze and visualize file storage usage.',
    icon: <Eye className="w-8 h-8 text-cyan-600" />,
    category: 'Utility',
    seoDesc: 'See exactly which files and folders are consuming disk space. Interactive charts help you find storage hogs.',
    faqs: [
      { q: "Can I see hidden files?", a: "Yes, toggle the option to include hidden files in your analysis." }
    ]
  },
  {
    id: ToolType.OCR_IMAGE_TO_TEXT,
    title: 'OCR Image to Text',
    shortDesc: 'Extract text from images using AI.',
    icon: <BookOpen className="w-8 h-8 text-teal-600" />,
    category: 'Utility',
    seoDesc: 'Convert images containing text into editable digital text. Perfect for digitizing documents, receipts, and screenshots.',
    faqs: [
      { q: "How accurate is the text extraction?", a: "For clear images, accuracy typically exceeds 95% for common languages." }
    ]
  },
  {
    id: ToolType.SCAN_TO_PDF,
    title: 'Scan to PDF',
    shortDesc: 'Convert scanned documents into clean PDFs.',
    icon: <Loader className="w-8 h-8 text-red-600" />,
    category: 'Utility',
    seoDesc: 'Turn phone photos or scanned documents into professional PDFs. Automatic edge detection and perspective correction included.',
    faqs: [
      { q: "Does it straighten tilted documents?", a: "Yes, our algorithm automatically detects and corrects page angles." }
    ]
  }
];
