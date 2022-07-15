import React, { useState } from 'react';
import { Link,  useNavigate} from 'react-router-dom';

const CreateCourse = (props) => {

    const [title, setTitle] = useState();
    const [description, setDesc] = useState();
    const [estimatedTime, setEstTime] = useState(null);
    const [materialsNeeded, setMaterials] = useState(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const {authenticatedUser} = props.context;

    // Prevents forms default behavior, assigns useState variables to course, calls createCourse()
    const submit = (e) => {
        e.preventDefault();
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authenticatedUser.id
        }
        props.context.actions.createCourse(course)
            .then(res => {
                if (res === true) {
                    navigate("/");
                } else {
                    setErrors(res);
                }
            })
            .catch(error => {
                console.log(error.message)
                navigate("/error")
            });
        
    }
    
    return (
        <React.Fragment>
            <div className="wrap">
                <h2>Create Course</h2>
                {
                    errors.length > 0 ? (
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                                {
                                    errors.map((error, index) => {
                                        return (
                                            <li key={index}>{error}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ) : (
                        <React.Fragment></React.Fragment>
                    )
                }
                
                <form onSubmit={submit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" onChange={(e) => setTitle(e.target.value)} />

                            <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" onChange={(e) => setEstTime(e.target.value)} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={(e) => setMaterials(e.target.value)}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <Link to="/"><button className="button button-secondary">Cancel</button></Link>
                </form>
            </div>
        </React.Fragment>
    )
    
}

export default CreateCourse;