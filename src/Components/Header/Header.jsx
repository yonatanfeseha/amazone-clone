import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
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

          <Link to={!user && "/auth"} className={classes.account}>
            <div>
              {user ? (
                <>
                  <p>Hello, {user.email.split("@")[0]}</p>
                  <span onClick={() => auth.signOut()}> sign out</span>
                </>
              ) : (
                <>
                  <p>Hello, Sign in</p>

                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>

          <Link to="/orders" className={classes.orders}>
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <BiCart />
            <span>{totalItem}</span>
          </Link>
        </div>
      </header>
      <LowerHeader />
    </section>
  );
}

export default Header;
