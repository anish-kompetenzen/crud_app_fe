import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormControl } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import obj from '../services/Service';

const StudentRegistrationBE = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [student, setStudent] = useState({
        "studentName": "",
        "studentAge": "",
        "studentPlace": "",
    });

    const [students, setStudents] = useState([]);

    function handleChange(event) {
        setStudent({ ...student, [event.target.name]: event.target.value });
    }
    const [count, setCount] = useState(0);

    useEffect(() => {
        getData();
    }, [count]);


    async function getData() {
        try {
            const response = await obj.viewStudents();
            setCount(response.data.length);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(event) {
        // const ar1 = [1, 2, 3, 4, 5];
        event.preventDefault();
        // setStudents([...students, student]);
        const response = await obj.insertStudent(student);
        getData();
        if (response.status === 201) {
            alert("Inserted successfully!!");
        }
        // console.log([...ar1]);
        setStudent({
            "studentName": "",
            "studentAge": "",
            "studentPlace": "",
        });
    }

    function handleView() {
        navigate("/v");
    }

    return (
        <div className='container w-50 mt-5'>
            <Card>
                <CardHeader className='d-flex align-items-center justify-content-between'>
                    <h2>Register Here</h2>
                    <Button onClick={handleView} className='btn btn-info bi bi-table'><sup>{count}</sup></Button>
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
            <div className='text-center'>
            </div>
        </div>
    )
}

export default StudentRegistrationBE