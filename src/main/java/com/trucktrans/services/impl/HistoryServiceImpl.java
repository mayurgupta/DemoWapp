/**
 * 
 */
package com.trucktrans.services.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.ws.rs.core.UriInfo;

import org.apache.log4j.Logger;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.trucktrans.constants.BnQConstants;
import com.trucktrans.dao.ITransComQuotesDao;
import com.trucktrans.entity.dto.TransComQuotesDTO;
import com.trucktrans.services.IHistoryService;

/**
 * @author Mayur 
 * Time:11:44:30 pm,  27-Apr-2016
 * 
 */

@Service
@Transactional(readOnly = true) 
public class HistoryServiceImpl implements IHistoryService{

	private static final Logger LOGGER = Logger.getLogger(LogService.class);

	
	@Autowired
	ITransComQuotesDao transComQuotes;
	
	@Override
	public TransComQuotesDTO generateInvoice(Long quoteId, UriInfo paramUriInfo,ServletContext context, OutputStream paramAnonymousOutputStream) {
//		return transComQuotes.generateInvoice(quoteId);
		
		List<File> fileList = new ArrayList<File>();
		File outputFile = null;
		try {
			ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes();
			String sessionID = attr.getRequest().getSession().getId();
			if (null == sessionID || sessionID.isEmpty()) {
				throw new IllegalStateException("sessionId not found");
			}
			String line;
			StringBuilder sb = new StringBuilder();
			String url = 	paramUriInfo.getBaseUri().toString();
			Date date = new Date();
			Calendar calendar = GregorianCalendar.getInstance();
			calendar.setTime(date);
			String applicationPath = context.getRealPath("/");

			StringBuilder addressHTMLFile = new StringBuilder();
			addressHTMLFile.append(url.replace("api/", "")).append("pdfexp.html?");

			StringBuilder addressParameters = new StringBuilder();
			/*if (quoteId != 0L) {
				addressParameters
						.append(BnQConstants.AND_SIGN.getValue())
						.append(BnQConstants.QUOTEID.getValue())
						.append(quoteId.toString());

			}*/
			
			// To Generate multiple PDFs
			String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss")
					.format(Calendar.getInstance().getTime());
			outputFile = new File(sessionID.concat("_").concat(timeStamp)
					.concat(".pdf"));

			StringBuilder address = new StringBuilder();
			address.append(addressHTMLFile.toString());

			address.append(addressParameters.toString());
			address.append(BnQConstants.ADDRESS_EXPORT.getValue());
			String cPath = context.getContextPath();

			if (cPath.equalsIgnoreCase("") || cPath.isEmpty()) {
				cPath = "/";
			}
			Map<String, Object> mymap=new LinkedHashMap<String, Object>();
			mymap.put("njk", 2);
			mymap.put("jhgj", 3);
			mymap.put("werw", 4);
			mymap.put("hyju", 5);
			mymap.put("ryr", 6);
			mymap.put("wser", "gfxsdf");
			mymap.put("sd", "fsdf");
			ProcessBuilder builder = new ProcessBuilder(
					applicationPath
							.concat("WEB-INF\\classes\\resources\\phantomjs.exe"),
					applicationPath
							.concat("WEB-INF\\classes\\resources\\pdfexport.js"),
					address.toString(), outputFile.getAbsolutePath(),
					sessionID, paramUriInfo.getBaseUri().getHost(), cPath,mymap.toString());// send the parameters here ....... inside mymap

			builder.redirectErrorStream(true);
			Process p = builder.start();
			BufferedReader br1 = new BufferedReader(new InputStreamReader(p.getInputStream()));
			while ((line = br1.readLine()) != null) {
				sb.append(line);
			}
			br1.close();
			int exitStatus = p.waitFor();
			if (exitStatus != 0) {
				throw new Exception("unable to execute : " + sb.toString());
			}
			fileList.add(outputFile);
			
			if (fileList != null || !fileList.isEmpty()) {
				downloadPDF(fileList, paramAnonymousOutputStream);
			}
		} catch (Exception localException) {
			LOGGER.error("Error occurred while generating PDF file",
					localException);
		} finally {
			if (outputFile != null) {
				outputFile.delete();
			}
			if ((fileList != null) && (!fileList.isEmpty())) {
				for (File pdfFile : fileList) {
					pdfFile.delete();
				}
			}
			if (paramAnonymousOutputStream != null) {
				try {
					paramAnonymousOutputStream.flush();
					paramAnonymousOutputStream.close();
				} catch (IOException localIOException3) {
					LOGGER.error("Error occurred while closing output stream",
							localIOException3);
				}
			}
		}
		return null;
	}
	
	
	private static final void downloadPDF(List<File> fileList,
			OutputStream paramOutputStream) throws FileNotFoundException {

		PDFMergerUtility pdfMergeUtil = new PDFMergerUtility();
		for (File file : fileList) {
			pdfMergeUtil.addSource(file);
		}
		pdfMergeUtil.setDestinationStream(paramOutputStream);
		try {
			pdfMergeUtil.mergeDocuments(null);
		} catch (Exception e) {
			LOGGER.error("Error occurred while downloading PDF file", e);
		}
	}


	@Override
	public Object getQuotes(Long userId) {
		return transComQuotes.getCategorisedQuotes(userId);
	}
	
	

}
