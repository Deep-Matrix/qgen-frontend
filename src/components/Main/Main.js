import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './Main.css'
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EdiText from 'react-editext'

function Main() {

    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)

    const [addData, setVal] = useState("");
    const [addedData, showData] = useState(0);
    const [titleValue, settitleValue] = useState('Enter title')

    useEffect(() => {
        //
        function getNotes(){
            // request here
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
                    }}>4 notes</h2>
                </div>
                

                {/* List */}
                <div className="main__list">

                    {notes.map(data => {
                        return <div 
                                    onClick={() => setSelectedNote(data)}
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
                    <Button variant="contained" color="primary" className="main__right__flashcard">
                        Flashcards
                    </Button>
                    <div className="container">
                        <EdiText type="text" value={titleValue} onSave={handleSave} />
                    </div>
                    <Button variant="contained" color="primary" className="main__right__quiz">
                        Quiz
                    </Button>
                </div>  

                <div >
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
