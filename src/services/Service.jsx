import axios from "axios";

const baseURL = "http://localhost:8080/crud/";

class Service {

    insertStudent(student) {
        return axios.post(baseURL + "insert", student);
    }

    viewStudents() {
        return axios.get(baseURL + "view");
    }

    viewStudent(id) {
        return axios.get(baseURL + "viewone?id=" + id);
    }

    updateStudent(student) {
        return axios.put(baseURL + "update", student);
    }

    deleteStudent(id) {
        return axios.delete(baseURL + "delete/" + id);
    }

}

const obj = new Service();
export default obj;