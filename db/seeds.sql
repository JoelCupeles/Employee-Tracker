-- Insert sample data into department table
INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

-- Insert sample data into role table
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 70000, 1),
       ('Software Engineer', 80000, 2),
       ('Accountant', 60000, 3),
       ('Legal Assistant', 55000, 4);

-- Insert sample data into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joel', 'Cupeles', 1, NULL),
       ('Jane', 'Smith', 2, 1),
       ('Mike', 'Johnson', 3, 1),
       ('Sarah', 'Williams', 4, 1);