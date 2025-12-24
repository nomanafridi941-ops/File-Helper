
export enum ToolType {
  // Image Tools
  IMAGE_TO_PDF = 'image-to-pdf',
  JPG_TO_PNG = 'jpg-to-png',
  PNG_TO_JPG = 'png-to-jpg',
  COMPRESS_IMAGE = 'compress-image',
  IMAGE_RESIZER = 'image-resizer',
  IMAGE_CROPPER = 'image-cropper',
  WEBP_CONVERTER = 'webp-converter',
  IMAGE_WATERMARK = 'image-watermark',
  IMAGE_BG_REMOVER = 'image-bg-remover',
  BATCH_IMAGE_CONVERTER = 'batch-image-converter',
  
  // PDF Tools
  PDF_TO_IMAGE = 'pdf-to-image',
  MERGE_PDF = 'merge-pdf',
  PDF_SPLITTER = 'pdf-splitter',
  COMPRESS_PDF = 'compress-pdf',
  PDF_TO_WORD = 'pdf-to-word',
  WORD_TO_PDF = 'word-to-pdf',
  PDF_ROTATOR = 'pdf-rotator',
  PDF_PASSWORD_PROTECT = 'pdf-password-protect',
  PDF_UNLOCK = 'pdf-unlock',
  BATCH_PDF_MERGE = 'batch-pdf-merge',
  PDF_OCR = 'pdf-ocr',
  
  // Utility Tools
  ZIP_EXTRACTOR = 'zip-extractor',
  FILE_RENAMER = 'file-renamer',
  FILE_SIZE_ANALYZER = 'file-size-analyzer',
  OCR_IMAGE_TO_TEXT = 'ocr-image-to-text',
  SCAN_TO_PDF = 'scan-to-pdf',
}

export type ToolCategory = 'PDF' | 'Image' | 'Utility';

export interface ToolMetadata {
  id: ToolType;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
  category: ToolCategory;
  seoDesc: string;
  faqs: { q: string; a: string }[];
}

export interface FileItem {
  id: string;
  file: File;
  preview?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  resultUrl?: string;
  resultName?: string;
}
