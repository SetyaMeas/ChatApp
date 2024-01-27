

use chat_app_db;

create table tblUser (
	userId int not null auto_increment primary key,
  username varchar(50) not null,
  email varchar(100) not null unique,
  pwd varchar(90) not null
);

create table tblGroup(
	groupId int not null auto_increment primary key,
  groupName varchar(50) not null,
  createdAt datetime default current_timestamp
);

create table tblMsg (
	msgId int not null auto_increment primary key,
  userId int not null,
  groupId int not null,
  msg varchar(60) not null,
  sentDate datetime default current_timestamp,
  foreign key (userId) references tblUser (userId) on delete cascade,
  foreign key (groupId) references tblGroup (groupId) on delete cascade
);

create table tblUserGroup (
	userId int not null,
  groupId int not null,
  primary key (userId, groupId),
  foreign key (userId) references tblUser (userId) on delete cascade,
  foreign key (groupId) references tblGroup (groupId) on delete cascade
);
