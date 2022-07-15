import React, { useState, useEffect } from 'react';
import { Link,  useNavigate, useParams } from 'react-router-dom';


const UpdateCourse = (props) => {    

    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [estimatedTime, setEstTime] = useState("");
    const [materialsNeeded, setMaterials] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate()
    const { id } = useParams();
    
    const {authenticatedUser} = props.context;

    // Calls getCourse(), checks authorization and assigns useState variables on render
    useEffect(() => {
        props.context.actions.getCourse(id)
            .then(response => {
                if (response !== null) {
                    if (response.Users.id === authenticatedUser.id) {
                        setTitle(response.title);
                        setDesc(response.description);
                        setEstTime(response.estimatedTime);
                        setMaterials(response.materialsNeeded);
                    } else {
                        navigate("/forbidden");
                    }
                } else {
                    navigate("/notfound")
                }
            })
            .catch(error => {
                console.log(error.message)
                navigate("/error")
            });
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Prevents forms default behavior, assigns useState variables to course, calls updateCourse()
    const submit = (e) => {
        e.preventDefault();
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authenticatedUser.id
        }
        props.context.actions.updateCourse(id, course, authenticatedUser.emailAddress, authenticatedUser.password)
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
                <h2>Update Course</h2>
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
                            <input id="courseTitle" name="courseTitle" type="text" value={title || ""} onChange={(e) => setTitle(e.target.value)} />

                            <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description || ""} onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime || ""} onChange={(e) => setEstTime(e.target.value)} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded || ""} onChange={(e) => setMaterials(e.target.value)}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <Link to="/"><button className="button button-secondary">Cancel</button></Link>
                </form>
            </div>
        </React.Fragment>
    )
    
}

export default UpdateCourse;