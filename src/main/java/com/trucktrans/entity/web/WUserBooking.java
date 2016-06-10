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
	
	
	
	private String srcState;
	private String srcCity;
	private String srcAddress;
	private String srcPin;
	
	private String destState;
	private String destCity;
	private String destAddress;
	private String destPin;
	
	private Date dateOfRequest;
	private String truckType;
	private Boolean partialLoadFlag;
	private String remarks;
	private String name;
	private String email;
	private String primaryContact;
	private String secondaryContact;
	
	private String goodsDescp;
	private String destPrimaryContact;
	private String destSecondaryContact;
	public String getSrcState() {
		return srcState;
	}
	public void setSrcState(String srcState) {
		this.srcState = srcState;
	}
	public String getSrcCity() {
		return srcCity;
	}
	public void setSrcCity(String srcCity) {
		this.srcCity = srcCity;
	}
	public String getSrcAddress() {
		return srcAddress;
	}
	public void setSrcAddress(String srcAddress) {
		this.srcAddress = srcAddress;
	}
	public String getSrcPin() {
		return srcPin;
	}
	public void setSrcPin(String srcPin) {
		this.srcPin = srcPin;
	}
	public String getDestState() {
		return destState;
	}
	public void setDestState(String destState) {
		this.destState = destState;
	}
	public String getDestCity() {
		return destCity;
	}
	public void setDestCity(String destCity) {
		this.destCity = destCity;
	}
	public String getDestAddress() {
		return destAddress;
	}
	public void setDestAddress(String destAddress) {
		this.destAddress = destAddress;
	}
	public String getDestPin() {
		return destPin;
	}
	public void setDestPin(String destPin) {
		this.destPin = destPin;
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
	public String getPrimaryContact() {
		return primaryContact;
	}
	public void setPrimaryContact(String primaryContact) {
		this.primaryContact = primaryContact;
	}
	public String getSecondaryContact() {
		return secondaryContact;
	}
	public void setSecondaryContact(String secondaryContact) {
		this.secondaryContact = secondaryContact;
	}
	public String getGoodsDescp() {
		return goodsDescp;
	}
	public void setGoodsDescp(String goodsDescp) {
		this.goodsDescp = goodsDescp;
	}
	public String getDestPrimaryContact() {
		return destPrimaryContact;
	}
	public void setDestPrimaryContact(String destPrimaryContact) {
		this.destPrimaryContact = destPrimaryContact;
	}
	public String getDestSecondaryContact() {
		return destSecondaryContact;
	}
	public void setDestSecondaryContact(String destSecondaryContact) {
		this.destSecondaryContact = destSecondaryContact;
	}
	
}
