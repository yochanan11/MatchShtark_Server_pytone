// components/AddPersonForm.js
import React, {useState} from 'react';
import axios from 'axios';
import GenderSelect from './GenderSelect';
import StudentInfoFields from './StudentInfoFields';

function AddPersonForm() {
    const [gender, setGender] = useState('male');
    const [formData, setFormData] = useState({
        recordId: Date.now(),
        gender: 'male',
        studentInfo: {
            firstName: '',
            lastName: '',
            age: '',
            birthDate: '',
            phone: '',
            choice: '',
            community: '',
            currentYeshiva: '',
            previousYeshiva: '',
            smallYeshiva: '',
            familyPosition: '',
            style: ''
        },
        fatherInfo: {
            fullName: '',
            phone: '',
            address: '',
            origin: '',
            community: '',
            style: '',
            dress: '',
            workplace: ''
        },
        motherInfo: {
            fullName: '',
            origin: '',
            community: '',
            style: '',
            choice: '',
            workplace: ''
        },
        contactPhones: {
            Friends: [{name: '', phone: ''}],
            Neighbors: [{name: '', phone: ''}]
        },
        inLaws: [{name: '', city: '', Community: '', Address: ''}],
        status: 'פנוי',
        proposals: []
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        const keys = name.split('.');
        const updatedData = {...formData};
        if (keys.length === 2) {
            updatedData[keys[0]][keys[1]] = value;
        } else {
            updatedData[name] = value;
        }
        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/${gender === 'male' ? 'boy' : 'girl'}`;
        try {
            await axios.post(url, formData);
            alert('הפרופיל נוסף בהצלחה!');
        } catch (error) {
            console.error(error);
            alert('שגיאה בהוספה');
        }
    };

    return (
        <div className="container mt-4">
            <div dir="rtl">
                <h3 className="text-center">טופס הוספת מועמד חדש</h3>
                <form onSubmit={handleSubmit}>
                    <GenderSelect gender={gender} setGender={setGender} setFormData={setFormData}/>
                    <StudentInfoFields handleChange={handleChange}/>
                    <div className="row mt-4">
                        <div className="col-12">
                            <button type="submit" className="btn btn-success w-100">שמור</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPersonForm;
