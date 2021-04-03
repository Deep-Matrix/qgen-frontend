import React, { useEffect,useState } from 'react'
import './Main.css'
import MenuIcon from '@material-ui/icons/Menu';
import { colors, IconButton, InputAdornment, Paper, TextField } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";

function Main() {

    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)

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




            <div className="main__right">2</div>
            
        </div>
    )
}

export default Main
