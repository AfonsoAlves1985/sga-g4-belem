ALTER TABLE `rooms` DROP FOREIGN KEY `rooms_responsibleUserId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `rooms` DROP COLUMN `responsibleUserId`;