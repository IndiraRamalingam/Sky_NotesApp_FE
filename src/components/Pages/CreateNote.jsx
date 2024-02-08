import React from 'react'
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import instance from '../../services/instance';
import { useParams } from 'react-router-dom';

function CreateNote() {

  const [note, setNote] = useState('');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');
  const [msgg, setMsgg] = useState('');
  const params = useParams();

  const handleCreate = (event) => {
    event.preventDefault();
    createNote({ note, description })
  }

  // API REQUEST
  const createNote = async (details) => {
    if (note != "" && description != "") {
      try {
        const response = await instance.protectedInstance.post(`/notes/addNote/${params.id}`, details);
        setMsg('New Note has been added succesfully !!!')
        setTimeout(() => {
          setMsg('')
        }, 1500);
        setMsgg(''), setNote(''), setDescription('');
      }
      catch (error) {
        setMsgg("Please fill the fields to add new note");
      }
    }
    else {
      setMsgg('Please fill the fields')
    }
  }

  return (
    <>

      <div className='container-fluid w-55'>
        <div className='p-1'>
          <Form onSubmit={handleCreate}>
            <div className='mt-3 mb-3 row justify-content-md-center'>
              <div className="form-outline col-sm-12 col-md-12 col-lg-7 col-xl-7" style={{ textAlign: 'center' }}>
                <input type="text" className="form-control form-control-lg"
                  value={note}
                  placeholder='Title'
                  onChange={(event) => setNote(event.target.value)}
                />
              </div>
            </div>
            <div className='mt-3 mb-3 row justify-content-md-center'>
              <div className="form-outline col-sm-12 col-md-12 col-lg-7 col-xl-7" style={{ textAlign: 'center' }}>
                <textarea type="text" className="form-control form-control-lg"
                  value={description}
                  placeholder='Description'
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>
            <div className='mt-3 mb-3 row justify-content-md-center'>
              <div className='col-sm-12 col-md-12 col-lg-7 col-xl-7' style={{ textAlign: 'center' }}>
                <button type='submit' className='btn btn-success btn-lg' >Add Note</button>
              </div>
            </div>
          </Form>

          <div>
            <p style={{ color: "#2fe62f", "fontSize": '20px' }}>{msg}</p>
            <p style={{ color: "red" }}>{msgg}</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default CreateNote;