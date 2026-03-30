ALTER TABLE `contracts_with_space` DROP FOREIGN KEY `contracts_with_space_spaceId_consumable_spaces_id_fk`;
--> statement-breakpoint
ALTER TABLE `contracts_with_space` ADD CONSTRAINT `contracts_with_space_spaceId_contract_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `contract_spaces`(`id`) ON DELETE no action ON UPDATE no action;