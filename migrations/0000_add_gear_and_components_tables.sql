CREATE TABLE `components` (
	`added` text NOT NULL,
	`brand` text,
	`distance` real,
	`gear_id` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`string` text,
	`removed` text,
	`type` text NOT NULL,
	FOREIGN KEY (`gear_id`) REFERENCES `gear`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `gear` (
	`brand_name` text,
	`description` text,
	`frame_type` text,
	`id` text PRIMARY KEY NOT NULL,
	`model_name` text,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `gear_id_idx` ON `components` (`gear_id`);--> statement-breakpoint
CREATE INDEX `slug_idx` ON `gear` (`slug`);