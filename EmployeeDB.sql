DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  dep_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(30) NOT NULL,
  salary DECIMAL( 8, 2),
  department_id INTEGER(2),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(2),
  manager_id INTEGER(2) NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (dep_name)
VALUES ('Marketing'), ('Sales'), ('Operations'), ('QA'), ('QC'), ('Intern');

INSERT INTO role (role_title, salary, department_id)
Values ('Markerter', 75000.00, 1), ('Salesman', 85000.00, 2), ('Manager', 75000.00, 3), ('Quality Analyst', 40000.00, 4), ('Quality Controler', 35000.00, 5), ('Coffee boy', 00.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jafet', 'Manauth', 1, 1), ('BIlly', 'Dorman', 2, 1), ('Zion', 'Flores', 3, 1), ('Todd', 'Harden', 4, 1), ('Melissa', 'Brewer', 5, 1), ('Phil', 'Wise', 6, 1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;