CREATE TABLE Users (
  UserID SERIAL PRIMARY KEY,
  UserName TEXT NOT NULL UNIQUE,
  PasswordHash TEXT
);


INSERT into Users (UserName)
Values
    ('Test1'),
    ('Test2'),
    ('Test3'),
    ('Test4'),
    ('Test5');

