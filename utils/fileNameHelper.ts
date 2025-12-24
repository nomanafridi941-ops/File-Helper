/**
 * Extract the base name from a file (without extension)
 * Example: "document.pdf" → "document"
 */
export const getFileBaseName = (fileName: string): string => {
  return fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
};

/**
 * Generate output filename with original name but new extension
 * Example: ("document.pdf", "jpg") → "document.jpg"
 */
export const generateOutputFileName = (originalFileName: string, newExtension: string): string => {
  const baseName = getFileBaseName(originalFileName);
  const extension = newExtension.startsWith('.') ? newExtension : `.${newExtension}`;
  return baseName + extension;
};

/**
 * Get file extension from filename
 * Example: "document.pdf" → "pdf"
 */
export const getFileExtension = (fileName: string): string => {
  return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
};
