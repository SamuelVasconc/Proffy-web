import React, { useState, FormEvent } from 'react';

import './style.css'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList () {

    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes',{
            params: {
                subject,
                week_day,
                time,
            }
        });

        setTeachers(response.data);
    }
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponiveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                <Select value={subject} onChange={(e) => {setSubject(e.target.value)}}
                name="subject" label="Matéria" options={[
                    { value: 'Artes', label: 'Artes'},
                    { value: 'Biologia', label: 'Biologia'},
                    { value: 'Ciencias', label: 'Ciencias'},
                    { value: 'Educação fisica', label: 'Educação fisica'},
                    { value: 'Fisica', label: 'Fisica'},
                    { value: 'Geografia', label: 'Geografia'},
                    { value: 'Historia', label: 'Historia'},
                    { value: 'Matematica', label: 'Matematica'},
                    { value: 'Portugues', label: 'Portugues'},
                    { value: 'Quimica', label: 'Quimica'}
                ]}/>
                <Select value={week_day} onChange={(e) => {setWeekDay(e.target.value)}}
                name="week_day" label="Dia da Semana" options={[
                    { value: '0', label: 'Domingo'},
                    { value: '1', label: 'Segunda'},
                    { value: '2', label: 'Terça'},
                    { value: '3', label: 'Quarta'},
                    { value: '4', label: 'Quinta'},
                    { value: '5', label: 'Sexta'},
                    { value: '6', label: 'Sabado'},
                ]}/>
                    <Input type="time" name="time" label="Hora" value={time} onChange={(e) => {setTime(e.target.value)}}/>
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher)=> {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    )
}

export default TeacherList