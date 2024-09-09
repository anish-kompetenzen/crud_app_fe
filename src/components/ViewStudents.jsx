import React, { useState } from 'react'
import { Button, FormControl, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewStudents = () => {

    const location = useLocation();
    const [students, setStudents] = useState(location.state === null ? [] : location.state.students);
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(-1);
    const [selectedStudent, setSelectedStudent] = useState({
        "studentName": "",
        "studentAge": "",
        "studentPlace": "",
    });

    function handleBack() {
        navigate("/", {
            state: {
                students: students
            }
        });
    }

    function handleUpdate(id) {
        setSelectedId(id);
        const updateStudent = students.filter((student, index) => {
            if (id === index) {
                return student;
            }
        });
        setSelectedStudent(updateStudent[0]);
    }

    function handleChange(event) {
        setSelectedStudent({ ...selectedStudent, [event.target.name]: event.target.value });
    }

    function handleSave() {
        const updatedStudents = students.map((student, index) => {
            if (selectedId === index) {
                return selectedStudent;
            } else {
                return student;
            }
        })
        setStudents(updatedStudents);
        setSelectedId(-1);
    }

    function handleCancel() {
        setSelectedId(-1);
    }

    function handleDelete(id) {
        const updatedStudents = students.filter((student, index) => {
            if (id !== index) {
                return selectedStudent;
            }
        })
        setStudents(updatedStudents);
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
                                        selectedId === index ?
                                            <FormControl name='studentName' type='text'
                                                onChange={handleChange}
                                                value={selectedStudent.studentName} />
                                            :
                                            student.studentName
                                    }
                                </td>
                                <td>
                                    {
                                        selectedId === index ?
                                            <FormControl name='studentAge' type='number'
                                                onChange={handleChange}
                                                value={selectedStudent.studentAge} />
                                            :
                                            student.studentAge
                                    }
                                </td>
                                <td>
                                    {
                                        selectedId === index ?
                                            <FormControl name='studentPlace' type='text'
                                                onChange={handleChange}
                                                value={selectedStudent.studentPlace} />
                                            :
                                            student.studentPlace
                                    }
                                </td>
                                <td>
                                    {
                                        selectedId === index ?
                                            <Button onClick={handleSave} variant='success'>Save</Button>
                                            :
                                            <Button onClick={() => handleUpdate(index)}>Update</Button>
                                    }
                                </td>
                                <td>
                                    {
                                        selectedId === index ?
                                            <Button onClick={handleCancel} variant='warning'>Cancel</Button>
                                            :
                                            <Button onClick={() => handleDelete(index)} variant='danger'>Delete</Button>
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