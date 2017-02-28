-- CS361 Project B
-- Table Creation

USE `ebdb`;

-- For testing purposes, drop all tables

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `charities`;

DROP TABLE IF EXISTS `users`;

DROP TABLE IF EXISTS `donations`;

DROP TABLE IF EXISTS `payments`;
SET FOREIGN_KEY_CHECKS=1;

-- table creation queries

-- create charities table
    
CREATE TABLE `charities` (
    `cid` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(64) NOT NULL DEFAULT '',
    `city` varchar(128) NOT NULL DEFAULT '',
    `state` varchar(128) NOT NULL DEFAULT '',
    `description` text,
    PRIMARY KEY (`cid`),
    UNIQUE KEY (`name`)
)  ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- create payments table

CREATE TABLE `payments` (
  `pid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`pid`),
  UNIQUE KEY (`name`) 
)  ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- create user table
    
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL DEFAULT '',
  `last_name` varchar(30) NOT NULL DEFAULT '',
  `email` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(60) NOT NULL DEFAULT '',
  `active` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `salt` varchar(50) NOT NULL DEFAULT '',
  `cid` int(11) unsigned,
  `pid` int(11) unsigned,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  FOREIGN KEY (`cid`) REFERENCES `charities`(`cid`),
  FOREIGN KEY (`pid`) REFERENCES `payments`(`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- create Donations table

CREATE TABLE `donations` (
    `payid` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `amount` int(11) unsigned NOT NULL,
    `transaction` int(11) unsigned NOT NULL,
    `date` datetime NOT NULL,
    `cid` int(11) unsigned NOT NULL,
    `uid` int(11) unsigned NOT NULL,
    `pid` int(11) unsigned NOT NULL,
    PRIMARY KEY (`payid`)
    -- FOREIGN KEY(`cid`) REFERENCES `charities`(`cid`),
    -- FOREIGN KEY(`uid`) REFERENCES `users`(`id`),
    -- FOREIGN KEY(`pid`) REFERENCES `payments`(`pid`)
)   ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- create Charities for testing purposes

-- test insertion queries

-- create charities for testing purposes

INSERT INTO charities(`name`, `city`, `state`) values("Race for the Cure", "New York", "New York"), 
("Humans for the Homeless", "Hazelwood", "Missouri"), 
("Protect our Planet", "Bern", "Idaho"), 
("People for Pets", "Charlotte", "North Carolina"), 
("Care for the Children", "Hamburg", "Iowa"), 
("Clean Water California", "Marquette", "Michigan"), 
("Our Trees are in Trouble", "Sailor Springs", "Illinois"),
("We are the Wolfpack", "Gillette", "Wyoming"),
("Fresh Air For Everyone", "Lawrence", "Massachusetts"),
("Save the Manatees", "Fort Lauderdale", "Florida"),

("Assist the Elderly", "Omaha", "Nebraska"),

("Exhort the Unmotivated", "Reno", "Nevada"),
("Take a Bite out of Crime", "Chicago", "Illinois");

-- create payment providers for testing purposes

INSERT INTO payments(`name`) VALUES("First Bank"),
("MoneyCard"),
("Federal Credit Union"),
("Second Bank"),
("USA Bank"),
("ExplorationCard"),
("Triple Platinum Card"),
("Local Retail Bank"),
("Third Bank"),
("National Chain"),
("CashDisc"),
("USBFunds"),
("MobilePay")

