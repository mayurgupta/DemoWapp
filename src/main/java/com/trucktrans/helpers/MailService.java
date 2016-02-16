/**
 * 
 */
package com.trucktrans.helpers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

/**
 * @author Mayur
 * 12:32:45 am, 13-Oct-2015
 *
 */

@Component
public class MailService {

	@Autowired
	private MailSender mailSender;

	/**
	 * {@inheritDoc}
	 */
	public void sendMail(String to, String subject, String body)
			throws MailException {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);
		mailSender.send(message);
	}

	/**
	 * {@inheritDoc}
	 */
	public void sendMail(String[] to, String[] cc, String[] bcc,
			String subject, String body) throws MailException {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setCc(cc);
		message.setBcc(bcc);
		message.setSubject(subject);
		message.setText(body);
		mailSender.send(message);
	}


}
