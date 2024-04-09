-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/

-- Create a new user 'sid1' with a password 'dbpassword'
USE mysql;
CREATE USER IF NOT EXISTS 'sid1'@'%' IDENTIFIED BY 'dbpassword';
GRANT ALL PRIVILEGES ON renewable_energy_app.* TO 'sid1'@'%';
FLUSH PRIVILEGES;

-- init-db.sql
CREATE DATABASE IF NOT EXISTS renewable_energy_app;
USE renewable_energy_app;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `renewable_energy_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `energy_consumption`
--

CREATE TABLE `energy_consumption` (
  `data_id` int(10) NOT NULL,
  `recorded_time` varchar(100) NOT NULL,
  `consumption` int(10) DEFAULT NULL,
  `generation` int(10) NOT NULL,
  `energy_source` varchar(20) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `energy_consumption`
--

INSERT INTO `energy_consumption` (`data_id`, `recorded_time`, `consumption`, `generation`, `energy_source`, `state`) VALUES
(1, '2024-03-26 12:35:09.253637', 575, 742, 'solar', 'Illinois'),
(2, '2024-03-26 13:35:09.253637', 1151, 184, 'wind', 'Pennsylvania'),
(3, '2024-03-26 14:35:09.253637', 932, 262, 'solar', 'New York'),
(4, '2024-03-26 15:35:09.253637', 799, 999, 'solar', 'Illinois'),
(5, '2024-03-26 16:35:09.253637', 356, 706, 'wind', 'Ohio'),
(6, '2024-03-26 17:35:09.253637', 356, 109, 'solar', 'Illinois'),
(7, '2024-03-26 18:35:09.253637', 258, 201, 'wind', 'Illinois'),
(8, '2024-03-26 19:35:09.253637', 1066, 764, 'solar', 'Illinois'),
(9, '2024-03-26 20:35:09.253637', 801, 105, 'hydro', 'Michigan'),
(10, '2024-03-26 21:35:09.253637', 908, 261, 'hydro', 'Michigan'),
(11, '2024-03-26 22:35:09.253637', 221, 649, 'solar', 'New York'),
(12, '2024-03-26 23:35:09.253637', 1170, 792, 'solar', 'California'),
(13, '2024-03-27 00:35:09.253637', 1032, 752, 'solar', 'Illinois'),
(14, '2024-03-27 01:35:09.253637', 412, 324, 'hydro', 'North Carolina'),
(15, '2024-03-27 02:35:09.253637', 382, 812, 'solar', 'California'),
(16, '2024-03-27 03:35:09.253637', 383, 337, 'hydro', 'New York'),
(17, '2024-03-27 04:35:09.253637', 504, 425, 'wind', 'Florida'),
(18, '2024-03-27 05:35:09.253637', 725, 846, 'hydro', 'California'),
(19, '2024-03-27 06:35:09.253637', 632, 750, 'hydro', 'California'),
(20, '2024-03-27 07:35:09.253637', 491, 949, 'wind', 'Georgia'),
(21, '2024-03-27 08:35:09.253637', 812, 758, 'hydro', 'Texas'),
(22, '2024-03-27 09:35:09.253637', 339, 668, 'solar', 'Georgia'),
(23, '2024-03-27 10:35:09.253637', 492, 194, 'solar', 'Ohio'),
(24, '2024-03-27 11:35:09.253637', 566, 468, 'hydro', 'Michigan'),
(25, '2024-03-27 12:35:09.253637', 656, 365, 'solar', 'Michigan'),
(26, '2024-03-27 13:35:09.253637', 985, 344, 'hydro', 'Texas'),
(27, '2024-03-27 14:35:09.253637', 400, 1073, 'solar', 'Pennsylvania'),
(28, '2024-03-27 15:35:09.253637', 714, 493, 'solar', 'Pennsylvania'),
(29, '2024-03-27 16:35:09.253637', 792, 992, 'hydro', 'New York'),
(30, '2024-03-27 17:35:09.253637', 246, 731, 'solar', 'Texas'),
(31, '2024-03-27 18:35:09.253637', 808, 895, 'hydro', 'California'),
(32, '2024-03-27 19:35:09.253637', 371, 603, 'solar', 'Pennsylvania'),
(33, '2024-03-27 20:35:09.253637', 265, 677, 'solar', 'Illinois'),
(34, '2024-03-27 21:35:09.253637', 1149, 593, 'wind', 'North Carolina'),
(35, '2024-03-27 22:35:09.253637', 1166, 295, 'wind', 'California'),
(36, '2024-03-27 23:35:09.253637', 1008, 822, 'hydro', 'Ohio'),
(37, '2024-03-28 00:35:09.253637', 505, 381, 'wind', 'Illinois'),
(38, '2024-03-28 01:35:09.253637', 298, 124, 'hydro', 'Illinois'),
(39, '2024-03-28 02:35:09.253637', 884, 745, 'wind', 'Texas'),
(40, '2024-03-28 03:35:09.253637', 640, 277, 'solar', 'New York'),
(41, '2024-03-28 04:35:09.253637', 322, 1040, 'hydro', 'Ohio'),
(42, '2024-03-28 05:35:09.253637', 695, 1054, 'hydro', 'Pennsylvania'),
(43, '2024-03-28 06:35:09.253637', 234, 1015, 'solar', 'Texas'),
(44, '2024-03-28 07:35:09.253637', 1109, 470, 'hydro', 'Pennsylvania'),
(45, '2024-03-28 08:35:09.253637', 459, 115, 'hydro', 'Texas'),
(46, '2024-03-28 09:35:09.253637', 863, 1028, 'wind', 'Texas'),
(47, '2024-03-28 10:35:09.253637', 512, 528, 'hydro', 'Texas'),
(48, '2024-03-28 11:35:09.253637', 720, 1067, 'solar', 'New York'),
(49, '2024-03-28 12:35:09.253637', 747, 1064, 'wind', 'Texas'),
(50, '2024-03-28 13:35:09.253637', 385, 953, 'wind', 'Florida'),
(51, '2024-03-28 14:35:09.253637', 1170, 394, 'solar', 'North Carolina'),
(52, '2024-03-28 15:35:09.253637', 975, 485, 'solar', 'Pennsylvania'),
(53, '2024-03-28 16:35:09.253637', 1140, 951, 'wind', 'California'),
(54, '2024-03-28 17:35:09.253637', 1095, 417, 'hydro', 'Georgia'),
(55, '2024-03-28 18:35:09.253637', 798, 269, 'wind', 'Ohio'),
(56, '2024-03-28 19:35:09.253637', 1122, 657, 'solar', 'Michigan'),
(57, '2024-03-28 20:35:09.253637', 288, 1036, 'wind', 'New York'),
(58, '2024-03-28 21:35:09.253637', 396, 796, 'solar', 'California'),
(59, '2024-03-28 22:35:09.253637', 245, 670, 'wind', 'Illinois'),
(60, '2024-03-28 23:35:09.253637', 525, 197, 'hydro', 'Florida'),
(61, '2024-03-29 00:35:09.253637', 589, 715, 'wind', 'Michigan'),
(62, '2024-03-29 01:35:09.253637', 471, 1090, 'wind', 'Georgia'),
(63, '2024-03-29 02:35:09.253637', 1029, 240, 'solar', 'California'),
(64, '2024-03-29 03:35:09.253637', 557, 618, 'solar', 'Michigan'),
(65, '2024-03-29 04:35:09.253637', 481, 977, 'solar', 'California'),
(66, '2024-03-29 05:35:09.253637', 743, 841, 'wind', 'Florida'),
(67, '2024-03-29 06:35:09.253637', 341, 797, 'hydro', 'Georgia'),
(68, '2024-03-29 07:35:09.253637', 1002, 802, 'solar', 'Illinois'),
(69, '2024-03-29 08:35:09.253637', 275, 459, 'solar', 'Texas'),
(70, '2024-03-29 09:35:09.253637', 1187, 394, 'wind', 'Pennsylvania'),
(71, '2024-03-29 10:35:09.253637', 972, 909, 'solar', 'Illinois'),
(72, '2024-03-29 11:35:09.253637', 399, 910, 'hydro', 'Texas'),
(73, '2024-03-29 12:35:09.253637', 206, 967, 'hydro', 'New York'),
(74, '2024-03-29 13:35:09.253637', 1015, 1013, 'solar', 'North Carolina'),
(75, '2024-03-29 14:35:09.253637', 907, 611, 'solar', 'Ohio'),
(76, '2024-03-29 15:35:09.253637', 929, 602, 'wind', 'Ohio'),
(77, '2024-03-29 16:35:09.253637', 971, 898, 'hydro', 'Pennsylvania'),
(78, '2024-03-29 17:35:09.253637', 274, 750, 'hydro', 'Georgia'),
(79, '2024-03-29 18:35:09.253637', 558, 802, 'solar', 'Florida'),
(80, '2024-03-29 19:35:09.253637', 316, 896, 'wind', 'Georgia'),
(81, '2024-03-29 20:35:09.253637', 1063, 990, 'hydro', 'Florida'),
(82, '2024-03-29 21:35:09.253637', 823, 438, 'hydro', 'Georgia'),
(83, '2024-03-29 22:35:09.253637', 531, 476, 'wind', 'North Carolina'),
(84, '2024-03-29 23:35:09.253637', 264, 194, 'wind', 'New York'),
(85, '2024-03-30 00:35:09.253637', 511, 678, 'hydro', 'New York'),
(86, '2024-03-30 01:35:09.253637', 525, 136, 'hydro', 'Texas'),
(87, '2024-03-30 02:35:09.253637', 930, 566, 'wind', 'Michigan'),
(88, '2024-03-30 03:35:09.253637', 838, 643, 'hydro', 'New York'),
(89, '2024-03-30 04:35:09.253637', 1087, 387, 'solar', 'New York'),
(90, '2024-03-30 05:35:09.253637', 672, 691, 'solar', 'Illinois'),
(91, '2024-03-30 06:35:09.253637', 320, 131, 'wind', 'Illinois'),
(92, '2024-03-30 07:35:09.253637', 913, 137, 'wind', 'Texas'),
(93, '2024-03-30 08:35:09.253637', 961, 923, 'wind', 'Michigan'),
(94, '2024-03-30 09:35:09.253637', 761, 460, 'solar', 'Pennsylvania'),
(95, '2024-03-30 10:35:09.253637', 971, 227, 'hydro', 'Illinois'),
(96, '2024-03-30 11:35:09.253637', 694, 622, 'solar', 'Pennsylvania'),
(97, '2024-03-30 12:35:09.253637', 723, 870, 'hydro', 'California'),
(98, '2024-03-30 13:35:09.253637', 628, 316, 'solar', 'Illinois'),
(99, '2024-03-30 14:35:09.253637', 225, 723, 'hydro', 'North Carolina'),
(100, '2024-03-30 15:35:09.253637', 308, 185, 'solar', 'Michigan'),
(101, '2024-03-30 16:35:09.253637', 231, 152, 'wind', 'Texas'),
(102, '2024-03-30 17:35:09.253637', 836, 631, 'solar', 'California'),
(103, '2024-03-30 18:35:09.253637', 514, 641, 'hydro', 'Michigan'),
(104, '2024-03-30 19:35:09.253637', 709, 737, 'solar', 'North Carolina'),
(105, '2024-03-30 20:35:09.253637', 1108, 826, 'solar', 'Michigan'),
(106, '2024-03-30 21:35:09.253637', 449, 1076, 'solar', 'North Carolina'),
(107, '2024-03-30 22:35:09.253637', 610, 616, 'wind', 'North Carolina'),
(108, '2024-03-30 23:35:09.253637', 956, 423, 'solar', 'Pennsylvania'),
(109, '2024-03-31 00:35:09.253637', 429, 895, 'wind', 'Georgia'),
(110, '2024-03-31 01:35:09.253637', 277, 371, 'wind', 'California'),
(111, '2024-03-31 02:35:09.253637', 490, 539, 'solar', 'Michigan'),
(112, '2024-03-31 03:35:09.253637', 361, 178, 'solar', 'Florida'),
(113, '2024-03-31 04:35:09.253637', 1130, 125, 'solar', 'California'),
(114, '2024-03-31 05:35:09.253637', 1008, 1063, 'hydro', 'Georgia'),
(115, '2024-03-31 06:35:09.253637', 833, 936, 'solar', 'California'),
(116, '2024-03-31 07:35:09.253637', 1071, 796, 'wind', 'New York'),
(117, '2024-03-31 08:35:09.253637', 1004, 509, 'solar', 'Florida'),
(118, '2024-03-31 09:35:09.253637', 387, 273, 'hydro', 'Georgia'),
(119, '2024-03-31 10:35:09.253637', 1093, 256, 'solar', 'Pennsylvania'),
(120, '2024-03-31 11:35:09.253637', 739, 350, 'hydro', 'Michigan'),
(121, '2024-03-31 12:35:09.253637', 1007, 649, 'hydro', 'Ohio'),
(122, '2024-03-31 13:35:09.253637', 1096, 815, 'solar', 'Georgia'),
(123, '2024-03-31 14:35:09.253637', 518, 760, 'wind', 'Texas'),
(124, '2024-03-31 15:35:09.253637', 310, 380, 'hydro', 'Michigan'),
(125, '2024-03-31 16:35:09.253637', 428, 1055, 'solar', 'Georgia'),
(126, '2024-03-31 17:35:09.253637', 627, 838, 'solar', 'New York'),
(127, '2024-03-31 18:35:09.253637', 1018, 654, 'wind', 'Ohio'),
(128, '2024-03-31 19:35:09.253637', 1061, 712, 'hydro', 'New York'),
(129, '2024-03-31 20:35:09.253637', 207, 520, 'hydro', 'Ohio'),
(130, '2024-03-31 21:35:09.253637', 711, 348, 'solar', 'Texas'),
(131, '2024-03-31 22:35:09.253637', 617, 456, 'solar', 'Michigan'),
(132, '2024-03-31 23:35:09.253637', 422, 858, 'wind', 'Pennsylvania'),
(133, '2024-04-01 00:35:09.253637', 320, 114, 'wind', 'New York'),
(134, '2024-04-01 01:35:09.253637', 538, 216, 'hydro', 'New York'),
(135, '2024-04-01 02:35:09.253637', 1143, 146, 'hydro', 'North Carolina'),
(136, '2024-04-01 03:35:09.253637', 523, 141, 'solar', 'Ohio'),
(137, '2024-04-01 04:35:09.253637', 719, 955, 'hydro', 'Illinois'),
(138, '2024-04-01 05:35:09.253637', 903, 804, 'wind', 'Michigan'),
(139, '2024-04-01 06:35:09.253637', 564, 574, 'wind', 'Ohio'),
(140, '2024-04-01 07:35:09.253637', 1172, 198, 'solar', 'North Carolina'),
(141, '2024-04-01 08:35:09.253637', 1162, 592, 'wind', 'California'),
(142, '2024-04-01 09:35:09.253637', 452, 573, 'wind', 'Ohio'),
(143, '2024-04-01 10:35:09.253637', 697, 273, 'wind', 'Pennsylvania'),
(144, '2024-04-01 11:35:09.253637', 501, 534, 'wind', 'Michigan'),
(145, '2024-04-01 12:35:09.253637', 485, 499, 'solar', 'North Carolina'),
(146, '2024-04-01 13:35:09.253637', 237, 716, 'solar', 'California'),
(147, '2024-04-01 14:35:09.253637', 810, 735, 'hydro', 'Florida'),
(148, '2024-04-01 15:35:09.253637', 703, 145, 'wind', 'North Carolina'),
(149, '2024-04-01 16:35:09.253637', 251, 475, 'hydro', 'Florida'),
(150, '2024-04-01 17:35:09.253637', 479, 726, 'solar', 'Michigan'),
(151, '2024-04-01 18:35:09.253637', 1108, 603, 'solar', 'New York'),
(152, '2024-04-01 19:35:09.253637', 440, 956, 'solar', 'North Carolina'),
(153, '2024-04-01 20:35:09.253637', 345, 759, 'solar', 'Texas'),
(154, '2024-04-01 21:35:09.253637', 689, 263, 'solar', 'Florida'),
(155, '2024-04-01 22:35:09.253637', 1186, 171, 'solar', 'Pennsylvania'),
(156, '2024-04-01 23:35:09.253637', 442, 742, 'solar', 'Texas'),
(157, '2024-04-02 00:35:09.253637', 872, 127, 'wind', 'Georgia'),
(158, '2024-04-02 01:35:09.253637', 962, 686, 'hydro', 'Georgia'),
(159, '2024-04-02 02:35:09.253637', 438, 1040, 'solar', 'California'),
(160, '2024-04-02 03:35:09.253637', 928, 675, 'wind', 'New York'),
(161, '2024-04-02 04:35:09.253637', 568, 488, 'wind', 'Michigan'),
(162, '2024-04-02 05:35:09.253637', 832, 743, 'hydro', 'North Carolina'),
(163, '2024-04-02 06:35:09.253637', 834, 558, 'solar', 'Illinois'),
(164, '2024-04-02 07:35:09.253637', 736, 646, 'hydro', 'Pennsylvania'),
(165, '2024-04-02 08:35:09.253637', 290, 1041, 'solar', 'Florida'),
(166, '2024-04-02 09:35:09.253637', 1035, 486, 'wind', 'Michigan'),
(167, '2024-04-02 10:35:09.253637', 521, 1061, 'wind', 'Texas'),
(168, '2024-04-02 11:35:09.253637', 387, 1005, 'wind', 'Georgia'),
(169, '2024-04-02 12:35:09.253637', 241, 296, 'wind', 'Pennsylvania'),
(170, '2024-04-02 13:35:09.253637', 791, 169, 'hydro', 'Illinois'),
(171, '2024-04-02 14:35:09.253637', 878, 201, 'solar', 'North Carolina'),
(172, '2024-04-02 15:35:09.253637', 217, 118, 'solar', 'California'),
(173, '2024-04-02 16:35:09.253637', 712, 194, 'hydro', 'Illinois'),
(174, '2024-04-02 17:35:09.253637', 427, 783, 'solar', 'Pennsylvania'),
(175, '2024-04-02 18:35:09.253637', 845, 171, 'wind', 'Illinois'),
(176, '2024-04-02 19:35:09.253637', 374, 419, 'solar', 'Pennsylvania'),
(177, '2024-04-02 20:35:09.253637', 891, 945, 'wind', 'Pennsylvania'),
(178, '2024-04-02 21:35:09.253637', 587, 123, 'hydro', 'Ohio'),
(179, '2024-04-02 22:35:09.253637', 1137, 914, 'solar', 'Florida'),
(180, '2024-04-02 23:35:09.253637', 338, 382, 'hydro', 'Georgia'),
(181, '2024-04-03 00:35:09.253637', 541, 218, 'solar', 'Ohio'),
(182, '2024-04-03 01:35:09.253637', 313, 797, 'wind', 'North Carolina'),
(183, '2024-04-03 02:35:09.253637', 1125, 729, 'hydro', 'Ohio'),
(184, '2024-04-03 03:35:09.253637', 1077, 977, 'solar', 'New York'),
(185, '2024-04-03 04:35:09.253637', 458, 835, 'wind', 'New York'),
(186, '2024-04-03 05:35:09.253637', 860, 903, 'hydro', 'Georgia'),
(187, '2024-04-03 06:35:09.253637', 1017, 382, 'hydro', 'Illinois'),
(188, '2024-04-03 07:35:09.253637', 755, 277, 'solar', 'Florida'),
(189, '2024-04-03 08:35:09.253637', 730, 851, 'solar', 'Georgia'),
(190, '2024-04-03 09:35:09.253637', 442, 907, 'solar', 'Pennsylvania'),
(191, '2024-04-03 10:35:09.253637', 293, 1091, 'wind', 'Texas'),
(192, '2024-04-03 11:35:09.253637', 1097, 513, 'solar', 'Florida'),
(193, '2024-04-03 12:35:09.253637', 1100, 472, 'hydro', 'Florida'),
(194, '2024-04-03 13:35:09.253637', 833, 876, 'hydro', 'Pennsylvania'),
(195, '2024-04-03 14:35:09.253637', 539, 441, 'solar', 'Pennsylvania'),
(196, '2024-04-03 15:35:09.253637', 549, 1031, 'solar', 'California'),
(197, '2024-04-03 16:35:09.253637', 926, 958, 'hydro', 'Georgia'),
(198, '2024-04-03 17:35:09.253637', 1097, 529, 'wind', 'Pennsylvania'),
(199, '2024-04-03 18:35:09.253637', 1087, 851, 'solar', 'New York'),
(200, '2024-04-03 19:35:09.253637', 980, 855, 'solar', 'North Carolina');

-- --------------------------------------------------------

--
-- Table structure for table `energy_data`
--

CREATE TABLE `energy_data` (
  `data_id` int(11) NOT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  `consumption` float DEFAULT NULL,
  `generation` float DEFAULT NULL,
  `energy_source` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hashed` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `filters` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`filters`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password_hashed`, `fullname`, `created_at`, `filters`) VALUES
(1, 'user1', 'user1@example.com', 'hashed_password_1', 'User One', '2024-04-03 17:14:34', '{}'),
(2, 'user2', 'user2@example.com', 'hashed_password_2', 'User Two', '2024-04-03 17:14:34', '{}'),
(3, 'user3', 'user3@example.com', 'hashed_password_3', 'User Three', '2024-04-03 17:14:34', '{}'),
(4, 'user4', 'user4@example.com', 'hashed_password_4', 'User Four', '2024-04-03 17:14:34', '{}'),
(5, 'user5', 'user5@example.com', 'hashed_password_5', 'User Five', '2024-04-03 17:14:34', '{}'),
(6, 'hello', 'sid@gmail.com', '$2b$12$Sr4I5Ijm.jZjOjxNUoZfrubM158v2jG6g3jL3c.50KvYZbYamAm02', 'asnefja', '2024-04-05 03:05:48', '\"{}\"'),
(7, 'sbhande', 'sbhande@gmail.com', '$2b$12$GM51fp3o6YzIwtJu7ot8lunfXRaENciXDAIbW3fzhHJ9/bn5sd49a', 'Siddhesh Bhande', '2024-04-05 03:12:26', '{\"states\": [\"Michigan\", \"California\", \"Ohio\", \"New York\", \"Pennsylvania\"], \"sources\": [\"solar\", \"wind\"]}'),
(8, 'soeqwq', 'soe@gmail.com', '$2b$12$6tIhOeUF9em/TPxmyIRgMeDQLEFYQ/lZOcXFpQA/LeHfBLcPRF/Kq', 'someuser', '2024-04-06 05:56:27', '\"{}\"');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `energy_consumption`
--
ALTER TABLE `energy_consumption`
  ADD PRIMARY KEY (`data_id`);

--
-- Indexes for table `energy_data`
--
ALTER TABLE `energy_data`
  ADD PRIMARY KEY (`data_id`),
  ADD KEY `ix_energy_data_timestamp` (`timestamp`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `energy_consumption`
--
ALTER TABLE `energy_consumption`
  MODIFY `data_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `energy_data`
--
ALTER TABLE `energy_data`
  MODIFY `data_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
