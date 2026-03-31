ALTER TABLE `rooms` MODIFY COLUMN `responsibleUserId` int;--> statement-breakpoint
ALTER TABLE `rooms` MODIFY COLUMN `startDate` datetime;--> statement-breakpoint
ALTER TABLE `rooms` MODIFY COLUMN `endDate` datetime;--> statement-breakpoint
ALTER TABLE `rooms` MODIFY COLUMN `startTime` varchar(5);--> statement-breakpoint
ALTER TABLE `rooms` MODIFY COLUMN `endTime` varchar(5);