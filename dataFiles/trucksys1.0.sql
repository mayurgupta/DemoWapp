CREATE DATABASE  IF NOT EXISTS `trucksys` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `trucksys`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: trucksys
-- ------------------------------------------------------
-- Server version	5.6.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tt_app_track_info`
--

DROP TABLE IF EXISTS `tt_app_track_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_app_track_info` (
  `TRACK_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(20) NOT NULL,
  `ACTIVITY` varchar(45) NOT NULL,
  `TRACKED_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ACTIVITY_DESCRIPTION` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`TRACK_ID`),
  UNIQUE KEY `TRACK_ID_UNIQUE` (`TRACK_ID`),
  KEY `fk_tt_app_track_info_tt_user1_idx` (`USER_ID`),
  CONSTRAINT `fk_tt_app_track_info_tt_user1` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_cross_ref_user_roles`
--

DROP TABLE IF EXISTS `tt_cross_ref_user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_cross_ref_user_roles` (
  `ROLE_ID` int(11) NOT NULL,
  `USER_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`ROLE_ID`,`USER_ID`),
  KEY `fk_tt_cross_ref_user_roles_tt_user1_idx` (`USER_ID`),
  CONSTRAINT `fk_tt_cross_ref_user_roles_tt_user1` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tt_cross_ref_user_roles_tt_user_role1` FOREIGN KEY (`ROLE_ID`) REFERENCES `tt_user_role` (`ROLE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_ref_review`
--

DROP TABLE IF EXISTS `tt_ref_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_ref_review` (
  `REVIEW_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `CITY` varchar(45) DEFAULT NULL,
  `DATE_CREATED` bigint(20) DEFAULT NULL,
  `REVIEW` longtext,
  `INPUT_TIMESTAMP` bigint(20) NOT NULL,
  `RATING` double DEFAULT NULL,
  `STATE` varchar(45) DEFAULT NULL,
  `USER_NAME` varchar(100) DEFAULT NULL,
  `COMPANY_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`REVIEW_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_service_table`
--

DROP TABLE IF EXISTS `tt_service_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_service_table` (
  `SERVICE_ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `SERVICE_DESCRIPTION` varchar(45) DEFAULT NULL,
  `WEIGHT_DESCRIPTION` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SERVICE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_source_destination_info`
--

DROP TABLE IF EXISTS `tt_source_destination_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_source_destination_info` (
  `PLACE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) NOT NULL,
  `STATE_ID` int(11) NOT NULL,
  `PLACE_DESC` varchar(45) DEFAULT NULL,
  `PINCODE` int(11) NOT NULL,
  `ENABLED` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`PLACE_ID`),
  KEY `fk_tt_source_destination_info_tt_state_info1_idx` (`STATE_ID`),
  CONSTRAINT `fk_tt_source_destination_info_tt_state_info1` FOREIGN KEY (`STATE_ID`) REFERENCES `tt_state_info` (`STATE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_state_info`
--

DROP TABLE IF EXISTS `tt_state_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_state_info` (
  `STATE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PINCODE` int(11) NOT NULL,
  `NAME` varchar(45) NOT NULL,
  `STATE_DESC` varchar(45) DEFAULT NULL,
  `ENABLED` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`STATE_ID`),
  UNIQUE KEY `state_id_UNIQUE` (`STATE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_trans_com_details`
--

DROP TABLE IF EXISTS `tt_trans_com_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_trans_com_details` (
  `COMPANY_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) DEFAULT NULL,
  `COMPANY_DESC` varchar(255) DEFAULT NULL,
  `TRUCK_STRENGTH` smallint(6) DEFAULT NULL,
  `USER_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`COMPANY_ID`),
  KEY `fk_tt_trans_com_details_tt_user1_idx` (`USER_ID`),
  CONSTRAINT `fk_tt_trans_com_details_tt_user1` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_trans_com_quotes`
--

DROP TABLE IF EXISTS `tt_trans_com_quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_trans_com_quotes` (
  `QUOTE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `COMPANY_NAME` varchar(100) NOT NULL,
  `BOOKING_ID` int(11) NOT NULL,
  `TRUCK_TYPE` varchar(45) DEFAULT NULL,
  `PRICE_ESTIMATES` varchar(45) DEFAULT NULL,
  `MAX_TIME` varchar(45) DEFAULT NULL,
  `MIN_TIME` varchar(45) DEFAULT NULL,
  `REMARKS` varchar(255) DEFAULT NULL,
  `READ_UNREAD_FLAG` tinyint(1) DEFAULT '0',
  `ACCEPT_DECLINE_FLAG` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`QUOTE_ID`),
  KEY `fk_tt_trans_com_quotes_tt_user_booking_req1_idx` (`BOOKING_ID`),
  CONSTRAINT `fk_tt_trans_com_quotes_tt_user_booking_req1` FOREIGN KEY (`BOOKING_ID`) REFERENCES `tt_user_booking_req` (`BOOKING_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_truck_service_type`
--

DROP TABLE IF EXISTS `tt_truck_service_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_truck_service_type` (
  `COMPANY_ID` int(11) NOT NULL,
  `SERVICE_ID` smallint(6) DEFAULT NULL,
  KEY `fk_tt_truck_service_type_tt_service_table1_idx` (`SERVICE_ID`),
  KEY `fk_tt_truck_service_type_tt_trans_com_details1` (`COMPANY_ID`),
  CONSTRAINT `fk_tt_truck_service_type_tt_service_table1` FOREIGN KEY (`SERVICE_ID`) REFERENCES `tt_service_table` (`SERVICE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tt_truck_service_type_tt_trans_com_details1` FOREIGN KEY (`COMPANY_ID`) REFERENCES `tt_trans_com_details` (`COMPANY_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_user`
--

DROP TABLE IF EXISTS `tt_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_user` (
  `USER_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(50) NOT NULL,
  `ENABLED` tinyint(1) DEFAULT NULL,
  `NAME` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `USER_NAME` varchar(45) NOT NULL,
  `CREATED_BY` varchar(45) DEFAULT NULL,
  `CREATED_DATE` timestamp NULL DEFAULT NULL,
  `UPDATED_BY` varchar(45) DEFAULT NULL,
  `UPDATED_DATE` timestamp NULL DEFAULT NULL,
  `PASSWORD_CHANGED` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USER_ID_UNIQUE` (`USER_ID`),
  UNIQUE KEY `EMAIL_UNIQUE` (`EMAIL`),
  UNIQUE KEY `UK_98c6tnx31wlw8awoy92c3xmog` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_user_booking_req`
--

DROP TABLE IF EXISTS `tt_user_booking_req`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_user_booking_req` (
  `BOOKING_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'This table is for booking of new truck by user.\nThis table contains the inquiry of new truck by any user.',
  `USER_ID` bigint(20) NOT NULL,
  `SOURCE_STATE` int(11) NOT NULL,
  `SOURCE_PLACE` varchar(45) NOT NULL,
  `SOURCE_ADDRESS` varchar(255) NOT NULL,
  `DESTINATION_STATE` int(11) NOT NULL,
  `DESTINATION_PLACE` varchar(45) NOT NULL,
  `DESTINATION_ADDRESS` varchar(255) NOT NULL,
  `DATE_OF_REQUEST` timestamp NULL DEFAULT NULL,
  `TRUCK_TYPE` varchar(45) DEFAULT NULL,
  `PARTIAL_LOAD_FLAG` tinyint(1) DEFAULT NULL,
  `REMARKS` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BOOKING_ID`),
  UNIQUE KEY `BOOKING_ID_UNIQUE` (`BOOKING_ID`),
  KEY `fk_tt_user_booking_req_tt_user_idx` (`USER_ID`),
  KEY `FK_ow99dpcs8kp9y8qi3nne47r4v` (`DESTINATION_STATE`),
  KEY `FK_sy3l6nv7sl5mlqb5ln45cfbj6` (`SOURCE_STATE`),
  CONSTRAINT `FK_ow99dpcs8kp9y8qi3nne47r4v` FOREIGN KEY (`DESTINATION_STATE`) REFERENCES `tt_state_info` (`STATE_ID`),
  CONSTRAINT `FK_sy3l6nv7sl5mlqb5ln45cfbj6` FOREIGN KEY (`SOURCE_STATE`) REFERENCES `tt_state_info` (`STATE_ID`),
  CONSTRAINT `fk_tt_user_booking_req_tt_user` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_user_details_info`
--

DROP TABLE IF EXISTS `tt_user_details_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_user_details_info` (
  `USER_DETAILS_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PINCODE` int(6) DEFAULT NULL,
  `CITY` varchar(45) DEFAULT NULL,
  `STATE` varchar(45) DEFAULT NULL,
  `LAND_MARK` varchar(45) DEFAULT NULL,
  `PRIMARY_PHONE_NO` int(10) DEFAULT NULL,
  `SECONDARY_PHONE_NO` int(10) DEFAULT NULL,
  `USER_ID` bigint(20) NOT NULL,
  `LANDMARK` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`USER_DETAILS_ID`),
  KEY `USER_ID_idx` (`USER_ID`),
  CONSTRAINT `fk_tt_user_details_info_tt_user1` FOREIGN KEY (`USER_ID`) REFERENCES `tt_user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_user_role`
--

DROP TABLE IF EXISTS `tt_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tt_user_role` (
  `ROLE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `AUTHORITY` varchar(45) DEFAULT NULL,
  `ROLE_DESCRIPTION` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ROLE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-11 22:57:09
