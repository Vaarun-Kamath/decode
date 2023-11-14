import { executeQuery } from '../db';

export async function getStudentDetails() {
    const query = "SELECT * from student;";
    const values = [];
    const { success, results, error } = await executeQuery(query, values);

    if (success) {
        console.log("Query executed successfully:", results);
        return results
    } else {
        console.error("Error executing query:", error);
        return null
    }
}

export async function isStudentInDatabase(SRN) {
    const query = "SELECT SRN FROM student WHERE SRN = ? LIMIT 1;"
    const values = [SRN];

    const { success, results, error } = await executeQuery(query, values);

    if (success) {
        console.log("Query executed successfully:", results);
        return true
    } else {
        console.error("Error executing query:", error);
        return false
    }

}