-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 03, 2019 at 09:11 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `fil_rouge`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `is_available` tinyint(1) NOT NULL,
  `parution_date` date NOT NULL,
  `quantity` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `is_available`, `parution_date`, `quantity`) VALUES
(1, 'Harry Potter, I : Harry Potter à l\'école des sorciers', 1, '2019-10-14', 5),
(2, 'Un(e)secte', 0, '2019-12-16', 0),
(3, 'Le livre qui t\'explique enfin tout sur les parents', 1, '2019-08-13', 12),
(4, 'Une mission Fortnite dont tu es le héros', 1, '2019-07-14', 3),
(5, 'Petit Livre de - 150 idées pour emmerder ses collègues', 0, '2019-08-05', 0),
(6, 'Le Bonheur n\'a pas de rides', 1, '2019-05-14', 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
