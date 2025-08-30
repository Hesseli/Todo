DROP TABLE IF EXISTS task CASCADE;
DROP TABLE IF EXISTS account CASCADE;

create table task (
    id serial primary key,
    description varchar(255) not null
);

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

insert into task(description) values
('Complete the project documentation'),
('Review the code changes'),
('Prepare for the team meeting'),
('Update the project timeline'),
('Test the new features'),
('Fix the reported bugs'),
('Deploy the application to production'),
('Conduct a code review with peers');