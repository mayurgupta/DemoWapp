/**
 * 
 */
package com.trucktrans.entity.web;


/**
 * @author mgupta
 *
 */
public class WTransCoQuotes {
	private int quoteId;
	private Long bookingId;
	private String companyName;
	private String truckType;
	private String priceEstimates;
	private String timeEstimates;
	private String remarks;
	private Long transComID;
	
	
	
	public int getQuoteId() {
		return quoteId;
	}
	public void setQuoteId(int quoteId) {
		this.quoteId = quoteId;
	}
	public Long getBookingId() {
		return bookingId;
	}
	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getTruckType() {
		return truckType;
	}
	public void setTruckType(String truckType) {
		this.truckType = truckType;
	}
	public String getPriceEstimates() {
		return priceEstimates;
	}
	public void setPriceEstimates(String priceEstimates) {
		this.priceEstimates = priceEstimates;
	}
	public String getTimeEstimates() {
		return timeEstimates;
	}
	public void setTimeEstimates(String timeEstimates) {
		this.timeEstimates = timeEstimates;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public Long getTransComID() {
		return transComID;
	}
	public void setTransComID(Long transComID) {
		this.transComID = transComID;
	}
	
	
}
