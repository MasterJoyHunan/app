/*
Navicat MySQL Data Transfer

Source Server         : outline_环球惠商城
Source Server Version : 50719
Source Host           : 192.168.0.50:3306
Source Database       : twy5

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-05-19 17:02:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sk_address
-- ----------------------------
DROP TABLE IF EXISTS `sk_address`;
CREATE TABLE `sk_address` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `uid` int(9) DEFAULT NULL COMMENT '用户ID',
  `tel` varchar(50) DEFAULT NULL COMMENT '电话号码',
  `name` varchar(50) DEFAULT NULL COMMENT '收货人',
  `province` varchar(20) DEFAULT NULL COMMENT '省',
  `province_id` int(11) DEFAULT NULL COMMENT '省ID',
  `city` varchar(20) DEFAULT NULL COMMENT '市',
  `city_id` int(11) DEFAULT NULL COMMENT '市区ID',
  `area` varchar(20) DEFAULT NULL COMMENT '区',
  `area_id` int(11) DEFAULT NULL COMMENT '地区ID',
  `address` varchar(255) DEFAULT NULL COMMENT '详细地址',
  `is_default` tinyint(3) DEFAULT '0' COMMENT '是否是默认地址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
