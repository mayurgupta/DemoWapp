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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_app_track_info`
--

LOCK TABLES `tt_app_track_info` WRITE;
/*!40000 ALTER TABLE `tt_app_track_info` DISABLE KEYS */;
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
INSERT INTO `tt_cross_ref_user_roles` VALUES (1,24),(2,24);
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_state_info`
--

LOCK TABLES `tt_state_info` WRITE;
/*!40000 ALTER TABLE `tt_state_info` DISABLE KEYS */;
INSERT INTO `tt_state_info` VALUES (1,0,'','Andra Pradesh',1),(2,0,'','Arunachal Pradesh',1),(3,0,'','Assam',1),(4,0,'','Bihar',1),(5,0,'','Chhattisgarh',1),(6,0,'','Goa',0),(7,0,'','Gujarat',1),(8,0,'','Haryana',1),(9,0,'','Himachal Pradesh',1),(10,0,'','Jammu and Kashmir',1),(11,0,'','Jharkhand',1),(12,0,'','Karnataka',1),(13,0,'','Kerala',1),(14,0,'','Madya Pradesh',1),(15,0,'','Maharashtra',1),(16,0,'','Manipur',1),(17,0,'','Meghalaya',1),(18,0,'','Mizoram',1),(19,0,'','Nagaland',1),(20,0,'','Orissa',1),(21,0,'','Punjab',1),(22,0,'','Rajasthan',1),(23,0,'','Sikkim',1),(24,0,'','Tamil Nadu',1),(25,0,'','Tripura',1),(26,0,'','Uttaranchal',1),(27,0,'','Uttar Pradesh',1),(28,0,'','West Bengal',1),(29,0,'','Andaman and Nicobar Islands',0),(30,0,'','Chandigarh',1),(31,0,'','Dadar and Nagar Haveli',1),(32,0,'','Daman and Diu',1),(33,0,'','Delhi',1),(34,0,'','Lakshadeep',0),(35,0,'','Pondicherry',1);
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
  `TIME_ESTIMATES` varchar(45) DEFAULT NULL,
  `REMARKS` varchar(255) DEFAULT NULL,
  `COMPANY_ID` int(11) NOT NULL,
  PRIMARY KEY (`QUOTE_ID`),
  KEY `fk_tt_trans_com_quotes_tt_user_booking_req1_idx` (`BOOKING_ID`),
  KEY `FK_kquqehn53giihny1c8ldrvoh` (`COMPANY_ID`),
  CONSTRAINT `FK_kquqehn53giihny1c8ldrvoh` FOREIGN KEY (`COMPANY_ID`) REFERENCES `tt_trans_com_details` (`COMPANY_ID`),
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tt_user`
--

LOCK TABLES `tt_user` WRITE;
/*!40000 ALTER TABLE `tt_user` DISABLE KEYS */;
INSERT INTO `tt_user` VALUES (24,'mayurguptacs59@gmail.com',1,'Gupta','0e81fb9e52be8dcc15fe990f95583cba5ffa62496d0ab72967d3bb713996891ef893f75a4bbb7218','Mayur',NULL,NULL,NULL,NULL,NULL);
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

-- Dump completed on 2016-03-14 23:11:15
