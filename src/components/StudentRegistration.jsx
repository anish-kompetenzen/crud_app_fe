import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormControl } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';

const StudentRegistration = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [student, setStudent] = useState({
        "studentName": "",
        "studentAge": "",
        "studentPlace": "",
    });

    const [students, setStudents] = useState(location.state === null ? [] : location.state.students);

    function handleChange(event) {
        setStudent({ ...student, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        // const ar1 = [1, 2, 3, 4, 5];
        event.preventDefault();
        setStudents([...students, student]);
        // console.log([...ar1]);
        setStudent({
            "studentName": "",
            "studentAge": "",
            "studentPlace": "",
        });
    }

    function handleView() {
        navigate("/v", {
            state: {
                students: students,
                abcd: "Akhil"
            }
        });
    }

    return (
        <div className='container w-50 mt-5'>
            <Card>
                <CardHeader>
                    <h2>Register Here</h2>
                </CardHeader>
                <Form onSubmit={handleSubmit}>
                    <CardBody>
                        <FormControl type='text' name='studentName'
                            onChange={handleChange} placeholder='Enter your name'
                            required
                            value={student.studentName} /><br />
                        <FormControl type='number' name='studentAge'
                            onChange={handleChange} placeholder='Enter your age'
                            required
                            value={student.studentAge} /><br />
                        <FormControl type='text' name='studentPlace'
                            onChange={handleChange} placeholder='Enter your place'
                            required
                            value={student.studentPlace} />
                    </CardBody>
                    <CardFooter>
                        <Button variant='success' type='submit'>Register</Button>
                    </CardFooter>
                </Form>
            </Card>
            <h3 className='text-center mt-5'>Total Students : {students.length}</h3>
            <div className='text-center'>
                <Button onClick={handleView}>View</Button>
            </div>
        </div>
    )
}

export default StudentRegistration