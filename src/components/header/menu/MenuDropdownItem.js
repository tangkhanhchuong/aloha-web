const MenuDropdownItem = ({ appearance, content, showDropdownIcon = false }) => {
  return (
    <>
      <span
        className={`nav-link ${showDropdownIcon ? 'dropdown-toggle' : 'position-relative'}`}
        id='navbarDropdown'
        role='button'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        {appearance}
      </span>
      <div
        className='dropdown-menu'
        aria-labelledby='navbarDropdown'
      >
        {content}
      </div>
    </>
  )
}

export default MenuDropdownItem