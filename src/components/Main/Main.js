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
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { MicNone } from '@material-ui/icons';
import CustomModal from '../CustomModal/CustomModal';
import Quiz from '../Quiz/Quiz';
import { CLIENT_URL } from '../../const'
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    const [titleValue, settitleValue] = useState('Enter title')
    // const [selectedFile, setSelectedFile] = useState(null);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [pages, setCards] = React.useState([]);
  

    const [openQuizForm, setOpenQuizForm] = useState(false)
    const [showQuizPage, setShowQuizPage] = useState([]) // [selectedNote,noOfQuestions,fib,mcq,tf]

    useEffect(() => {
        //
        axios.post(`${CLIENT_URL}/api/get_notes`,
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
        // getNotes()

        // function getFlashCards(){
        //     // request here to get cards
        //     const card_array = [
        //         {
        //             "page_index":1,
        //             "word":"Mechanics",
        //             "meaning":"Study of physicd Study of physicd Study of physicd Study of physicd Study of physicd"
        //         },
        //         {
        //             "page_index":2,
        //             "word":"Software",
        //             "meaning":"Study of Computer"
        //         }
        //     ]
        
        //     setCards(card_array)
        // }
        // getFlashCards()
        // if(fetched_notes.length > 0){
        //     setSelectedNote(notes[0])
        //     setVal(notes[0].content)
        //     settitleValue(notes[0].note_title)
        // }
    // }, [])

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
        let result = await axios.post(`${CLIENT_URL}/api/update_note`,
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
        result = await axios.post(`${CLIENT_URL}/api/get_notes`,

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
        let result = await axios.post(`${CLIENT_URL}/api/put_note`,
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
            result = await axios.post(`${CLIENT_URL}/api/get_notes`,

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

    const submitFileForm = (e) => {
        const formData = new FormData();
        formData.append("name", 'name');
        formData.append("file", e.target.files[0]);
        
        console.log(formData)
        
        // Add form data here properly and access it by name of "file" in backend
        axios
            .post(`${CLIENT_URL}/api/get_image_content`, formData,  { headers: { 'Content-Type': 'multipart/form-data', 'Authorization':''+localStorage.token, } })
            .then((res) => {
                alert("File Upload success");
            })
            .catch((err) => alert(JSON.stringify(err)));
          
    }
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function submitQuizForm(noOfQuestions,fib,mcq,tf){
        // Number
        console.log(noOfQuestions)
        // true/false values
        console.log(fib) 
        console.log(mcq)
        console.log(tf)

        // using currently selected note and above variables generate list of questions
        setShowQuizPage([selectedNote,noOfQuestions,fib,mcq,tf])

    }
    

    if(openQuizForm){
        return <CustomModal setOpenQuizForm={setOpenQuizForm} submitQuizForm={submitQuizForm} />
    }
    if(showQuizPage && showQuizPage.length > 0){
        return <Quiz setShowQuizPage={setShowQuizPage} showQuizPage={showQuizPage} />
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
                                        settitleValue(data.note_title)
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
                    <div className="container">
                        <EdiText type="text" value={titleValue} onSave={handleSave} />
                    </div>
                    
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
                    
                    <div>
                        <Button 
                            className="main__header__btn" 
                            style={{backgroundColor: "var(--color-primary)",margin:"5px",color:"white"}}
                            type="button" onClick={handleOpen}>
                            Flashcards
                        </Button>
                        <Button 
                            className="main__header__btn" 
                            style={{backgroundColor: "var(--color-primary)",margin:"5px",color:"white"}}
                            onClick={() => setOpenQuizForm(true)}>
                            Quiz
                        </Button>
                        <Button
                            className="main__header__btn" 
                            style={{backgroundColor: "var(--color-primary)",margin:"5px",color:"white"}}
                        >
                            Summarize
                        </Button>
                    </div>
                </div>  

                <div style={{ position:"relative"  }}>
                
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div>
                        <AddCircleIcon
                            style={{fontSize:"32px",cursor:"pointer"}}
                            onClick={addNote}>        
                        </AddCircleIcon>
                        
                    </div>
                    <button 
                        className="main__header__btn" 
                        style={{backgroundColor: "burlywood"}}
                        onClick={saveNote}>
                        SAVE
                    </button>
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
