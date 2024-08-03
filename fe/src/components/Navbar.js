import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img src="/icons/menu-icon.png" alt="Expand Menu" />
      <img src="/icons/user.jpg" alt="User" className={styles.userIcon} />
    </nav>
  );
};
