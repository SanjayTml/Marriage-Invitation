import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

export const handleCaptureClick = async (element) => {
    const canvas = await html2canvas(document.body);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  };