-- phpMyAdmin SQL Dump

SET FOREIGN_KEY_CHECKS=0;

--
-- Database: `med-scheduler`
--


INSERT INTO `Doctor` (`id`, `name`, `email`, `gender`, `birthday`) VALUES
('00d8258b-f39e-4c4f-b0a3-51ce55580a0d', 'Super Doctor', 'johndoe@example.com', 'male', '2000-01-01 00:00:00.000'),
('fdd0b842-ad87-4915-8295-18b024ee2a1e', 'Doctor Name', 'johndoe1@example.com', 'male', '2000-01-01 00:00:00.000');


INSERT INTO `DoctorSpecsPrice` (`id`, `doctor_id`, `price`, `spec_id`, `work_end_time`, `work_start_time`) VALUES
('ed38b36f-e85e-4874-913d-cc40ce7a47d9', 'fdd0b842-ad87-4915-8295-18b024ee2a1e', 150, '893294c6-340f-49f8-b491-375a30ca7324', '21:00', '10:00');


INSERT INTO `Patient` (`id`, `phone`, `name`, `email`, `gender`, `birthday`) VALUES
('cac554f7-a1ac-40fb-8713-cb50aa2bee8e', '+1234567890', 'Patient Name', 'johndoe@example.com', 'male', '2000-01-01 00:00:00.000');


INSERT INTO `Schedule` (`id`, `patient_id`, `type`, `startTime`, `timeSlotId`, `length`) VALUES
('79de6ebd-3923-4ac6-8a30-ef80f1c79856', 'cac554f7-a1ac-40fb-8713-cb50aa2bee8e', 0, '2025-08-01 10:00:00.000', '6c58fd0d-b2c0-42f6-8e1f-df89bca3026c', 60),
('d1f35676-ac31-45ef-9827-418f97230721', 'cac554f7-a1ac-40fb-8713-cb50aa2bee8e', 0, '2025-08-01 11:00:00.000', '6c58fd0d-b2c0-42f6-8e1f-df89bca3026c', 30);


INSERT INTO `Spec` (`id`, `name`) VALUES
('00e6aae3-030b-4ca6-9cd5-60fa50c080a2', 'Neurology'),
('26f05d84-3d80-4482-af32-348abdc45c42', 'Teraphy'),
('893294c6-340f-49f8-b491-375a30ca7324', 'Rentgen'),
('c25388ff-333b-41e6-ab71-b1ab6214ed4a', 'Cardiology');


INSERT INTO `TimeSlot` (`id`, `startTime`, `endTime`, `isAvailable`, `doctorSpecsPriceId`) VALUES
('6c58fd0d-b2c0-42f6-8e1f-df89bca3026c', '2025-08-01 10:00:00.000', '2025-08-01 11:30:00.000', 1, 'ed38b36f-e85e-4874-913d-cc40ce7a47d9'),
('8a335fb2-3768-4845-8b20-0d4cb431e0af', '2024-08-01 10:00:00.000', '2024-08-01 15:30:00.000', 1, 'ed38b36f-e85e-4874-913d-cc40ce7a47d9'),
('a01e885e-827d-4e27-b9c3-3b054de02a4e', '2024-08-01 15:45:00.000', '2024-08-01 21:00:00.000', 1, 'ed38b36f-e85e-4874-913d-cc40ce7a47d9');


SET FOREIGN_KEY_CHECKS=1;
