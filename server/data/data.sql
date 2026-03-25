CREATE TABLE Users (
  UserID INTEGER PRIMARY KEY UNIQUE,
  UserName TEXT NOT NULL UNIQUE
);


INSERT into Users (UserName)
Values
    ("Test1"),
    ("Test2"),
    ("Test3"),
    ("Test4"),
    ("Test5");

