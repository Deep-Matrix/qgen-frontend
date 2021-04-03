import React from 'react'
import './Main.css'
import MenuIcon from '@material-ui/icons/Menu';
import { colors, IconButton, InputAdornment, Paper, TextField } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";

function Main() {
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







            <div className="main__right">2</div>
            
        </div>
    )
}

export default Main
