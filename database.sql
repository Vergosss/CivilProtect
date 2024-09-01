-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: web
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Base`
--

DROP TABLE IF EXISTS `Base`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Base` (
  `base_id` int NOT NULL AUTO_INCREMENT,
  `cords` point NOT NULL,
  PRIMARY KEY (`base_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Base`
--

LOCK TABLES `Base` WRITE;
/*!40000 ALTER TABLE `Base` DISABLE KEYS */;
INSERT INTO `Base` VALUES (1,_binary '\0\0\0\0\0\0\0qäø\ÿ\À1C@\0\0\0\0$\’5@');
/*!40000 ALTER TABLE `Base` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cargo`
--

DROP TABLE IF EXISTS `Cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cargo` (
  `username` varchar(255) NOT NULL,
  `item` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  UNIQUE KEY `username` (`username`,`item`),
  CONSTRAINT `Cargo_ibfk_1` FOREIGN KEY (`username`) REFERENCES `User` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cargo`
--

LOCK TABLES `Cargo` WRITE;
/*!40000 ALTER TABLE `Cargo` DISABLE KEYS */;
INSERT INTO `Cargo` VALUES ('dimitrisitsios','Sardines',1),('elenibousga','Orange Juice',3),('iasonasmakris','Croissant',6),('iasonasmakris','Orange Juice',7),('iasonasmakris','Sardines',3),('iasonasmakris','Water',11);
/*!40000 ALTER TABLE `Cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `id` int NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (5,'Food'),(6,'Beverages'),(7,'Clothing'),(8,'Hacker of class'),(9,'2d hacker'),(10,''),(11,'Test'),(13,'-----'),(14,'Flood'),(15,'new cat'),(16,'Medical Supplies'),(19,'Shoes'),(21,'Personal Hygiene '),(22,'Cleaning Supplies'),(23,'Tools'),(24,'Kitchen Supplies'),(25,'Baby Essentials'),(26,'Insect Repellents'),(27,'Electronic Devices'),(28,'Cold weather'),(29,'Animal Food'),(30,'Financial support'),(33,'Cleaning Supplies.'),(34,'Hot Weather'),(35,'First Aid '),(39,'Test_0'),(40,'test1'),(41,'pet supplies'),(42,'Œúedicines'),(43,'Energy Drinks'),(44,'Disability and Assistance Items'),(45,'Communication items'),(46,'communications'),(47,'Humanitarian Shelters'),(48,'Water Purification'),(49,'Animal Care'),(50,'Earthquake Safety'),(51,'Sleep Essentilals'),(52,'Navigation Tools'),(53,'Clothing and cover'),(54,'Tools and Equipment'),(56,'Special items'),(57,'Household Items'),(59,'Books'),(60,'Fuel and Energy'),(61,'test category'),(65,'ood'),(66,'Animal Flood'),(67,'Solar-Powered Devices'),(68,'Mental Health Support');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Citizen`
--

DROP TABLE IF EXISTS `Citizen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Citizen` (
  `citizen_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `telephone` int NOT NULL,
  `cords` point DEFAULT NULL,
  PRIMARY KEY (`citizen_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Citizen`
--

LOCK TABLES `Citizen` WRITE;
/*!40000 ALTER TABLE `Citizen` DISABLE KEYS */;
INSERT INTO `Citizen` VALUES (1,'giorgosvergos','malakas123!','giorgos','vergos',6567,_binary '\0\0\0\0\0\0\0U1ï~¬èF@ê\⁄\ƒ\…˝&>@'),(9,'panagiotisvergos','$2b$10$4UqmiUaEc8ZfJpo9/y9ibuhOvnPhdoFkDYVWLQmPS6KIET18D/zmi','panagiotis','vergos',235443,_binary '\0\0\0\0\0\0\0Y\0u\Á\È C@\0\0à\‡Ω5@'),(10,'bousgiaspanagiotis','$2b$10$XtVt1sTVuAKly/hd0VFV8uFbK8uO2aBpEOcyGbc2zI769Qwm5w8xi','panagiotis','bousgias',13234,_binary '\0\0\0\0\0\0\0F\Â£¸πC@\0\0\0@√π5@'),(11,'konstantinamoustakopoulou','$2b$10$SXE8ZYhehGfRGjrAuI5pnOz6ivFYCKpef4w6zDgShQoHhHXL9wv1m','konstantina','moustakopoulou',958664,_binary '\0\0\0\0\0\0\0X~E≠âC@\0\0\0G¡5@'),(12,'vroustourisnikolaos','$2b$10$CqY2vfAvHILzrPwj77sryuQPADzQoaXhcX3GQE8YAL6rpht9nyaDG','nikolaos','vroustouris',762455,_binary '\0\0\0\0\0\0\0A\Âö\√C@\0\0\0\‡;ø5@'),(13,'takiskouvertaris','$2b$10$EwmFfG9Ysr5bYlO4wSGc0ujhZ.W0muPEreGUerRTuMZoSG38hpqx2','takis','kouvertaris',934601,_binary '\0\0\0\0\0\0\0é\∆\Ô\ÔOC@\0\0\0 Ç¿5@'),(14,'mariaalemi2002','$2b$10$ArxfRQVDPM4E.UEX1VNuQ.s7fikS.OB.nU1eoQAtm/Ekj6jTv8IWG','maria','alemi',825123,_binary '\0\0\0\0\0\0\0\‘\√%\!C@\0\0Ä\Áæ5@'),(15,'test123','test123','test','test',123,_binary '\0\0\0\0\0\0\0\Á®6G¸C@ã®â>\«5@'),(16,'takismeglis','$2b$10$NzHgCJUaSBg.p85kuPi.2e1CACzDSqb9ZvJIOcf92Iz41UlZW7yXC','takis','meglis',1234,_binary '\0\0\0\0\0\0\0N†_ƒåC@\0\0Ä%Ω5@');
/*!40000 ALTER TABLE `Citizen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Inventory`
--

DROP TABLE IF EXISTS `Inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inventory` (
  `item` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  UNIQUE KEY `item` (`item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inventory`
--

LOCK TABLES `Inventory` WRITE;
/*!40000 ALTER TABLE `Inventory` DISABLE KEYS */;
INSERT INTO `Inventory` VALUES ('Croissant',55),('Orange Juice',9),('Sardines',29),('Water',42);
/*!40000 ALTER TABLE `Inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Item`
--

DROP TABLE IF EXISTS `Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Item` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Item`
--

LOCK TABLES `Item` WRITE;
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
INSERT INTO `Item` VALUES (16,'Water',6),(17,'Orange juice',6),(18,'Sardines',5),(19,'Canned corn',5),(20,'Bread',5),(21,'Chocolate',5),(22,'Men Sneakers',7),(23,'Test Product',9),(24,'Test Val',14),(25,'Spaghetti',5),(26,'Croissant',5),(28,'',10),(29,'Biscuits',5),(30,'Bandages',16),(31,'Disposable gloves',16),(32,'Gauze',16),(33,'Antiseptic',16),(34,'First Aid Kit',16),(35,'Painkillers',16),(36,'Blanket',7),(37,'Fakes',5),(38,'Menstrual Pads',21),(39,'Tampon',21),(40,'Toilet Paper',21),(41,'Baby wipes',21),(42,'Toothbrush',21),(43,'Toothpaste',21),(44,'Vitamin C',16),(45,'Multivitamines',16),(46,'Paracetamol',16),(47,'Ibuprofen',16),(48,'',10),(49,'',10),(50,'',10),(51,'Cleaning rag',22),(52,'Detergent',22),(53,'Disinfectant',22),(54,'Mop',22),(55,'Plastic bucket',22),(56,'Scrub brush',22),(57,'Dust mask',22),(58,'Broom',22),(59,'Hammer',23),(60,'Skillsaw',23),(61,'Prybar',23),(62,'Shovel',23),(63,'Flashlight',23),(64,'Duct tape',23),(65,'Underwear',7),(66,'Socks',7),(67,'Warm Jacket',7),(68,'Raincoat',7),(69,'Gloves',7),(70,'Pants',7),(71,'Boots',7),(72,'Dishes',24),(73,'Pots',24),(74,'Paring knives',24),(75,'Pan',24),(76,'Glass',24),(77,'',10),(78,'',10),(79,'',10),(80,'',10),(81,'',10),(82,'',10),(83,'t22',9),(84,'water ',6),(85,'Coca Cola',6),(86,'spray',26),(87,'Outdoor spiral',26),(88,'Baby bottle',25),(89,'Pacifier',25),(90,'Condensed milk',5),(91,'Cereal bar',5),(92,'Pocket Knife',23),(93,'Water Disinfection Tablets',16),(94,'Radio',27),(95,'Kitchen appliances',14),(96,'Winter hat',28),(97,'Winter gloves',28),(98,'Scarf',28),(99,'Thermos',28),(100,'Tea',6),(101,'Dog Food ',29),(102,'Cat Food',29),(103,'Canned',5),(104,'Chlorine',22),(105,'Medical gloves',22),(106,'T-Shirt',7),(107,'Cooling Fan',34),(108,'Cool Scarf',34),(109,'Whistle',23),(110,'Blankets',28),(111,'Sleeping Bag',28),(112,'Toothbrush',21),(113,'Toothpaste',21),(114,'Thermometer',16),(115,'Rice',5),(116,'Bread',5),(117,'Towels',22),(118,'Wet Wipes',22),(119,'Fire Extinguisher',23),(120,'Fruits',5),(121,'Duct Tape',23),(122,'',10),(123,'ŒëŒ∏ŒªŒ∑œÑŒπŒ∫Œ¨',19),(124,'Œ†Œ±œÉŒ±œÑŒ≠ŒºœÄŒøœÇ',5),(125,'Bandages',35),(126,'Betadine',35),(127,'cotton wool',35),(128,'Crackers',5),(129,'Sanitary Pads',21),(130,'Sanitary wipes',21),(131,'Electrolytes',16),(132,'Pain killers',16),(133,'Flashlight',23),(134,'Juice',6),(135,'Toilet Paper',21),(136,'Sterilized Saline',16),(137,'Biscuits',5),(138,'Antihistamines',16),(139,'Instant Pancake Mix',5),(140,'Lacta',5),(141,'Canned Tuna',5),(142,'Batteries',23),(143,'Dust Mask',35),(144,'Can Opener',23),(145,'',10),(146,'Œ†Œ±œÑŒ±œÑŒ¨Œ∫ŒπŒ±',5),(147,'Œ£ŒµœÅŒ≤ŒπŒ≠œÑŒµœÇ',21),(148,'Dry Cranberries',5),(149,'Dry Apricots',5),(150,'Dry Figs',5),(151,'Œ†Œ±ŒæŒπŒºŒ¨Œ¥ŒπŒ±',5),(152,'',10),(153,'Test Item',11),(154,'Painkillers',35),(155,'Tampons',16),(156,'plaster set',41),(157,'elastic bandages',41),(158,'traumaplast',41),(159,'thermal blanket',41),(160,'burn gel',41),(161,'pet carrier',41),(162,'pet dishes',41),(163,'plastic bags',41),(164,'toys',41),(165,'burn pads',41),(166,'cheese',5),(167,'lettuce',5),(168,'eggs',5),(169,'steaks',5),(170,'beef burgers',5),(171,'tomatoes',5),(172,'onions',5),(173,'flour',5),(174,'pastel',5),(175,'nuts',5),(176,'dramamines',42),(177,'nurofen',42),(178,'imodium',42),(179,'emetostop',42),(180,'xanax',42),(181,'saflutan',42),(182,'sadolin',42),(183,'depon',42),(184,'panadol',42),(185,'ponstan ',42),(186,'algofren',42),(187,'effervescent depon',42),(188,'cold coffee',6),(189,'Hell',43),(190,'Monster',43),(191,'Redbull',43),(192,'Powerade',43),(193,'PRIME',43),(194,'Lighter',23),(195,'isothermally shirts',28),(196,'',10),(197,'Depon',42),(198,'Shorts',34),(199,'Chicken',5),(200,'Toilet Paper',21),(201,'toys',41),(202,'sanitary napkins',21),(203,'COVID-19 Tests',16),(204,'Club Soda',6),(205,'Wheelchairs',44),(206,'mobile phones',45),(207,'spoon',24),(208,'fork',24),(209,'MOTOTRBO R7',45),(210,'RM LA 250 (VHF Linear ŒïŒΩŒπœÉœáœÖœÑŒÆœÇ 140-150MHz)',45),(211,'Humanitarian General Purpose Tent System (HGPTS)',47),(212,'CELINA Dynamic Small Shelter ',47),(213,'Multi-purpose Area Shelter System, Type-I',47),(214,'Trousers',7),(215,'Shoes',7),(216,'Hoodie',7),(217,'',10),(218,'dog food',49),(219,'cat food',49),(220,'macaroni',5),(221,'rice',5),(222,'scarf',7),(223,'gloves',7),(224,'underwear',7),(225,'Silver blanket',50),(226,'Helmet',50),(227,'Disposable toilet',50),(228,'Self-generated flashlight',50),(229,'Mattresses ',51),(230,'flashlight',51),(231,'matches',51),(232,'Heater',51),(233,'Earplugs',51),(234,'Compass',52),(235,'Map',52),(236,'GPS',52),(237,'First Aid',16),(238,'Bandage',16),(239,'Mask',16),(240,'Medicines',16),(241,'Water',5),(242,'Canned Goods',5),(243,'Snacks',5),(244,'Cereals',5),(245,'Blankets',53),(246,'Shirt',53),(247,'Pants',53),(248,'Shoes',53),(249,'Socks',53),(250,'Caps',53),(251,'Gloves',53),(252,'Flashlight',54),(253,'Batteries',54),(254,'Repair Tools',54),(255,'Soap and Shampoo',21),(256,'Toothpastes and Toothbrushes',21),(257,'Towels',21),(258,'Diapers',56),(259,'Animal food',56),(260,'Pots',57),(261,'Plates',57),(262,'Cups',57),(263,'Cutlery ',57),(264,'Cleaning Supplies',57),(265,'Kitchen Appliances',57),(266,'Home Repair Tools',57),(267,'',10),(268,'Lord of the Rings',59),(269,'Dog Food',29),(270,'DEPON',16),(271,'Painkillers',16),(272,'Gasoline',60),(273,'Power Banks',60),(274,'',9),(275,'test item',29),(276,'test item2',61),(277,'T4 Levothyroxine',42),(278,'',10),(279,'Solar Charger',67),(280,'Solar-Powered Radio',67),(281,'Solar Torch',67),(282,'Stress Ball',68),(283,'Guided Meditation Audio',68),(284,'',10),(285,'',10);
/*!40000 ALTER TABLE `Item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Request`
--

DROP TABLE IF EXISTS `Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `citizen_first_name` varchar(255) NOT NULL,
  `citizen_last_name` varchar(255) NOT NULL,
  `citizen_telephone` int NOT NULL,
  `entry_date` datetime NOT NULL,
  `item` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `withdrawal_date` datetime DEFAULT NULL,
  `vehicle_username` varchar(255) DEFAULT NULL,
  `lifted` tinyint(1) DEFAULT '0',
  `cords` point NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Request`
--

LOCK TABLES `Request` WRITE;
/*!40000 ALTER TABLE `Request` DISABLE KEYS */;
INSERT INTO `Request` VALUES (1,'giorgos','vergos',412321,'2024-08-06 02:22:52','Water',1,'2024-08-19 15:44:52','iasonasmakris',1,_binary '\0\0\0\0\0\0\0øÇj\⁄C@\0\0PGº5@','giorgosvergos'),(3,'panagiotis','vergos',41351,'2024-08-06 02:24:28','Croissant',1,'2024-08-19 16:43:31','iasonasmakris',1,_binary '\0\0\0\0\0\0\0\È\Ì!^/C@\0\0@3\¬5@','panagiotisvergos'),(4,'konstantina','moustakopoulou',9340123,'2024-08-06 02:26:58','Antiseptic',1,'2024-08-15 21:26:09','iasonasmakris',1,_binary '\0\0\0\0\0\0\0˘M#ùaC@ˇˇˇ6ª5@','konstantinamoustakopoulou'),(15,'giorgos','vergos',412321,'2024-08-18 17:30:27','Orange juice',1,NULL,NULL,0,_binary '\0\0\0\0\0\0\0øÇj\⁄C@\0\0PGº5@','giorgosvergos'),(16,'giorgos','vergos',412321,'2024-08-18 17:31:57','Sardines',1,'2024-08-19 15:53:53','elenibousga',1,_binary '\0\0\0\0\0\0\0øÇj\⁄C@\0\0PGº5@','giorgosvergos');
/*!40000 ALTER TABLE `Request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Task`
--

DROP TABLE IF EXISTS `Task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Task` (
  `username` varchar(255) NOT NULL,
  `citizen_first_name` varchar(255) NOT NULL,
  `citizen_last_name` varchar(255) NOT NULL,
  `citizen_telephone` int NOT NULL,
  `entry_date` datetime NOT NULL,
  `item` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `completed` tinyint(1) DEFAULT '0',
  `task_id` int NOT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Task`
--

LOCK TABLES `Task` WRITE;
/*!40000 ALTER TABLE `Task` DISABLE KEYS */;
INSERT INTO `Task` VALUES ('giorgosvergos','giorgos','vergos',412321,'2024-08-19 15:44:53','Water',1,0,1),('mariaalemi2002','maria','alemi',698213,'2024-08-28 01:26:41','Chocolate',1,1,2),('panagiotisvergos','panagiotis','vergos',41351,'2024-08-19 16:43:31','Croissant',1,0,3),('konstantinamoustakopoulou','konstantina','moustakopoulou',9340123,'2024-08-15 21:26:09','Antiseptic',1,0,4),('giorgosvergos','giorgos','vergos',412321,'2024-08-19 15:53:53','Sardines',1,0,16);
/*!40000 ALTER TABLE `Task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `telephone` int NOT NULL,
  `cords` point NOT NULL,
  `role` enum('Admin','Rescuer','Citizen') DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'giorgosvergos','$2b$10$IdaCDA7NGJzyktnqq.ZGwetGybi//txOZ5YfnbBQ/NQzc7GREs3UW','giorgos','vergos',412321,_binary '\0\0\0\0\0\0\0øÇj\⁄C@\0\0PGº5@','Citizen'),(2,'panagiotisvergos','$2b$10$9jBEwaSL/YoILBvcxJznVuQJDOLY4kSd5DMa4GpbYHwPwFcBdGRQy','panagiotis','vergos',41351,_binary '\0\0\0\0\0\0\0\È\Ì!^/C@\0\0@3\¬5@','Citizen'),(3,'bousgiaspanagiotis','$2b$10$jNxc/nlWha998RNICN8WkOZRYspYNh3.CrvuvhaxIhiYWF8vh4gR.','bousgias','panagiotis',78235,_binary '\0\0\0\0\0\0\0\Ê\‚µ\œ¯ C@\0\0\0\0¿¿5@','Citizen'),(4,'konstantinamoustakopoulou','$2b$10$194l1OLic0L/9itCI8Fr1ekabnoPGZ6Lw.FY9mqNss8rMO8kwr.5G','konstantina','moustakopoulou',9340123,_binary '\0\0\0\0\0\0\0˘M#ùaC@\0\0\0Ä6ª5@','Citizen'),(5,'mariaalemi2002','$2b$10$vKd2C52v6EpLo.PvdFsL1ObQZGlkAnochM.xZiXchGuiOPd4xpM8O','maria','alemi',698213,_binary '\0\0\0\0\0\0\0é\◊\Ï!C@\0\0¿∫∫5@','Citizen'),(6,'anastasiosvergos','$2b$10$zZhsh.e./Vg5XZLCsikxZuaEi8qwPDa0V9/B5zOw4RM73l/061scS','anastasios','vergos',45612,_binary '\0\0\0\0\0\0\0\–2~C@\0\0\0.º5@','Admin'),(7,'dimitrisitsios','$2b$10$i62vX/VDboFJlxwskGVTLuuWyi4GBkSV5n1QIcuvqJDio.tqURJB2','dimitris','itsios',52343,_binary '\0\0\0\0\0\0\04f	l$C@\0\0\0\Á\∆5@','Rescuer'),(8,'elenibousga','$2b$10$QRS9FJQFXhxO9Mg./6tfCODPYkmcvR34dLJ1Y1j07rHGL0WoXnSsm','eleni','bousga',24412,_binary '\0\0\0\0\0\0\0K\Ú3C@\0\0\0\0›≤5@','Rescuer'),(9,'iasonasmakris','$2b$10$jH1drdlhO2NZl.dL6I//W.TmQTJcP4stVkdST635cYFPdYaDBKIp2','iasonas','makris',73241,_binary '\0\0\0\0\0\0\0xxÖ\'t/C@Toc\«¿5@','Rescuer');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_details`
--

DROP TABLE IF EXISTS `item_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_details` (
  `item_id` int NOT NULL,
  `detail_name` varchar(255) NOT NULL,
  `detail_value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_details`
--

LOCK TABLES `item_details` WRITE;
/*!40000 ALTER TABLE `item_details` DISABLE KEYS */;
INSERT INTO `item_details` VALUES (16,'volume','1.5l'),(16,'pack size','6'),(17,'volume','250ml'),(17,'pack size','12'),(18,'brand','Trata'),(18,'weight','200g'),(19,'weight','500g'),(20,'weight','1kg'),(20,'type','white'),(21,'weight','100g'),(21,'type','milk chocolate'),(21,'brand','ION'),(22,'size','44'),(23,'weight','500g'),(23,'pack size','12'),(23,'expiry date','13/12/1978'),(24,'Details','600ml'),(25,'grams','500'),(26,'calories','200'),(28,'',''),(29,'',''),(30,'','25 pcs'),(31,'','100 pcs'),(32,'',''),(33,'','250ml'),(34,'',''),(35,'volume','200mg'),(36,'size','50\" x 60\"'),(37,'',''),(38,'stock','500'),(38,'size','3'),(38,'',''),(39,'stock','500'),(39,'size','regular'),(40,'stock','300'),(40,'ply','3'),(41,'volume','500gr'),(41,'stock ','500'),(41,'scent','aloe'),(42,'stock','500'),(43,'stock','250'),(44,'stock','200'),(45,'stock','200'),(46,'stock','2000'),(46,'dosage','500mg'),(47,'stock ','10'),(47,'dosage','200mg'),(48,'',''),(49,'',''),(49,'',''),(49,'',''),(50,'',''),(51,'',''),(52,'',''),(53,'',''),(54,'',''),(55,'',''),(56,'',''),(57,'',''),(58,'',''),(59,'',''),(60,'',''),(61,'',''),(62,'',''),(63,'',''),(64,'',''),(65,'',''),(66,'',''),(67,'',''),(68,'',''),(69,'',''),(70,'',''),(71,'',''),(72,'',''),(73,'',''),(74,'',''),(75,'',''),(76,'',''),(77,'',''),(77,'',''),(77,'',''),(78,'',''),(79,'',''),(80,'',''),(81,'',''),(82,'',''),(82,'',''),(82,'',''),(82,'ghw56','twhwhrwh'),(82,'',''),(83,'wtwty','wytwty'),(84,'',''),(85,'Volume','500ml'),(86,'volume','75ml'),(87,'duration','7 hours'),(88,'volume','250ml'),(89,'material','silicone'),(90,'weight','400gr'),(91,'weight','23,5gr'),(92,'Number of different tools','3'),(92,'Tool','Knife'),(92,'Tool','Screwdriver'),(92,'Tool','Spoon'),(93,'Basic Ingredients','Iodine'),(93,'Suggested for','Everyone expept pregnant women'),(94,'Power','Batteries'),(94,'Frequencies Range','3 kHz - 3000 GHz'),(95,'','(scrubbers, rubber gloves, kitchen detergent, laundry soap)'),(96,'',''),(97,'',''),(98,'',''),(99,'',''),(100,'volume','500ml'),(101,'volume','500g'),(102,'volume','500g'),(103,'',''),(104,'volume','500ml'),(105,'volume','20pieces'),(106,'size','XL'),(107,'',''),(108,'',''),(109,'',''),(110,'',''),(111,'',''),(112,'',''),(113,'',''),(114,'',''),(115,'',''),(116,'',''),(117,'',''),(118,'',''),(119,'',''),(120,'',''),(120,'',''),(121,'',''),(122,'',''),(123,'ŒùŒø 46',''),(124,'',''),(125,'Adhesive','2 meters'),(126,'Povidone iodine 10%','240 ml'),(127,'100% Hydrofile','70gr'),(128,'Quantity per package','10'),(128,'Packages','2'),(129,'piece','10 pieces'),(129,'',''),(129,'',''),(130,'pank','10 packs'),(131,'packet of pills','20 pills'),(132,'packet of pills','20 pills'),(133,'pieces','1'),(133,'',''),(134,'volume','500ml'),(135,'rolls','1 roll'),(135,'',''),(136,'volume','100ml'),(137,'packet','1 packet'),(138,'pills','10 pills'),(139,'',''),(140,'weight','105g'),(141,'',''),(142,'6 pack',''),(143,'1',''),(144,'1',''),(145,'',''),(146,'weight','45g'),(147,'pcs','18'),(148,'weight','100'),(149,'weight','100'),(150,'weight','100'),(151,'weight','200g'),(152,'',''),(153,'volume','200g'),(153,'',''),(154,'Potency','High'),(155,'',''),(156,'1',''),(156,'',''),(157,'','12'),(158,'','20'),(158,'',''),(159,'','2'),(160,'ml','500'),(161,'','2'),(162,'','10'),(163,'','20'),(164,'','5'),(165,'','5'),(166,'grams','1000'),(167,'grams','500'),(168,'pair','10'),(169,'grams','1000'),(170,'grams','500'),(171,'grams','1000'),(172,'grams','500'),(173,'grams','1000'),(174,'','7'),(175,'grams','500'),(176,'','5'),(177,'','10'),(178,'','5'),(179,'','5'),(180,'','5'),(181,'','2'),(182,'','3'),(183,'','20'),(184,'','6'),(185,'','10'),(186,'10','600ml'),(186,'',''),(187,'67','1000mg'),(188,'10','330ml'),(189,'22','330'),(190,'31','500ml'),(191,'40','330ml'),(192,'23','500ml'),(193,'15','500ml'),(194,'16','Mini'),(195,'5','Medium'),(195,'6','Large'),(195,'10','Small'),(195,'2','XL'),(196,'',''),(197,'10','500mg'),(197,'',''),(198,'20',''),(198,'',''),(199,'5','1.5kg'),(200,'20','200g'),(200,'',''),(201,'30',''),(202,'30','500g'),(203,'20',''),(204,'volume','500ml'),(205,'quantity','100'),(206,'iphone','200'),(207,'',''),(208,'',''),(209,'band','UHF/VHF'),(209,'Wi-Fi','2,4/5,0 GHz'),(209,'Bluetooth','5.2'),(209,'ŒüŒ∏œåŒΩŒ∑','2,4‚Äù 320 x 240 px. QVGA'),(209,'Œ¥ŒπŒ¨œÅŒ∫ŒµŒπŒ± Œ∂œâŒÆœÇ œÑŒ∑œÇ ŒºœÄŒ±œÑŒ±œÅŒØŒ±œÇ','28 œéœÅŒµœÇ'),(210,'Frequency','140-150Mhz'),(210,'Power Supply','13VDC /- 1V 40A'),(210,'Output RF Power (Nominal)','30 ‚Äì 210W ; 230W max AM/FM/CW'),(210,'Modulation Types','SSB,CW,AM, FM, data etc (All narrowband modes)'),(211,'PART NUMBER','C14Y016X016-T'),(211,'CONTRACTOR NAME:','CELINA Tent, Inc'),(211,'COLOR','Tan'),(211,'SET-UP TIME/NUMBER OF PERSONS','4 People/30 Minutes'),(212,'dimensions',' 20‚Äôx32.5‚Äô'),(212,'TYPE','Frame Structure, Expandable, Air-Transportable'),(212,'WEIGHT','1,200 lbs'),(213,'TYPE','Frame Structure, Expandable, Air- Transportable'),(213,'DIMENSIONS','E I-40‚Äôx80‚Äô'),(213,'WEIGHT','24,000 lbs'),(214,'',''),(215,'',''),(216,'',''),(217,'',''),(218,'weight','1k'),(219,'weight','1k'),(220,'',''),(221,'',''),(222,'',''),(223,'',''),(224,'',''),(225,'',''),(226,'',''),(227,'',''),(228,'',''),(229,'size','1.90X60'),(230,'light','blue'),(231,'pack','60'),(232,'Volts','208'),(233,'material','plastic'),(234,'Type','Digital'),(235,'Material','Paper'),(236,'Type','Waterproof'),(237,'1','1'),(237,'',''),(238,'','5'),(239,'','10'),(240,'',''),(241,'6','1500ml'),(242,'2','80g'),(243,'3','100g'),(244,'1','800g'),(245,'1',''),(246,'',''),(247,'',''),(248,'',''),(249,'',''),(250,'',''),(251,'',''),(252,'',''),(253,'AAA','5'),(254,'',''),(255,'1','200ml'),(256,'',''),(257,'',''),(258,'',''),(259,'',''),(260,'',''),(261,'',''),(262,'',''),(263,'',''),(264,'',''),(265,'',''),(266,'',''),(267,'',''),(268,'pages','230'),(269,'','1kg'),(270,'',''),(271,'',''),(272,'galons','20'),(273,'quantity','5'),(274,'',''),(275,'test item ','1kg'),(276,'volume','500ml'),(276,'',''),(277,'pills','60 pills'),(278,'',''),(278,'',''),(279,'',''),(279,'',''),(280,'',''),(281,'',''),(282,'',''),(283,'',''),(284,'',''),(285,'','');
/*!40000 ALTER TABLE `item_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-01 20:44:17
