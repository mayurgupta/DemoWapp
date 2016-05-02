/**
 * 
 */
package com.trucktrans.dao.impl;

/**
 * @author mgupta
 *
 */
import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
 
public class Simple {
 
    public static void main (String[] args) throws Exception {
        String outputFileName = "Simple.pdf";
        if (args.length > 0)
            outputFileName = args[0];
 
        // Create a document and add a page to it
        PDDocument document = new PDDocument();
        PDPage page2 = new PDPage(PDRectangle.A4);
        PDRectangle rect = page2.getMediaBox();
        document.addPage(page2);
        PDPageContentStream cos = new PDPageContentStream(document, page2);
        // add two lines of different widths
        cos.addRect(20, 20, 550, 800);
        cos.addRect(23, 23, 544, 794);
        
        // The Heading of the page 
        
        //setting the font
        int line = 0;
        PDFont fontPlain = PDType1Font.COURIER_BOLD;
        cos.beginText();
        cos.setFont(fontPlain, 42);
        cos.newLineAtOffset(23+13, rect.getHeight() - 138*(++line));
        cos.showText("TruckZOO.com");
        cos.endText();
        
        
        //Now set the header Line
        cos.setLineWidth(1);
        cos.moveTo(23+7, 800-100);
        cos.lineTo((544+23)-7, 800-100);
        cos.closeAndStroke();
        cos.closeAndStroke();

        
        
        PDFont font = PDType1Font.HELVETICA_BOLD; // Or whatever font you want.
        int fontSize = 16; // Or whatever font size you want.
        int paragraphWidth = 200;
        String text = "test --------------------------------------------------------------text";
        cos.beginText();
        int start = 0;
        int end = 0;
        int height = 10;
        for ( int i : possibleWrapPoints(text) ) {
            float width = font.getStringWidth(text.substring(start,i)) / 1000 * fontSize;
            if ( start < end && width > paragraphWidth ) {
                // Draw partial text and increase height
                cos.moveTextPositionByAmount(10 , height);
                cos.drawString(text.substring(start,end));
                height += font.getFontDescriptor().getFontBoundingBox().getHeight() / 1000 * fontSize;
                start = end;
            }
            end = i;
        }
        // Last piece of text
        cos.moveTextPositionByAmount(10 , height);
        cos.drawString(text.substring(start));        
        cos.endText();        
        
        // add an image
        try {
            PDImageXObject ximage = PDImageXObject.createFromFile("Simple.jpg", document);
            float scale = 0.5f; // alter this value to set the image size
            cos.drawImage(ximage, 100, 400, ximage.getWidth()*scale, ximage.getHeight()*scale);
        } catch (IOException ioex) {
            System.out.println("No image for you");
        }
 
        // close the content stream for page 2
        cos.close();
 
        // Save the results and ensure that the document is properly closed:
        document.save(outputFileName);
        document.close();
    }
    
    static int[] possibleWrapPoints(String text) {
        String[] split = text.split("(?<=\\W)");
        int[] ret = new int[split.length];
        ret[0] = split[0].length();
        for ( int i = 1 ; i < split.length ; i++ )
            ret[i] = ret[i-1] + split[i].length();
        return ret;
    }
}