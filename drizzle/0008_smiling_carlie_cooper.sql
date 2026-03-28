CREATE TABLE `contract_alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contractId` int NOT NULL,
	`spaceId` int NOT NULL,
	`alertType` enum('monthly_payment','contract_expiry') NOT NULL,
	`daysUntilEvent` int NOT NULL,
	`isResolved` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`resolvedAt` timestamp,
	CONSTRAINT `contract_alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contract_spaces` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`location` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contract_spaces_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contracts_with_space` (
	`id` int AUTO_INCREMENT NOT NULL,
	`spaceId` int NOT NULL,
	`contractId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contracts_with_space_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `supplier_spaces` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`location` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `supplier_spaces_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `contracts` DROP FOREIGN KEY `contracts_supplierId_suppliers_id_fk`;
--> statement-breakpoint
ALTER TABLE `contracts` MODIFY COLUMN `endDate` date NOT NULL;--> statement-breakpoint
ALTER TABLE `contracts` MODIFY COLUMN `value` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `contracts` MODIFY COLUMN `status` enum('ativo','inativo','vencido') NOT NULL DEFAULT 'ativo';--> statement-breakpoint
ALTER TABLE `contracts` ADD `companyName` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `contracts` ADD `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE `contracts` ADD `contractType` enum('mensal','anual') NOT NULL;--> statement-breakpoint
ALTER TABLE `contracts` ADD `signatureDate` date NOT NULL;--> statement-breakpoint
ALTER TABLE `contracts` ADD `monthlyPaymentDate` int;--> statement-breakpoint
ALTER TABLE `contracts` ADD `documentUrl` text;--> statement-breakpoint
ALTER TABLE `contracts` ADD `updatedAt` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `contract_alerts` ADD CONSTRAINT `contract_alerts_contractId_contracts_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contracts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contract_alerts` ADD CONSTRAINT `contract_alerts_spaceId_consumable_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `consumable_spaces`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contracts_with_space` ADD CONSTRAINT `contracts_with_space_spaceId_consumable_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `consumable_spaces`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contracts_with_space` ADD CONSTRAINT `contracts_with_space_contractId_contracts_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contracts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contracts` DROP COLUMN `supplierId`;--> statement-breakpoint
ALTER TABLE `contracts` DROP COLUMN `title`;--> statement-breakpoint
ALTER TABLE `contracts` DROP COLUMN `startDate`;