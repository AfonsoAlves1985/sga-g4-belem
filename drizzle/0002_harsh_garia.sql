CREATE TABLE `consumables` (
	`id` int AUTO_INCREMENT NOT NULL,
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
	CONSTRAINT `consumables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consumables_monthly` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consumableId` int NOT NULL,
	`monthStartDate` datetime NOT NULL,
	`minStock` int NOT NULL,
	`maxStock` int NOT NULL,
	`currentStock` int NOT NULL,
	`replenishStock` int NOT NULL,
	`status` enum('ESTOQUE_OK','ACIMA_DO_ESTOQUE','REPOR_ESTOQUE') NOT NULL DEFAULT 'ESTOQUE_OK',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consumables_monthly_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consumables_weekly` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consumableId` int NOT NULL,
	`weekStartDate` datetime NOT NULL,
	`minStock` int NOT NULL,
	`maxStock` int NOT NULL,
	`currentStock` int NOT NULL,
	`replenishStock` int NOT NULL,
	`status` enum('ESTOQUE_OK','ACIMA_DO_ESTOQUE','REPOR_ESTOQUE') NOT NULL DEFAULT 'ESTOQUE_OK',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consumables_weekly_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `consumables_monthly` ADD CONSTRAINT `consumables_monthly_consumableId_consumables_id_fk` FOREIGN KEY (`consumableId`) REFERENCES `consumables`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `consumables_weekly` ADD CONSTRAINT `consumables_weekly_consumableId_consumables_id_fk` FOREIGN KEY (`consumableId`) REFERENCES `consumables`(`id`) ON DELETE no action ON UPDATE no action;