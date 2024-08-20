CREATE TABLE `posts` (
	`content` text,
	`description` text,
	`published` text NOT NULL,
	`slug` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`updated` text
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`name` text NOT NULL,
	`post_slug` text NOT NULL,
	PRIMARY KEY(`name`, `post_slug`),
	FOREIGN KEY (`post_slug`) REFERENCES `posts`(`slug`) ON UPDATE no action ON DELETE no action
);
