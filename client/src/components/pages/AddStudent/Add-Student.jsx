import React, { useState } from 'react';
import { saveStudent } from "../service/students.service";

export default function AddStudent() {
    const [firstName, setFirstStudentName] = useState("")
    const [lastName, setStudentLastName] = useState("")
    const [email, setStudentEmail] = useState("")
    const [age, setStudentAge] = useState(1)

    function updateStudentFirstName(event) {
        setFirstStudentName(event.target.value)
    }
    function updateStudentLastName(event) {
        setStudentLastName(event.target.value)
    }
    function updateStudentEmail(event) {
        setStudentEmail(event.target.value)
    }
    function updateStudentAge(event) {
        setStudentAge(event.target.value)
    }
    function saveNewStudent(params) {
        params.preventDefault()
        saveStudent({ firstName, lastName, email, age })
            .then((res) => { alert(res.message) })
    }
    return (
        <div>
            <form onSubmit={saveNewStudent}>
                <label htmlFor="studentName">student First Name:</label>
                <input onChange={updateStudentFirstName} type="text" />
                <label htmlFor="studentLastName">student Last Name:</label>
                <input onChange={updateStudentLastName} type="text" />
                <label htmlFor="studentEmail">student Email:</label>
                <input onChange={updateStudentEmail} type="email" />
                <label htmlFor="studentRating">student Rating:</label>
                <input onChange={updateStudentAge} max={100} min={19} type="number" />
                <button type="submit">SAVE</button>
                <button type="reset">RESET</button>
            </form>
        </div>
    )
}