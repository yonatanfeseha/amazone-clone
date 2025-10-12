import { GiHamburgerMenu } from "react-icons/gi";
import classes from "./LowerHeader.module.css";

function LowerHeader() {
  return (
    <div className={classes.lowerHeader}>
      {/* Left - All Menu */}
      <div className={classes.left}>
        <div className={classes.allMenu}>
          <GiHamburgerMenu />
          <span>All</span>
        </div>

        {/* Nav Links */}
        <ul className={classes.navLinks}>
          <li>
            <a href="/">Today's Deals</a>
          </li>
          <li>
            <a href="/">Customer Service</a>
          </li>
          <li>
            <a href="/">Registry</a>
          </li>
          <li>
            <a href="/">Gift Cards</a>
          </li>
          <li>
            <a href="/">Sell</a>
          </li>
        </ul>
      </div>

      {/* Right - Promo / Info */}
      <div className={classes.right}>
        <a href="/">Shop great deals now</a>
      </div>
    </div>
  );
}

export default LowerHeader;
