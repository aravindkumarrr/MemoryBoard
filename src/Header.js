import './CSS/Header.css';

function Header(){
    return(
    <>
        <div id = "header_container">
            <div class = "header_button_container">
                <button id = "lock_btn">Lock</button>
            </div>
            <div class = "header_search_bar_container">
                <input type = "text" id = "header_search_bar" placeholder='Search Memories...'></input>
            </div>
            <div class = "header_button_container">
                <button id = "edit_btn">Edit</button>
            </div>
            <div class = "header_button_container">
                <button id = "add_new_btn">Add New</button>
            </div>
            <div class = "header_button_container">
                <button id = "profile_btn">Profile</button>
            </div>
            
        </div>
    </>
    );
}

export default Header;