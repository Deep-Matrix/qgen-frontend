import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './Main.css'
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EdiText from 'react-editext'
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';

function Main() {

    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)

    const [addData, setVal] = useState("");
    const [titleValue, settitleValue] = useState('Enter title')

    useEffect(() => {
        //
        axios.post('http://localhost:8000/api/get_notes',
            {
                user_id : JSON.parse(localStorage.user)[0].id                                                        
            }, 
            {
                headers:{
                  'Authorization':''+localStorage.token,
                }
            })
            .then(response =>{
            setNotes(response.data.data);                
            return ({status : 'Success' ,message:"Document has been delivered"})
            })
            .catch(err =>{
            return ({status : 'fail' ,message:"Unable to retreive document!",error:err})
            });
    }, [])

    async function saveNote() {
        console.log(addData)
        console.log(titleValue)
        console.log(selectedNote)
        let updated_note;
        let updated_notes_list = notes.map(async (n) => {
            if(n.id == selectedNote.id){

                // UPDATE IN DATABASE TOO
                n.content = addData
                n.note_title = titleValue
                updated_note = n;
            }
            return n
        })
        let n = updated_note;
        let result = await axios.post(`http://localhost:8000/api/update_note`,
                {
                    note_id : n.id,
                    note_title : n.note_title,
                    note_content : n.content                                                        
                }, 
                {
                    headers:{
                      'Authorization':''+localStorage.token,
                    }
                })
        result = await axios.post(`http://localhost:8000/api/get_notes`,

            {
                user_id : JSON.parse(localStorage.user)[0].id                                                        
            }, 
            {
                headers:{
                'Authorization':''+localStorage.token,
                }
            })
        setNotes(result.data.data)
    }

    async function addNote(){
        // save data to db and get new note in return
        let result = await axios.post(`http://localhost:8000/api/put_note`,
                {
                    user_id : JSON.parse(localStorage.user)[0].id,
                    note_title : 'Dummy title',
                    note_content : 'Enter your notes here :))'                                                       
                }, 
                {
                    headers:{
                      'Authorization':''+localStorage.token,
                    }
                })
            result = await axios.post(`http://localhost:8000/api/get_notes`,

            {
                user_id : JSON.parse(localStorage.user)[0].id                                                        
            }, 
            {
                headers:{
                'Authorization':''+localStorage.token,
                }
            })
        setNotes(result.data.data)

    }

   

    const handleChange = (e, editor) => {
        const data = editor.getData();
        setVal(data);
    }

    const handleSave = (val) => {
        // console.log('Edited Value -> ', val)
        settitleValue(val)
    }
   
    return (
        <div className="main">
            <div className="main__left">

                <div className="main__header">
                    <div className="icon_container">
                        <MenuIcon />
                    </div>
                    <div className="main__header__title">
                        MyCoolNotesApp
                    </div>
                    <IconButton aria-label="UploadIcon">
                        <CloudUploadIcon />
                    </IconButton>
                </div>

                <div className="main__searchBar">
                    {/* <input class="searchBar" type="search" id="searchbar" placeholder="Search" /> */}

                    <TextField
                        label="With normal TextField"
                        variant="filled"
                        className="searchBar"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                    />
                </div>

                <div>
                    <h2 style={{
                        marginLeft:"10px",
                        color:"var(--color-primary)"
                    }}>
                        {notes.length} notes
                </h2>
                </div>
                

                {/* List */}
                <div className="main__list">

                    {notes.map(data => {
                        return <div 
                                    onClick={() => {
                                        setSelectedNote(data)
                                        setVal(data.content)
                                    }}
                                    style={{
                                        position:"relative",
                                        backgroundColor:selectedNote && selectedNote.id == data.id ? "var(--color-primary)" : null
                                    }}
                                >
                            <div className="main__list-item main__item__selected" >
                                <div className="main__item-content">
                                    <h3>{data.note_title}</h3>
                                    <p class="main__item-content-sub">
                                        {data.content}
                                    </p>
                                </div>
                            </div>
                            <hr className="line-breaker"></hr>
                        </div>
                    })}

                </div>

            </div>


            <div className="main__right" >
                
                <div className="main__right__buttons">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    <div className="container">
                        <EdiText type="text" value={titleValue} onSave={handleSave} />
                    </div>
                    <Button variant="contained" color="primary" className="main__right__flashcard">
                        Flashcards
                    </Button>
                    <Button variant="contained" color="primary" className="main__right__quiz">
                        Quiz
                    </Button>
                    <Button variant="contained" color="primary" className="main__right__quiz">
                        Summarize
                    </Button>
                </div>  

                <div style={{ position:"relative"  }}>
                
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <Button onClick={addNote} variant="contained" color="primary">
                        +
                    </Button>
                    <Button onClick={saveNote} variant="contained" color="primary">
                        SAVE
                    </Button>
                </div>

                <CKEditor
                    editor={ ClassicEditor } data={addData} onChange={handleChange}
                    style={{minHeight:"800px"}} 
                    />
                </div>  

            </div>
            
        </div>
    )
}


export default Main
