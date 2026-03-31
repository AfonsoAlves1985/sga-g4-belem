ALTER TABLE `rooms` ADD `responsibleUserId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `rooms` ADD `startDate` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `rooms` ADD `endDate` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `rooms` ADD `startTime` varchar(5) NOT NULL;--> statement-breakpoint
ALTER TABLE `rooms` ADD `endTime` varchar(5) NOT NULL;--> statement-breakpoint
ALTER TABLE `rooms` ADD `updatedAt` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_responsibleUserId_users_id_fk` FOREIGN KEY (`responsibleUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;