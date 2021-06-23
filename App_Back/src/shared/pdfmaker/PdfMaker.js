import PdfPrinter from 'pdfmake';
import fs from 'fs';

class PdfMaker {

    constructor() {
        this.fonts = {
            Roboto: {
                normal: './src/shared/pdfmaker/robot-fonts/Roboto-regular.ttf',
                bold: './src/shared/pdfmaker/robot-fonts/Roboto-Medium.ttf',
                italics: './src/shared/pdfmaker/robot-fonts/Roboto-Italic.ttf',
                bolditalics: './src/shared/pdfmaker/robot-fonts/Roboto-MediumItalic.ttf'
            }
        }
    }

    async generate(content, title) {
        
        const docDefinition = {
            content: [{
                layout: 'lightHorizontalLines', // optional
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto', 100],
                    body: content
                }
            }]
        }

        const printer = new PdfPrinter(this.fonts);
        const pdfDoc = printer.createPdfKitDocument(docDefinition);

        pdfDoc.pipe(fs.createWriteStream(title));
        pdfDoc.end();       
    }
}

export default PdfMaker;