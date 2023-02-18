import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import sushiImg from "@/assets/nigiri.png";
import styles from "./Home.module.styl";

const Home = () => {
  const { userInfo } = useContext(UserContext);
  return (
    <section data-testid="home-page">
      <div>
        <figure>
          <img src={sushiImg} alt="" />
        </figure>
        <p className={styles.userGreeting}>Hi {userInfo.first_name}!</p>
        <p>
          Let's create a fantastic dish for our customers sharing our passion
          for food, culture and innovation.
        </p>
        <p className={styles.thanks}>Thank you for being a part of our team!</p>
      </div>
    </section>
  );
};

export default Home;
