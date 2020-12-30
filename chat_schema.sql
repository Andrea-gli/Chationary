CREATE TABLE "Users" (
	"userID" serial NOT NULL,
	"username" VARCHAR(255) NOT NULL UNIQUE,
	"passkey" VARCHAR(255) NOT NULL UNIQUE,
	"date_created" DATE NOT NULL,
	"country" VARCHAR(255) NOT NULL,
	"email" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("userID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Messages" (
	"messageID" serial NOT NULL,
	"message_body" TEXT NOT NULL,
	"date_posted" DATE NOT NULL,
	"time_posted" TIME NOT NULL,
	"userID_fk" integer NOT NULL UNIQUE,
	"chatroomID_fk" integer NOT NULL UNIQUE,
	CONSTRAINT "Messages_pk" PRIMARY KEY ("messageID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Chatrooms" (
	"chatroomID" serial NOT NULL,
	"chatroom_name" VARCHAR(255) NOT NULL,
	"language" VARCHAR(255) NOT NULL,
	CONSTRAINT "Chatrooms_pk" PRIMARY KEY ("chatroomID")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Users" ADD CONSTRAINT "Users_fk0" FOREIGN KEY ("userID") REFERENCES "Messages"("userID_fk");


ALTER TABLE "Chatrooms" ADD CONSTRAINT "Chatrooms_fk0" FOREIGN KEY ("chatroomID") REFERENCES "Messages"("chatroomID_fk");

