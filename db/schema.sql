DROP DATABASE IF EXISTS testDb;
CREATE DATABASE testDb;

USE testDb;


CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30)
);

CREATE TABLE roles (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles (id)
);