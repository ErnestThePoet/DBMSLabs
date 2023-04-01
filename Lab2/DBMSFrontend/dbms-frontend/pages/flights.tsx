import { observer } from "mobx-react-lite";
import React from "react";
import styles from "../styles/flights.module.scss";

const FlightsPage: React.FC = observer(() => {
    return <main className={styles.main}></main>;
});

export default FlightsPage;
