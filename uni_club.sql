-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2026 at 01:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uni_club`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `a_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `time` date NOT NULL,
  `des` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`a_id`, `title`, `category`, `time`, `des`) VALUES
(2, 'Group Study', 'General', '2026-10-05', 'Group Study for the next up coming exam in gungahlin library. Bring your notes!'),
(3, 'Run a Marathon', 'Events', '2026-10-05', 'Run a Marathon around Gungahlin place.'),
(4, 'Sports Tournament', 'Events', '2026-10-05', 'A Footie Tournament! Here in Gungahlin!'),
(5, 'test', 'General', '2026-10-05', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `announcement_requests`
--

CREATE TABLE `announcement_requests` (
  `r_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `category` varchar(50) NOT NULL,
  `des` varchar(2000) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Pending',
  `r_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement_requests`
--

INSERT INTO `announcement_requests` (`r_id`, `student_id`, `title`, `category`, `des`, `status`, `r_date`) VALUES
(1, 1234564, 'test', 'General', 'test', 'Rejected', '2026-10-05 20:41:53'),
(2, 1234564, 'test', 'General', 'test', 'Approved', '2026-10-05 20:44:31');

-- --------------------------------------------------------

--
-- Table structure for table `auditlog`
--

CREATE TABLE `auditlog` (
  `audit_id` int(10) NOT NULL,
  `user` int(10) NOT NULL,
  `time` int(11) NOT NULL DEFAULT current_timestamp(),
  `reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(10) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `time` int(11) NOT NULL DEFAULT current_timestamp(),
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(10) NOT NULL,
  `roles` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `roles`) VALUES
(1, 'admin'),
(2, 'student');

-- --------------------------------------------------------

--
-- Table structure for table `sign_up`
--

CREATE TABLE `sign_up` (
  `student_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` int(10) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sign_up`
--

INSERT INTO `sign_up` (`student_id`, `name`, `email`, `password`, `roles`) VALUES
(123456, '123456', '123@123.com', '$2y$10$n1tSRl4GOPUrsZ2rGJWrBug9vwpg3W6gag4Sy3Mkby74/Hh8jlNHy', 2),
(1234561, '1234561', '123123@123.com', '$2y$10$kz0cnIr4/hR7K7vxHZ9PR.QRRFFR594kDDrp7qo161K2Ex3Uy/skq', 2),
(1234562, 'a', 'a@a.com', '$2y$10$opqAbkT/JKMvNTYNaOf6aOYYpu8kWMLWsf4OGWSEeolv7QYXbZ816', 2),
(1234563, 'admin', 'admin@a.com', '$2y$10$zbQ.MvGcmQMWWQinpFw.1OFdig835UCXm0zv0H7fJauO.r1lhoSlG', 1),
(1234564, 'student', 'student@a.com', '$2y$10$4guo3vEdri4.7nKFQpcNGuYMWtkNKuquiv3rr0315HgRkwxYBru6K', 2),
(1234565, 'test', 'test@a.com', '$2y$10$jV283m.eOOKJhOPIdzH9H.YZZQ6P/y2KITPTU8yyo9UN0XiJI3nCq', 2);

-- --------------------------------------------------------

--
-- Table structure for table `userlogin`
--

CREATE TABLE `userlogin` (
  `id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`a_id`);

--
-- Indexes for table `announcement_requests`
--
ALTER TABLE `announcement_requests`
  ADD PRIMARY KEY (`r_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `auditlog`
--
ALTER TABLE `auditlog`
  ADD PRIMARY KEY (`audit_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `sign_up`
--
ALTER TABLE `sign_up`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `userlogin`
--
ALTER TABLE `userlogin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `announcement_requests`
--
ALTER TABLE `announcement_requests`
  MODIFY `r_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `auditlog`
--
ALTER TABLE `auditlog`
  MODIFY `audit_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sign_up`
--
ALTER TABLE `sign_up`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1234566;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcement_requests`
--
ALTER TABLE `announcement_requests`
  ADD CONSTRAINT `announcement_requests_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `sign_up` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
