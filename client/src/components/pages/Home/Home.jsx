import React, { useState, useEffect } from 'react';

import './home.css';
export default function Home(props) {
    const [students, setStudents] = useState([]);
    // useEffect(getStudents, [])

    // function getStudents() {
    //     getAllStudents().then((res) => { setStudents(res) })
    // }
    return (
        <div id={"homeDiv"}>
            home
        </div>
    )
}