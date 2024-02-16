1. Clone the repository
2. Install Node and npm (if these already installed then you can skip this step)
3. Change pool.js content from "schedule-exam-api" to match your database.
4. Add values into the database, example:
   users table - The password is "Password.1" for all the users:
    1, 'Prenume 1', 'Nume 1', 'professor@example.com', '$2a$10$.pzwVpRkFPQPyAzBnpJXC.Ry9R9rR/ZmxTVNRZHUTN88pedhmsysG', 'professor', NULL, NULL, NULL
    2, 'Prenume 2', 'Nume 2', 'coordinator@example.com', '$2a$10$.pzwVpRkFPQPyAzBnpJXC.Ry9R9rR/ZmxTVNRZHUTN88pedhmsysG', 'coordinator', NULL, NULL, 'IAG'
    3, 'Prenume 3', 'Nume 3', 'secretary@example.com', '$2a$10$.pzwVpRkFPQPyAzBnpJXC.Ry9R9rR/ZmxTVNRZHUTN88pedhmsysG', 'secretary', NULL, NULL, NULL
    4, 'Prenume 4', 'Nume 4', 'student@example.com', '$2a$10$.pzwVpRkFPQPyAzBnpJXC.Ry9R9rR/ZmxTVNRZHUTN88pedhmsysG', 'student', 'IAG', 'III', NULL
   
   subjects table:
    1, 'SSI', 1
    2, 'BDD', 1
    3, 'TW', 2
    4, 'SAP', 2
6. Open two terminals in your IDE, one pointing to "schedule-exam" and one to "schedule-exam-api"
7. Run the commands "ng serve" in the terminal pointing to "schedule-exam" and "nodemon" in the terminal pointing to "schedule-exam-api"
8. Login with the student entity and add an exam to get started.
   
