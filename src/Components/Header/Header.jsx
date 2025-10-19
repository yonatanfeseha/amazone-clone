import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";

function Header() {
  const [{ basket }, dispatch] = useContext(DataContext);

  return (
    <section className={classes.fixed}>
      <header className={classes.header__container}>
        {/* Left Section - Logo and Delivery */}
        <div className={classes.logo__container}>
          <Link to="/">
            <img
              className={classes.header__logo}
              src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
              alt="amazon-logo"
            />
          </Link>

          <div className={classes.deliver}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className={classes.search}>
          <select>
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search products..." />
          <BiSearch className={classes.search_icon} />
        </div>

        {/* Right Section */}
        <div className={classes.right__section}>
          <div className={classes.flag__container}>
            <img src="https://flagcdn.com/w320/us.png" alt="US flag" />
            <select>
              <option value="en">EN</option>
            </select>
          </div>

          <Link to="/auth" className={classes.account}>
            <p>Hello, sign in</p>
            <span>Account & Lists</span>
          </Link>

          <Link to="/orders" className={classes.orders}>
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <BiCart />
            <span>{basket.length}</span>
          </Link>
        </div>
      </header>
      <LowerHeader />
    </section>
  );
}

export default Header;
