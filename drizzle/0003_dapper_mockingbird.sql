CREATE TABLE `consumable_spaces` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`location` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consumable_spaces_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consumables_with_space` (
	`id` int AUTO_INCREMENT NOT NULL,
	`spaceId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`unit` varchar(50) NOT NULL,
	`minStock` int NOT NULL DEFAULT 0,
	`maxStock` int NOT NULL DEFAULT 0,
	`currentStock` int NOT NULL DEFAULT 0,
	`replenishStock` int NOT NULL DEFAULT 0,
	`status` enum('ESTOQUE_OK','ACIMA_DO_ESTOQUE','REPOR_ESTOQUE') NOT NULL DEFAULT 'ESTOQUE_OK',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consumables_with_space_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `consumables_with_space` ADD CONSTRAINT `consumables_with_space_spaceId_consumable_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `consumable_spaces`(`id`) ON DELETE no action ON UPDATE no action;