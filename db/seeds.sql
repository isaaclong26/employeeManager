
       
INSERT INTO departments(title)
VALUES("Accounting"),
        ("Sales" ),
        ("Customer Service"),
        ("Quality Assurance"),
        ("Reception"),
        ("Managment"),
        ("Other");
INSERT INTO roles(id,title, salary, department_id)
VALUES(11,"Accountant", 45000,1),
      (12,"Lead Accountant", 50000,1),
      (21,"Salesman", 50000,2),
      (22, "Lead Salesman", 55000,2),
      (31,"Representitive", 45000,3),
      (41, "Representitive", 50000,4),
      (51, "Receptonist", 40000,5),
      (61,"Manager", 60000,6);
        
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES ("Angela", "Martin", 6,12),
       ("Ocsar", "Martinez", 1,11),
       ("Kevin", "Malone", 1,11),
       ("Creed", "Bratton", 6,41),
       ("Pam", "Beesly", 6,51),
       ("Micheal", "Scott",0,61)