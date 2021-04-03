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
    // const [addedData, showData] = useState(0);
    const [titleValue, settitleValue] = useState('Enter title')
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        //
        function getNotes(){
            // request here to get notes
            const notes_array = [
                {
                    "id": 2,
                    "note_title": "Dandan",
                    "content": "Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary Mayank Chowdhary",
                    "doc": "2021-04-03T10:35:57.136603Z",
                    "user_id": 2
                },
                {
                    "id": 3,
                    "note_title": "Hey there this!",
                    "content": "Mayank Chowdhary",
                    "doc": "2021-04-03T10:35:57.136603Z",
                    "user_id": 2
                }

            ]

            setNotes(notes_array)
        }
        getNotes()
    }, [])

    function saveNote(){
        console.log(addData)
        console.log(titleValue)
        console.log(selectedNote)
        
        let updated_notes_list = notes.map(n => {
            if(n.id == selectedNote.id){
                // UPDATE IN DATABASE TOO
                n.content = addData
                n.note_title = titleValue
            }
            return n
        })

        setNotes(updated_notes_list)
    }

    function addNote(){
        // save data to db and get new note in return

        const new_note = {// received from database
            "id": 4,
            "note_title": 'Dummy title',
            "content": 'Enter your notes here :))',
            "doc": "2021-04-03T10:35:57.136603Z",
            "user_id": 2
        }
        setNotes([new_note,...notes])
    }

   

    const handleChange = (e, editor) => {
        const data = editor.getData();
        setVal(data);
    }

    const handleSave = (val) => {
        // console.log('Edited Value -> ', val)
        settitleValue(val)
    }

    const submitFileForm = (e) => {
        const formData = new FormData();
        formData.append("name", 'name');
        formData.append("file", e.target.files[0]);
        
        console.log(formData)
        
        // Add form data here properly and access it by name of "file" in backend
        axios
            .post('UPLOAD_URL', formData)
            .then((res) => {
                alert("File Upload success");
            })
            .catch((err) => alert(JSON.stringify(err)));
          
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
                        <form>
                            <input onChange={(e) => submitFileForm(e)} style={{display:"none"}} id="myfile" type="file" name="myfile" />
                            <label for="myfile"><CloudUploadIcon /></label>
                        </form>
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
