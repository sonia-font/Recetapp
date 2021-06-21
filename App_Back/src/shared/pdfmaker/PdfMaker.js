import PdfPrinter from 'pdfmake';
import fs from 'fs';

class PdfMaker {

    constructor() {
        this.fonts = {
            Roboto: {
                normal: '../src/compartidos/pdfs/robot-fonts/Roboto-Regular.ttf',
                bold: '../src/compartidos/pdfs/robot-fonts/Roboto-Medium.ttf',
                italics: '../src/compartidos/pdfs/robot-fonts/Roboto-Italic.ttf',
                bolditalics: '../src/compartidos/pdfs/robot-fonts/Roboto-MediumItalic.ttf'
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