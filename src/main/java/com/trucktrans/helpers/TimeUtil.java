/**
 * 
 */
package com.trucktrans.helpers;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.TimeZone;


/**
 * @author Mayur
 * 2:21:57 pm, 19-Sep-2015
 *
 */
public class TimeUtil {
	

	private static final SimpleDateFormat yearMonthDayTimeFormatter= new SimpleDateFormat(
			"yyyy-MM-dd hh:mm:ss");



	private TimeUtil() {

	}

	/**
	 * @return
	 */
	public static final Calendar getCalendar() {

		return Calendar.getInstance(TimeZone.getTimeZone("IST"));
	}

	/**
	 * 
	 * @param timestamp
	 * @return
	 */
	public static final Long getQuarterEnd(Long timestamp) {
		throw new UnsupportedOperationException();
	}

	/**
	 * based on utc calendar timestamp
	 * 
	 * @param timestamp
	 * @return Calendar instance based on first date of quarter
	 */
	public static final Calendar getQuarterStart(Long timestamp) {
		if (timestamp != null) {
			Calendar calendar = TimeUtil.getCalendar();
			calendar.setTimeInMillis(timestamp);

			int month = calendar.get(Calendar.MONTH);
			int rem = month % 3;
			month = month - rem;
			int year = calendar.get(Calendar.YEAR);
			calendar.clear();
			calendar.set(year, month, 1);
			return calendar;
		}
		return null;
	}

	/**
	 * based on utc calendar timestamp
	 * 
	 * @param timestamp
	 * @return Calendar instance based on first date of year
	 */
	public static final Calendar getYearStart(Long timestamp) {
		if (timestamp != null) {
			Calendar calendar = TimeUtil.getCalendar();
			calendar.setTimeInMillis(timestamp);
			int year = calendar.get(Calendar.YEAR);
			calendar.clear();
			calendar.set(year, Calendar.JANUARY, 1);
			return calendar;
		}
		return null;
	}

	public static String timestampToMonthDayYear(Timestamp timestamp) {
		if (timestamp == null) {
			return null;
		} else {
			return yearMonthDayTimeFormatter.format((java.util.Date) timestamp);
		}
	}

	public static java.sql.Timestamp getTimestamp() {
		java.util.Date today = new java.util.Date();
		return new java.sql.Timestamp(today.getTime());
	}


}
