
package com.truckzoo.test.pdf;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.io.IOUtils;

public class Sendhtml {
   public static void main(String[] args) throws FileNotFoundException, IOException {
      // Recipient's email ID needs to be mentioned.
      String to = "mayur.gupta@saama.com";

      // Sender's email ID needs to be mentioned
      String from = "trucksindian@gmail.com";
      final String username = "trucksindian@gmail.com";//change accordingly
      final String password = "MVK@2015India";//change accordingly

      // Assuming you are sending email through relay.jangosmtp.net
      String host = "smtp.gmail.com";

      Properties props = new Properties();
      props.put("mail.smtp.auth", "true");
      props.put("mail.smtp.starttls.enable", "true");
      props.put("mail.smtp.host", host);
      props.put("mail.smtp.port", "587");

      // Get the Session object.
      Session session = Session.getInstance(props,
         new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
               return new PasswordAuthentication(username, password);
            }
	});

      try {
            // Create a default MimeMessage object.
            Message message = new MimeMessage(session);

   	   // Set From: header field of the header.
	   message.setFrom(new InternetAddress(from));

	   // Set To: header field of the header.
	   message.setRecipients(Message.RecipientType.TO,
              InternetAddress.parse(to));

	   // Set Subject: header field
	   message.setSubject("Testingggjhg Subject");

	   // Send the actual HTML message, as big as you like
	   /*message.setContent(
              "<h1>This is actual message embedded in HTML tags</h1>",
             "text/html");*/

	   StringWriter writer = new StringWriter();
	   IOUtils.copy(new FileInputStream(new File("pdfexp.html")), writer);
	    
	   message.setContent(writer.toString(), "text/html; charset=utf-8");
	   
	   // Send message
	   Transport.send(message);

	   System.out.println("Sent message successfully....");

      } catch (MessagingException e) {
	   e.printStackTrace();
	   throw new RuntimeException(e);
      }
   }
}