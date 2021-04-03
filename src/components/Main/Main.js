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
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CustomModal from '../CustomModal/CustomModal';
import Quiz from '../Quiz/Quiz';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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

    const [openQuizForm, setOpenQuizForm] = useState(false)
    const [showQuizPage, setShowQuizPage] = useState([]) // [selectedNote,noOfQuestions,fib,mcq,tf]

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

    const submitFileForm = (e) => {
        const formData = new FormData();
        formData.append("name", 'name');
        formData.append("file", e.target.files[0]);
        
        console.log(formData)
        
        // Add form data here properly and access it by name of "file" in backend
        axios
            .post('http://localhost:8000/api/get_image_content', formData,  { headers: { 'Content-Type': 'multipart/form-data', 'Authorization':''+localStorage.token, } })
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
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    <div className="container">
                        <EdiText type="text" value={titleValue} onSave={handleSave} />
                    </div>
                    <Button type="button" onClick={handleOpen} variant="contained" color="primary" className="main__right__flashcard">
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
                            <div className={classes.paper} style={ {borderRadius:"10px",  backgroundColor:"white", overflow:"hidden" }} >
                                <div onClick={handleClose} style={{position:"absolute", top:"100px", right:"100px"}}>
                                    <CancelIcon fontSize="large" />
                                </div>
                                <h2 id="transition-modal-title">Flashcards</h2>
                                <p id="transition-modal-description">The perfect flashes for your last minute revision</p>
                                <br></br>
                                <Card className="card__modal">
                                    <CardContent>
                                    Hii
                                    Hii
                                    Hii
                                    </CardContent>
                                </Card>
                            </div>
                        </Fade>
                    </Modal>
                    <Button onClick={() => setOpenQuizForm(true)} variant="contained" color="primary" className="main__right__quiz">
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
