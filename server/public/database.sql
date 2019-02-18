CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL,
	"status" VARCHAR(20),
	"priority" VARCHAR(20),
	"notes" VARCHAR (200),
	"deadline" DATE 
);

SELECT * FROM "tasks";



INSERT INTO "tasks" ("task", "status", "priority", "notes", "deadline")
VALUES ('Blink', 'In Progress', 'HIGH', 'Often', '1-1-2020');