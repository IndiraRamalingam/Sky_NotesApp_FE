import React, { useEffect, useState } from 'react'
import instance from '../../services/instance';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";

function ViewNote() {
  const [notes, setNotes] = useState([]);
  const[note,setNote]=useState('');
  const[description,setDescription]=useState('');
  const[noteId,setNoteId]=useState('')
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [errormsg, setErrorMsg] = useState('')
  const [msg, setMsg] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllNotes();
  }, [notes])

  //To get the list of all Notes
  const getAllNotes = async () => {
    try {
      console.log("PARAMSSSS   "+params.id)
      const response = await instance.protectedInstance.get(`notes/getAll/${params.id}`)
      console.log("Resp   "+ response.data)
       setNotes(response.data); 
    }
    catch (error) {
      console.log(error)
    }
  }

  //To get the particular note using ID
    const getNote = async(id) =>{
    handleShow()
    try{
      const response = await instance.protectedInstance.get(`notes/getNote/${id}`)
      setNote(response.data.NoteItems.note)
      setDescription(response.data.NoteItems.description)
      setNoteId(response.data.NoteItems._id)
    }
    catch(error)
    {
      console.log("Error in getting note using ID ",error)
    }
  }

  //To Edit Task
  const handleUpdate = (event) => {
    event.preventDefault();
    if(note !='' && description !='')
    {
      editNote({note,description})
    }
    else{
      setErrorMsg('Please fill the above field')
    }
  }

  const editNote = async(details)=>{
    try{
      const response = await instance.protectedInstance.put(`/notes/editNote/${noteId}`,details);
      if (response.status === 200) {
        setMsg("Note Updated")   
        setErrorMsg('')
        window.location.reload(false); 
      }
    }
    catch(error)
    {
      console.log("Error in updating"+error)
    }
  }

  //To delete a task using ID
  const deleteNote = async (id) => {
    try {
      alert("You are going to delete the note")
      let response = await instance.protectedInstance.delete(`/notes/deleteNote/${id}`)
      if (response.status == 200) {
        getAllNotes();
        window.location.reload(false);
      }
    }
    catch (error) {
      console.log("Error in deleting Notes ", error)
    }
  }

  return (
    <>

      <div className='container w-70 p-2' style={{'background':'white'}}>
<div class="row">
{notes.map((p, i) => {
              return (
<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{p.note}</h5>
        <p class="card-text">{p.description}</p>
        <div style={{ 'width': '1px', 'display': 'inline-flex'}}>
                        <button className='btn btn-warning m-2'
                          onClick={()=>{getNote(p._id)}}>
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button className='btn btn-danger m-2'
                          onClick={() => {
                            deleteNote(p._id);
                          }}>
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
        
      </div>
    </div>
  </div>
                );
              })}
  
  </div>
</div>

      {/* Modal - To Edit the Task */}

      <div className='modal-dialog modal-dialog-centered'>
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form >
              <div className="form-outline mb-4">
                <input type="textarea" className="form-control form-control-lg"
                  placeholder='Title'
                  value={note}
                  onChange={(event) => setNote(event.target.value) }
                />
              </div>
              <div className="form-outline mb-4">
                <textarea className="form-control form-control-lg"
                  placeholder='Description'
                  value={description}
                  onChange={(event) => setDescription(event.target.value) }
                />
              </div>
            </Form>
          </Modal.Body>
          <p style={{ color: "green",'textAlign':'center' }}>{msg}</p>
        <p style={{ color: "red" ,'textAlign':'center'}}>{errormsg}</p>
          <Modal.Footer>
            <Button variant="success" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>


    </>
  )
}

export default ViewNote