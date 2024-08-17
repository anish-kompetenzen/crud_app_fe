import React, { useEffect, useState } from 'react'
import { Button, FormControl, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import obj from '../services/Service';

const ViewStudents = () => {

    const location = useLocation();
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(-1);
    const [selectedStudent, setSelectedStudent] = useState({
        "studentId": "",
        "studentName": "",
        "studentAge": "",
        "studentPlace": "",
    });

    useEffect(() => {
        getData();
    }, []);


    async function getData() {
        const response = await obj.viewStudents();
        setStudents(response.data);
    }

    function handleBack() {
        navigate("/");
        // , {
        // state: {
        // students: students
        // }
        // });
    }

    async function handleUpdate(id) {
        setSelectedId(id);
        const response = await obj.viewStudent(id);
        setSelectedStudent(response.data);
    }

    function handleChange(event) {
        setSelectedStudent({ ...selectedStudent, [event.target.name]: event.target.value });
    }

    async function handleSave() {
        const response = await obj.updateStudent(selectedStudent);
        if (response.status === 202) {
            alert("updated successfully!");
        }
        await getData();
        setSelectedId(-1);
    }

    function handleCancel() {
        setSelectedId(-1);
    }

    async function handleDelete(id) {
        const response = await obj.deleteStudent(id);
        if (response.status === 200) {
            alert("deleted successfully!");
        } else {
            alert("not such student available to delete!");
        }
        await getData();
    }

    return (
        <div className='container'>
            <h2><i className="bi bi-skip-backward-circle" onClick={handleBack}></i>View All Students</h2>
            <Table bordered striped hover className='text-center'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>AGE</th>
                        <th>PLACE</th>
                        <th colSpan={2}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {
                                        selectedId === student.studentId ?
                                            <FormControl name='studentName' type='text'
                                                onChange={handleChange}
                                                value={selectedStudent.studentName} />
                                            :
                                            student.studentName
                                    }
                                </td>
                                <td>
                                    {
                                        selectedId === student.studentId ?
                                            <FormControl name='studentAge' type='number'
                                                onChange={handleChange}
                                                value={selectedStudent.studentAge} />
                                            :
                                            student.studentAge
                                    }
                                </td>
                                <td>
                                    {
                                        selectedId === student.studentId ?
                                            <FormControl name='studentPlace' type='text'
                                                onChange={handleChange}
                                                value={selectedStudent.studentPlace} />
                                            :
                                            student.studentPlace
                                    }
                                </td>
                                <td>
                                    {
                                        selectedId === student.studentId ?
                                            <Button onClick={handleSave} variant='success'>Save</Button>
                                            :
                                            <Button onClick={() => handleUpdate(student.studentId)}>Update</Button>
                                    }
                                </td>
                                <td>
                                    {
                                        selectedId === student.studentId ?
                                            <Button onClick={handleCancel} variant='warning'>Cancel</Button>
                                            :
                                            <Button onClick={() => handleDelete(student.studentId)} variant='danger'>Delete</Button>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default ViewStudents;