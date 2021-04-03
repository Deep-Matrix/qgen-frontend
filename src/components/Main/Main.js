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
    const[addData, setVal] = useState("");
    const[addedData, showData] = useState(0);
    const [titleValue, settitleValue] = useState('Enter title')

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
