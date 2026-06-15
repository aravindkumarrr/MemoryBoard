import './CSS/Header.css';

function Header({ isEditMode, toggleEditMode, onAddClick, onLock }) {
    return (
    <>
        <div id="header_container">
            <div className="header_button_container">
                <button id="lock_btn" className="icon_btn" onClick={onLock}>
                    <i className="fa-solid fa-unlock"></i>
                </button>
            </div>

            <div className="header_search_bar_container">
                <input type="text" id="header_search_bar" placeholder="Search Memories..." />
            </div>

            <div className="header_button_container">
                <button 
                    id="edit_btn" 
                    className="icon_btn" 
                    onClick={toggleEditMode}
                    style={{ background: isEditMode ? 'var(--bg-hover)' : 'transparent', color: isEditMode ? 'var(--accent-blue)' : 'inherit' }}
                >
                    <i className="fa-solid fa-pen"></i>
                </button>
            </div>

            <div className="header_button_container">
                <button id="add_new_btn" className="icon_btn" onClick={onAddClick}>
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