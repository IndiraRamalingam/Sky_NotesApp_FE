import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import instance from "../../services/instance";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignUp() {
  
const[name,setName]=useState('');
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const[cpassword,setCPassword]=useState('');
const[msg,setMsg]=useState('');
const[info,setInfo]=useState('');
const[infor,setInfor]=useState('');


const handleSignup =(event) =>{
  event.preventDefault(); 
  if(password == cpassword)
  {
    signup({name,email,password})
  } 
}

const signup =async({name,email,password}) =>{
  if(email!="" && password!="" && name!=""){
    try
    {
      console.log(name,email)
        const response = await instance.authInstance.post('/users/signup',{name,email,password});
        alert(`Hi ${name}!! Your account has been created !!!`);
       // setInfo(`Hi ${name}!! Your account activation link has been sent through Email. Please check your Inbox/Spam !!  `)
        setMsg(''),setName(''),setEmail(''),setPassword(''),setCPassword('')
    }
    catch(error)
    {
      console.log(error)
        setMsg("Username/Email already exists")
    }
  }
  else{
    if(email=="" && password=="" && name==""){
          setMsg("Please fill the details above")
        }else if(email=="" && password==""){
          setMsg("Please enter your Email and Password")
        }else if(email=="" && name==""){
          setMsg("Please enter your Username and Email")
        }else if(password=="" && name==""){
          setMsg("Please enter your Username and Password")
        }else if(name==""){
          setMsg("Please enter your Name")}
        else if(email==""){
          setMsg("Please enter your Email")}
          else{
          setMsg("Please enter your Password")
        }
     }
}


  return (
    <>
     <section className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
      <h1 className="mt-5" style={{color:"#ce5cbf",fontStyle:'italic','fontWeight':'bolder','textAlign':'center'}}>SKY Notes <span style={{fontSize:'15px',fontStyle:'italic',color:'#07c388a3'}}>- Let's make a note</span></h1> 
      <div className="p-md-5 formStyles">
          <Form onSubmit={handleSignup}>
             <div>
             <h3 className="mb-4 text-uppercase" style={{color:"#0d6efd",'fontWeight':'bolder','textAlign':'center',fontStyle:'italic'}}>SIGN UP</h3>
                <br/>
              </div>
                <Form.Group className="mb-3">
                    <Form.Control 
                    size="lg"
                    type='text'
                    value={name}
                    placeholder='User Name'
                    onChange={(event) => setName(event.target.value) }
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Control 
                    size="lg"
                    type="email" 
                    placeholder="Enter Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value) }
                    />
                </Form.Group>

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
                    value={cpassword}
                    placeholder='Confirm Password'
                    onChange={(event) => setCPassword(event.target.value) }
                    />
                </Form.Group>
                
                <p style={{ color: "red" }}>{msg}</p>
                <p style={{ color: "green" }}>{info}<Link to="/signin">{infor}</Link></p>
                
                <div className="text-center mt-4">
                    <Button variant="primary" type="submit">
                      Sign Up
                    </Button>
                    <div className='mt-4' style={{'fontSize':'17px'}}>
                        <p>_________________________OR__________________________</p>
                    </div>

                    <div className='mt-4' style={{'fontSize':'17px'}}>
                         <p>Already Registered? <Link to="/signin">Sign In</Link></p>
                    </div>
                    
                </div>
           </Form>
     </div>
     </div>
     </section>
    </>
  )
}

export default SignUp