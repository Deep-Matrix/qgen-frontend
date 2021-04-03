import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './Main.css'
import MenuIcon from '@material-ui/icons/Menu';
import { colors, IconButton, InputAdornment, Paper, TextField } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from '@material-ui/icons/Cancel';
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Transforms, Editor,Text } from 'slate'
import {bold} from "react-icons-kit/feather/bold";
import {code} from "react-icons-kit/feather/code";
import Icon from 'react-icons-kit';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Typography from '@material-ui/core/Typography';

const CustomEditor = {
    isBoldMarkActive(editor){
        const [match]  = Editor.nodes(editor,{
            match: n=> n.bold === true,
            universal:true,
        })

        return !!match
    },

    isCodeBlockActive(editor){
        const [match]  = Editor.nodes(editor,{
            match: n=> n.type === 'code',
        })

        return !!match
    },

    toggleBoldMark(editor){
        const isActive = CustomEditor.isBoldMarkActive(editor);
        Transforms.setNodes(
            editor,
            {bold:isActive ? null:true},
            { match: n => Text.isText(n),split:true }
        )
    },

    toggleCodeBlock(editor){
        const isActive = CustomEditor.isCodeBlockActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph':'code' },
            { match: n => Editor.isBlock(editor, n) }
        )
    },

};

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
    const editor = useMemo(() => withReact(createEditor()), [])
    const [valueOfEditor, setValueOfEditor] = useState([
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
      ])


    const renderElement = useCallback(props =>{
        switch(props.element.type){
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    },[])

    const renderLeaf = useCallback(props =>{
        return <Leaf {...props} />
    },[])

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

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

                    {[1,2,3,4,5,6,7].map(data => {
                        return <div style={{position:"relative"}}>
                            <div className="main__list-item main__item__selected" >
                                <div className="main__item-content">
                                    <h3>Hey there</h3>
                                    <p class="main__item-content-sub">Content goes here Content goes here Content goes here Content goes here Content goes here Content goes here Content goes here Content goes here Content goes here Content goes here Content goes here Content goes here Content goes </p>
                                </div>
                            </div>
                            <hr className="line-breaker"></hr>
                        </div>
                    })}

                </div>

            </div>


            <div className="main__right">
                
                <div className="main__right__buttons">
                    <Button variant="contained" type="button" onClick={handleOpen} color="primary" className="main__right__flashcard">
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
                                <div class="flashcards-progressbar"><div style="width: 8.33333%; height: 100%; background-color: rgb(80, 210, 194); border-radius: 10px; transition: all 0.3s ease 0s;"></div></div>
                            </div>
                        </Fade>
                    </Modal>
                    <Button variant="contained" color="primary" className="main__right__quiz">
                        Quiz
                    </Button>
                </div>
    
                <Slate
                    editor={editor}
                    value={valueOfEditor}
                    onChange={newValue => setValueOfEditor(newValue)}
                >
                <div className='main__right__toolbar'>
                    <AppBar position="static" style={{backgroundColor:"#F5F5F5", boxShadow:'none'}}>
                    <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    <button className='icon-button'
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleBoldMark(editor)
                        }}
                    >
                        <Icon icon = {bold}/>
                        </button>
                    </IconButton>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    
                    <button className = "icon-button" onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.toggleCodeBlock(editor)
                    }}> 
                
                        <Icon icon = {code}/>
                        </button>
                    </IconButton>
                    {/* <Typography variant="h6" color="inherit">
                        Photos
                    </Typography> */}
                    </Toolbar>
                </AppBar>

                </div>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                      if (!event.ctrlKey) {
                        return 
                      }
            
                      switch(event.key){
                          case '`':{
                            event.preventDefault();
                            CustomEditor.toggleCodeBlock(editor);
                            break
                          }
                          case 'b':{
                            event.preventDefault();
                            CustomEditor.toggleBoldMark(editor);
                            break
                        }
                      }
                      }
                    }
                />
                </Slate>
            </div>
            
        </div>
    )
}


const CodeElement = props => {
    return(
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};

const DefaultElement = props =>{
    return(
        <p {...props.attributes}>
             {props.children} 
        </p>
    );
};


const Leaf = props =>{
    return(
        <span 
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
            {props.children}
        </span>
    )
}

export default Main