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
import CancelIcon from '@material-ui/icons/Cancel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { MicNone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: "20px",
      padding: theme.spacing(2, 4, 3),
      outline:"none",
      minHeight: "450px",
      minWidth: "200px",
    },
    root: {
        '& > *': {
          marginTop: theme.spacing(2),
        },
      },
  }));

function Main() {

    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)
    const [addData, setVal] = useState("");
    // const [addedData, showData] = useState(0);
    const [titleValue, settitleValue] = useState('Enter title')
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [pages, setCards] = React.useState([]);
  
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

        function getFlashCards(){
            // request here to get cards
            const card_array = [
                {
                    "page_index":1,
                    "word":"Mechanics",
                    "meaning":"Study of physicd Study of physicd Study of physicd Study of physicd Study of physicd"
                },
                {
                    "page_index":2,
                    "word":"Software",
                    "meaning":"Study of Computer"
                }
            ]
        
            setCards(card_array)
        }
        getFlashCards()
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

    const handleChangeforPage = (event, value) => {
        console.log(value);
        setCards(value);
    }

    const handleChange = (e, editor) => {
        const data = editor.getData();
        setVal(data);
    }

    const handleSave = (val) => {
        // console.log('Edited Value -> ', val)
        settitleValue(val)
    }
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   
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
                
                <div className="main__right__buttons" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton aria-label="delete" style={{float:"left!important", marginRight:"300px"}}>
                        <DeleteIcon />
                    </IconButton>
                    <div className="text_container" style={{ marginLeft:"300px!important", marginRight:"300px!important" }}>
                        <EdiText type="text" value={titleValue} onSave={handleSave} />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type="button" onClick={handleOpen} variant="contained" color="primary" className="main__right__icons">
                        Flashcards
                    </Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper} style={ {borderRadius:"20px", minWidth:"400px", maxWidth:"400px", backgroundColor:"white", overflow:"hidden" }} >
                                <div onClick={handleClose} style={{float:"right", top:"10px", right:"10px"}}>
                                    <CancelIcon fontSize="large" />
                                </div>
                                <br></br>
                                <h1 id="transition-modal-title">Flashcards</h1>
                                <p id="transition-modal-description">The perfect flashes for your last minute revision</p>
                                <br></br>
                                <br></br>
                                <div className="card__container">
                                    {pages.map(data => {
                                        return <div>
                                        <Card className="card__modal">
                                            <CardContent>
                                            <h3 >{ data.word }</h3>
                                            <br></br>
                                            { data.meaning }
                                            </CardContent>
                                        </Card>
                                        <br></br>
                                    </div>}
                                   )}
                                   <div className={classes.root} style={{textAlign:"center"}}>
                                            <Pagination count={pages.length} color="primary" page={1} onChange={handleChangeforPage} />
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                    <Button variant="contained" color="primary" className="main__right__icons">
                        Quiz
                    </Button>
                    <Button variant="contained" color="primary" className="main__right__icons">
                        Summarize
                    </Button>
                    </div>
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
