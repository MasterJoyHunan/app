/*
Navicat MySQL Data Transfer

Source Server         : outline环球惠
Source Server Version : 50719
Source Host           : 192.168.0.50:3306
Source Database       : twy4

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-05-22 17:39:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sk_money_record
-- ----------------------------
DROP TABLE IF EXISTS `sk_money_record`;
CREATE TABLE `sk_money_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `money` decimal(10,2) DEFAULT NULL COMMENT '多少钱',
  `left_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '当前剩余金额',
  `memo` varchar(255) DEFAULT NULL COMMENT '记录详情',
  `money_type` tinyint(1) DEFAULT '0' COMMENT '0=>其他币种, 1=>amoney, 2=>bmoney , 3=>cmoney',
  `type` tinyint(1) DEFAULT NULL COMMENT '类型',
  `add_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `type` (`type`),
  KEY `money` (`money`) USING BTREE,
  KEY `money_type` (`money_type`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1010983 DEFAULT CHARSET=utf8;
