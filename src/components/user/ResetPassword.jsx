import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import instance from "../../services/instance";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';

function ResetPassword() {

    const[password,setPassword] = useState('');
    const[confirmpassword,setConfirmpassword] = useState('');
    const[msg,setMsg]=useState('');
    const[info,setInfo]=useState('');
    const[infor,setInfor]=useState('');
    const {token} = useParams();

const handleUpdatesubmit = (event) =>{
    event.preventDefault();
    if(password == confirmpassword)
    {
        resetpassword({password,token})
    }
}
const resetpassword = async({password,token})=>{
    if(password !="" && token!="")
    {
        try{
            const response=await instance.authInstance.post('/users/reset_password/:token',{password,token});   
            // console.log(response.data.message);
            // console.log(response.data);
            setInfo("Password has been updated successfully")
            setInfor("Click here to Sign In")
            setMsg('');
    
        }
        catch(error)
        {
           // console.log("Reset Password Failed ", error);
            setMsg("Password Reset Failed")
        }
    }
    else{
        setMsg("Please enter the above fields")
    }
}


  return (
    <section className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
    <h1 className="mt-5" style={{color:"#ce5cbf",fontStyle:'italic','fontWeight':'bolder','textAlign':'center'}}>SKY Notes<span style={{fontSize:'15px',fontStyle:'italic',color:'#07c388a3'}}>- Let's make a note</span></h1> 
      <div className="p-md-5 formStyles" >
        <Form onSubmit={handleUpdatesubmit}>
              <div>
              <h3 className="mb-4 text-uppercase" style={{color:"#0d6efd",'fontWeight':'bolder','textAlign':'center',fontStyle:'italic'}}>RESET PASSWORD FORM</h3>
                <br/>
              </div>
               <Form.Group className="mb-3">
                    <Form.Control 
                    size="lg"
                    type='password'
                    value={password}
                    placeholder='Password'
                    onChange={(event) => setPassword(event.target.value) }
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Control 
                    size="lg"
                    type='password'
                    value={confirmpassword}
                    placeholder='Confirm Password'
                    onChange={(event) => setConfirmpassword(event.target.value) }
                    />
                </Form.Group>
            
            <p style={{ color: "red" }}>{msg}</p>
                <p style={{ color: "green" }}>{info}</p>
                <Link to="/signin">{infor}</Link>
                
                <div className="text-center mt-4">
                    <Button variant="primary" type="submit">
                        Update Password
                    </Button>
                </div>
        </Form>
    </div>
    </div>
    </section>
  )
}

export default ResetPassword