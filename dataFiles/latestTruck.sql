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
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_app_track_info`
--

LOCK TABLES `tt_app_track_info` WRITE;
/*!40000 ALTER TABLE `tt_app_track_info` DISABLE KEYS */;
INSERT INTO `tt_app_track_info` VALUES (58,46,'LOGGED IN','2016-05-09 12:27:23','User Logged in'),(59,46,'LOGGED IN','2016-05-09 12:52:32','User Logged in'),(60,46,'LOGGED IN','2016-05-09 13:02:28','User Logged in'),(61,46,'LOGGED IN','2016-05-09 16:22:53','User Logged in'),(62,46,'LOGGED IN','2016-05-09 16:30:27','User Logged in'),(63,46,'LOGGED IN','2016-05-09 16:47:47','User Logged in'),(64,46,'LOGGED IN','2016-05-09 17:33:49','User Logged in'),(65,46,'LOGGED IN','2016-05-09 18:52:11','User Logged in'),(66,46,'LOGGED IN','2016-05-10 13:33:28','User Logged in'),(67,46,'LOGGED IN','2016-05-10 14:02:01','User Logged in'),(68,46,'LOGGED IN','2016-05-10 14:36:15','User Logged in'),(69,46,'LOGGED IN','2016-05-10 14:36:43','User Logged in'),(70,46,'LOGGED IN','2016-05-10 14:39:16','User Logged in'),(71,46,'LOGGED IN','2016-05-10 15:12:44','User Logged in'),(72,46,'LOGGED IN','2016-05-10 15:19:35','User Logged in'),(73,46,'LOGGED IN','2016-05-10 15:35:01','User Logged in'),(74,46,'LOGGED IN','2016-05-10 15:41:19','User Logged in'),(75,46,'LOGGED IN','2016-05-10 16:01:00','User Logged in'),(76,46,'LOGGED IN','2016-05-10 16:07:55','User Logged in'),(77,46,'LOGGED IN','2016-05-11 06:57:58','User Logged in'),(78,46,'LOGGED IN','2016-05-11 17:06:10','User Logged in'),(79,46,'LOGGED IN','2016-05-11 17:07:23','User Logged in'),(80,46,'LOGGED IN','2016-05-11 17:43:37','User Logged in'),(81,46,'LOGGED IN','2016-05-11 17:44:23','User Logged in'),(82,46,'LOGGED IN','2016-05-11 17:45:29','User Logged in'),(83,46,'LOGGED IN','2016-05-11 17:46:22','User Logged in'),(84,46,'LOGGED IN','2016-05-11 17:53:47','User Logged in'),(85,46,'LOGGED IN','2016-05-11 17:58:07','User Logged in'),(86,46,'LOGGED IN','2016-05-11 17:59:30','User Logged in'),(87,46,'LOGGED IN','2016-05-11 18:00:18','User Logged in'),(88,46,'LOGGED IN','2016-05-11 18:02:37','User Logged in'),(89,46,'LOGGED IN','2016-05-11 18:03:11','User Logged in'),(90,46,'LOGGED IN','2016-05-11 18:05:10','User Logged in'),(91,46,'LOGGED IN','2016-05-11 18:08:59','User Logged in'),(92,46,'LOGGED IN','2016-05-11 18:09:49','User Logged in'),(93,46,'LOGGED IN','2016-05-11 18:10:33','User Logged in'),(94,46,'LOGGED IN','2016-05-11 18:10:33','User Logged in'),(95,46,'LOGGED IN','2016-05-11 18:11:32','User Logged in'),(96,46,'LOGGED IN','2016-05-11 18:15:18','User Logged in'),(97,46,'LOGGED IN','2016-05-11 18:16:30','User Logged in'),(98,46,'LOGGED IN','2016-05-11 18:17:47','User Logged in'),(99,46,'LOGGED IN','2016-05-11 18:19:18','User Logged in'),(100,46,'LOGGED IN','2016-05-11 18:24:20','User Logged in'),(101,46,'LOGGED IN','2016-05-11 18:26:36','User Logged in'),(102,46,'LOGGED IN','2016-05-11 18:32:57','User Logged in'),(103,46,'LOGGED IN','2016-05-11 18:33:46','User Logged in'),(104,46,'LOGGED IN','2016-05-11 18:34:54','User Logged in'),(105,46,'LOGGED IN','2016-05-11 18:36:10','User Logged in'),(106,46,'LOGGED IN','2016-05-11 18:36:41','User Logged in'),(107,46,'LOGGED IN','2016-05-11 18:39:35','User Logged in'),(108,46,'LOGGED IN','2016-05-12 17:56:55','User Logged in'),(109,46,'LOGGED IN','2016-05-12 17:57:36','User Logged in'),(110,48,'LOGGED IN','2016-05-12 18:15:27','User Logged in'),(111,46,'LOGGED IN','2016-05-12 18:20:34','User Logged in'),(112,48,'LOGGED IN','2016-05-12 18:20:45','User Logged in'),(113,48,'LOGGED IN','2016-05-12 18:21:32','User Logged in'),(114,46,'LOGGED IN','2016-05-12 18:23:08','User Logged in'),(115,48,'LOGGED IN','2016-05-12 18:27:21','User Logged in'),(116,48,'LOGGED IN','2016-05-12 18:28:23','User Logged in'),(117,48,'LOGGED IN','2016-05-12 18:31:06','User Logged in'),(118,46,'LOGGED IN','2016-05-12 18:35:31','User Logged in'),(119,46,'LOGGED IN','2016-05-12 18:43:08','User Logged in'),(120,46,'LOGGED IN','2016-05-12 18:54:12','User Logged in');
/*!40000 ALTER TABLE `tt_app_track_info` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `tt_cross_ref_user_roles`
--

LOCK TABLES `tt_cross_ref_user_roles` WRITE;
/*!40000 ALTER TABLE `tt_cross_ref_user_roles` DISABLE KEYS */;
INSERT INTO `tt_cross_ref_user_roles` VALUES (1,46),(2,46),(1,47),(2,47),(3,48);
/*!40000 ALTER TABLE `tt_cross_ref_user_roles` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `tt_ref_review`
--

LOCK TABLES `tt_ref_review` WRITE;
/*!40000 ALTER TABLE `tt_ref_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_ref_review` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `tt_service_table`
--

LOCK TABLES `tt_service_table` WRITE;
/*!40000 ALTER TABLE `tt_service_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_service_table` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `tt_source_destination_info`
--

LOCK TABLES `tt_source_destination_info` WRITE;
/*!40000 ALTER TABLE `tt_source_destination_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_source_destination_info` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `tt_state_info`
--

LOCK TABLES `tt_state_info` WRITE;
/*!40000 ALTER TABLE `tt_state_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_state_info` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `tt_trans_com_details`
--

LOCK TABLES `tt_trans_com_details` WRITE;
/*!40000 ALTER TABLE `tt_trans_com_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_trans_com_details` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `tt_trans_com_quotes`
--

LOCK TABLES `tt_trans_com_quotes` WRITE;
/*!40000 ALTER TABLE `tt_trans_com_quotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_trans_com_quotes` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `tt_truck_service_type`
--

LOCK TABLES `tt_truck_service_type` WRITE;
/*!40000 ALTER TABLE `tt_truck_service_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_truck_service_type` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_user`
--

