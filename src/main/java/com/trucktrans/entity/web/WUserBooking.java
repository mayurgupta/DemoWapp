/**
 * 
 */
package com.trucktrans.entity.web;

import java.util.Date;

/**
 * @author Mayur
 * 10:42:21 pm, 27-Oct-2015
 *
 */
public class WUserBooking {
	
	
	private String Source;
	private String destination;
	private String sourceState;
	private String sourcePlace;
	private String SourceAddress;
	private String destinationState;
	private String destinationPlace;
	private String destinationAddress;
	private Date dateOfRequest;
	private String truckType;
	private Boolean partialLoadFlag;
	private String remarks;
	private String name;
	private String email;

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSourceState() {
		return sourceState;
	}
	public void setSourceState(String sourceState) {
		this.sourceState = sourceState;
	}
	public String getSourcePlace() {
		return sourcePlace;
	}
	public void setSourcePlace(String sourcePlace) {
		this.sourcePlace = sourcePlace;
	}
	public String getDestinationState() {
		return destinationState;
	}
	public void setDestinationState(String destinationState) {
		this.destinationState = destinationState;
	}
	public String getDestinationPlace() {
		return destinationPlace;
	}
	public void setDestinationPlace(String destinationPlace) {
		this.destinationPlace = destinationPlace;
	}
	public String getSourceAddress() {
		return SourceAddress;
	}
	public void setSourceAddress(String sourceAddress) {
		SourceAddress = sourceAddress;
	}
	public String getDestinationAddress() {
		return destinationAddress;
	}
	public void setDestinationAddress(String destinationAddress) {
		this.destinationAddress = destinationAddress;
	}
	public String getSource() {
		return Source;
	}
	public void setSource(String source) {
		Source = source;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public Date getDateOfRequest() {
		return dateOfRequest;
	}
	public void setDateOfRequest(Date dateOfRequest) {
		this.dateOfRequest = dateOfRequest;
	}
	public String getTruckType() {
		return truckType;
	}
	public void setTruckType(String truckType) {
		this.truckType = truckType;
	}
	public Boolean getPartialLoadFlag() {
		return partialLoadFlag;
	}
	public void setPartialLoadFlag(Boolean partialLoadFlag) {
		this.partialLoadFlag = partialLoadFlag;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	
}
