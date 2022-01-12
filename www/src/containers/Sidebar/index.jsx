import React from 'react'
import { MenuLinks } from '../../components'
import { FaTimes } from 'react-icons/fa'
import { closeMenu } from '../../store/slices/common'
import styles from './Sidebar.module.css'
import { useDispatch } from 'react-redux'

const Sidebar = (props) => {
  const dispatch = useDispatch()
  const handleCloseMenu = () => {
    dispatch(closeMenu())
    document.body.style.overflow = 'auto'
  }
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.sidebar__container}>
        <MenuLinks asideLinks={true} closeMenuAfterLinking={handleCloseMenu}/>
      </nav>
      <button className={styles.close__btn} onClick={handleCloseMenu}
              title="Close menu">
        <FaTimes />
      </button>
    </aside>
  )
}

export default Sidebar
