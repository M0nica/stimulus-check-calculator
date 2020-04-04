import Header from "../partials/seo-meta";
import Footer from "../partials/footer";
import Form from "../partials/form";
import styles from "./index.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <h1>Stimulus Check Calculator 💸</h1>
        <p>
          Use this calculator to determine the estimated amount of your stimulus
          check under the CARES Act.
        </p>
        <Form />
        <Footer />
      </main>
    </div>
  );
}

export default Home;
