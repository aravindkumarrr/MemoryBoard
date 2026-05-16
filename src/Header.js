import './CSS/Header.css';

import {useState} from "react";

function Header() {
    const [locked,setLocked] = useState(true);
    function toggleLock(){
        setLocked(!locked);
    }
    return (
    <>
        <div id="header_container">

        <div className="header_button_container">
            <button id="lock_btn" className="icon_btn" onClick={toggleLock}>
            {locked ? (<i className="fa-solid fa-lock"></i>) : (<i className="fa-solid fa-unlock"></i>)}
            </button>
        </div>

        <div className="header_search_bar_container">
            <input
            type="text"
            id="header_search_bar"
            placeholder="Search Memories..."
            />
        </div>

        <div className="header_button_container">
            <button id="edit_btn" className="icon_btn">
            <i className="fa-solid fa-pen"></i>
            </button>
        </div>

        <div className="header_button_container">
            <button id="add_new_btn" className="icon_btn">
            <i className="fa-solid fa-plus"></i>
            </button>
        </div>

        <div className="header_button_container">
            <button id="profile_btn" className="icon_btn">
            <i className="fa-solid fa-user"></i>
            </button>
        </div>

        <div className="header_button_container">
            <button id="search_btn" className="icon_btn">
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>

        </div>
    </>
    );
}

export default Header;