LOCK TABLES `tt_user` WRITE;
/*!40000 ALTER TABLE `tt_user` DISABLE KEYS */;
INSERT INTO `tt_user` VALUES (46,'mayurcs59@gmail.com',1,'Mayur Gupta','fa30b7099b69c26f7bb8af2fa2c401e1379dfbecfc5871f7777796eeae6eca24f7f8a297a0606ca1','mayurcs59@gmail.com',NULL,NULL,NULL,NULL,0),(47,'laxmi.deshmukh@gmail.com',1,'Laxmi Deshmukh','4177cb49237746ddb58637ba3a07c0c49a7f3149685d66c30f7fc200f65f454631081e955137b205','laxmi.deshmukh@gmail.com',NULL,NULL,NULL,NULL,0),(48,'laxmi.deshmukh@trucktrans.com',1,'Laxmi Deshmukh','5f46e59ca62b43de3801b75d3df1bfc1b265f98c6ca4653e8cfec1a69fb2815974669be2dee1111f','laxmi.deshmukh@trucktrans.com',NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `tt_user` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `tt_user_booking_req`
--

LOCK TABLES `tt_user_booking_req` WRITE;
/*!40000 ALTER TABLE `tt_user_booking_req` DISABLE KEYS */;
/*!40000 ALTER TABLE `tt_user_booking_req` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_user_details_info`
--

LOCK TABLES `tt_user_details_info` WRITE;
/*!40000 ALTER TABLE `tt_user_details_info` DISABLE KEYS */;
INSERT INTO `tt_user_details_info` VALUES (5,5,'Pu','maha',NULL,8,9,46,NULL),(6,89,'uuu','jjj','lll',89,45,48,'45');
/*!40000 ALTER TABLE `tt_user_details_info` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `tt_user_role`
--

LOCK TABLES `tt_user_role` WRITE;
/*!40000 ALTER TABLE `tt_user_role` DISABLE KEYS */;
INSERT INTO `tt_user_role` VALUES (1,'ROLE_USER','DEFAULTS'),(2,'ROLE_TRANSPORTER','DEFAULTS'),(3,'ROLE_MANUFACTURER','DEFAULTS'),(4,'ROLE_ADMIN','DEFAULTS'),(5,'ROLE_SUPER','DEFAULTS');
/*!40000 ALTER TABLE `tt_user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-13  0:29:36
