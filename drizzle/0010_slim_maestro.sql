CREATE TABLE `maintenance_spaces` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `maintenance_spaces_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_openId_unique`;--> statement-breakpoint
ALTER TABLE `consumable_monthly_movements` DROP FOREIGN KEY `consumable_monthly_movements_consumableId_consumables_with_space_id_fk`;
--> statement-breakpoint
ALTER TABLE `consumable_monthly_movements` DROP FOREIGN KEY `consumable_monthly_movements_spaceId_consumable_spaces_id_fk`;
--> statement-breakpoint
ALTER TABLE `consumable_stock_audit_log` DROP FOREIGN KEY `consumable_stock_audit_log_consumableWeeklyMovementId_consumable_weekly_movements_id_fk`;
--> statement-breakpoint
ALTER TABLE `consumable_stock_audit_log` DROP FOREIGN KEY `consumable_stock_audit_log_consumableId_consumables_with_space_id_fk`;
--> statement-breakpoint
ALTER TABLE `consumable_stock_audit_log` DROP FOREIGN KEY `consumable_stock_audit_log_spaceId_consumable_spaces_id_fk`;
--> statement-breakpoint
ALTER TABLE `consumable_stock_audit_log` DROP FOREIGN KEY `consumable_stock_audit_log_userId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `consumable_weekly_movements` DROP FOREIGN KEY `consumable_weekly_movements_consumableId_consumables_with_space_id_fk`;
--> statement-breakpoint
ALTER TABLE `consumable_weekly_movements` DROP FOREIGN KEY `consumable_weekly_movements_spaceId_consumable_spaces_id_fk`;
--> statement-breakpoint
ALTER TABLE `consumable_monthly_movements` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `consumable_spaces` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `consumable_stock_audit_log` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `consumable_weekly_movements` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `consumables` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `consumables_monthly` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `consumables_weekly` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `consumables_with_space` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `contract_alerts` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `contract_spaces` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `contracts` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `contracts_with_space` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `inventory` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `inventory_movements` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `maintenance_requests` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `room_reservations` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `rooms` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `schedules` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `supplier_spaces` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `suppliers` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `suppliers_with_space` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `teams` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `users` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `consumable_monthly_movements` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `consumable_spaces` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `consumable_stock_audit_log` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `consumable_weekly_movements` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `consumables` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `consumables_monthly` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `consumables_weekly` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `consumables_with_space` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `contract_alerts` MODIFY COLUMN `isResolved` int NOT NULL;--> statement-breakpoint
ALTER TABLE `contract_alerts` MODIFY COLUMN `isResolved` int NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `contract_alerts` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `contract_spaces` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `contracts` MODIFY COLUMN `value` decimal(10,2);--> statement-breakpoint
ALTER TABLE `contracts` MODIFY COLUMN `endDate` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `contracts` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `contracts` MODIFY COLUMN `updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `contracts_with_space` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `inventory` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `inventory_movements` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `maintenance_requests` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `room_reservations` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `rooms` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `schedules` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `supplier_spaces` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `suppliers` MODIFY COLUMN `serviceTypes` json NOT NULL;--> statement-breakpoint
ALTER TABLE `suppliers` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `suppliers_with_space` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `teams` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `lastSignedIn` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `maintenance_requests` ADD `spaceId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `contracts_with_space` ADD CONSTRAINT `contracts_with_space_spaceId_consumable_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `consumable_spaces`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `maintenance_requests` ADD CONSTRAINT `maintenance_requests_spaceId_maintenance_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `maintenance_spaces`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `users_openId_unique` ON `users` (`openId`);