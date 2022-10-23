use employees;

INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Design'),
    ('Human Resources'),
    ('Security'),
    ('IT');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Engineering Manager', 150000, 1),
    ('Senior Engineer', 100000, 1),
    ('Engineer', 80000, 1),
    ('Design Manager', 120000, 2),
    ('Senior Designer', 100000, 2),
    ('Designer', 75000, 2),
    ('Draftsman', 50000, 2),
    ('HR Manager', 110000, 3),
    ('HR Specialist', 95000, 3),
    ('Security Manager', 115000, 4),
    ('Security Officer', 85000, 4),
    ('IT Manager', 150000, 5),
    ('IT Cyber Security', 140000, 5),
    ('IT Specialist', 105000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Scott', 'Field', 1, NULL),
    ('Sarah', 'Phelps', 2, 1),
    ('Mike', 'Daniels', 3, 1),
    ('Tom', 'Brady', 4, NULL),
    ('Aaron', 'Rodgers', 5, 4),
    ('Patrick', 'Mahomes', 6, 4),
    ('Josh', 'Allen', 7, 4),
    ('Bill', 'Belichick', 8, NULL),
    ('Pete', 'Carroll', 9, 8),
    ('Marshal', 'Mathers', 10, NULL),
    ('Doctor', 'Dre', 11, 10),
    ('David', 'Tennant', 12, NULL),
    ('Matt', 'Smith', 13, 12),
    ('Doctor', 'Who', 14, 12);
   