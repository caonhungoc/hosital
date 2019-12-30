-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2019 at 07:54 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE `device` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `device_value`
--

CREATE TABLE `device_value` (
  `device_id` int(11) NOT NULL,
  `heart_rate` int(11) NOT NULL,
  `pp` int(11) NOT NULL,
  `time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `device_value`
--

INSERT INTO `device_value` (`device_id`, `heart_rate`, `pp`, `time`) VALUES
(2, 13, 12, '2019-12-15'),
(1, 100, 50, '2019-12-15'),
(2, 100, 321, '2019-12-15'),
(1, 100, 1, '2019-12-15'),
(1, 100, 50, '2019-12-15'),
(2, 100, 50, '2019-12-15'),
(1, 50, 50, '2019-12-15'),
(1, 100, 50, '2019-12-15'),
(1, 50, 50, '2019-12-15'),
(1, 13, 50, '2019-12-15');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id` int(11) NOT NULL,
  `user_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `major` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `reserve` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `user_name`, `password`, `major`, `name`, `reserve`) VALUES
(1, 'doctor1', '12345', 'cancer', 'Vô Danh', 1),
(2, 'doctor2', '12345', 'children', 'Vô Diện', 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `id_number` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `date_in` datetime NOT NULL,
  `date_out` datetime DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` tinyint(4) DEFAULT NULL,
  `nation` int(11) DEFAULT NULL,
  `insurance_id` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `insurance_from` datetime DEFAULT NULL,
  `insurance_to` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `id_number`, `device_id`, `date_in`, `date_out`, `name`, `phone_number`, `sex`, `nation`, `insurance_id`, `insurance_from`, `insurance_to`) VALUES
(10, 123123, 1, '2019-12-15 00:00:00', NULL, 'bg', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 26150089, 3, '2019-12-15 00:00:00', NULL, 'hi', NULL, NULL, NULL, NULL, NULL, NULL),
(12, 261500321, 4, '2019-12-15 00:00:00', NULL, 'bb', NULL, NULL, NULL, NULL, NULL, NULL),
(13, 12345, 1, '2019-12-15 00:00:00', NULL, 'hello', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 43241233, 6, '2019-12-15 00:00:00', NULL, 'cc', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 12312343, 32, '2019-12-15 00:00:00', NULL, 'nn', NULL, NULL, NULL, NULL, NULL, NULL),
(16, 261500312, 8, '2019-12-15 00:00:00', NULL, 'hh', NULL, NULL, NULL, NULL, NULL, NULL),
(17, 12312332, 10, '2019-12-15 00:00:00', NULL, 'dsa', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 1239, 312, '2019-12-15 00:00:00', NULL, '3213', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `treat`
--

CREATE TABLE `treat` (
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_guess` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `guess` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `treat_method` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `doctor_advice` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rs1` int(11) DEFAULT NULL,
  `rs2` int(11) DEFAULT NULL,
  `rs3` int(11) DEFAULT NULL,
  `rs4` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `treat`
--

INSERT INTO `treat` (`doctor_id`, `patient_id`, `doctor_guess`, `guess`, `treat_method`, `doctor_advice`, `rs1`, `rs2`, `rs3`, `rs4`) VALUES
(1, 10, 'undefined', NULL, 'x', NULL, NULL, NULL, NULL, NULL),
(1, 12, 'undefined', NULL, 'x', NULL, NULL, NULL, NULL, NULL),
(1, 13, 'undefined', NULL, 'bt', NULL, NULL, NULL, NULL, NULL),
(1, 15, 'undefined', NULL, 'x', NULL, NULL, NULL, NULL, NULL),
(1, 16, 'undefined', NULL, 'x', NULL, NULL, NULL, NULL, NULL),
(1, 17, 'undefined', NULL, 'x', NULL, NULL, NULL, NULL, NULL),
(1, 18, 'undefined', NULL, 'ho', NULL, NULL, NULL, NULL, NULL),
(2, 11, 'undefined', NULL, 'ho', NULL, NULL, NULL, NULL, NULL),
(2, 14, 'undefined', NULL, 'ho', NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `treat`
--
ALTER TABLE `treat`
  ADD PRIMARY KEY (`doctor_id`,`patient_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `device`
--
ALTER TABLE `device`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
