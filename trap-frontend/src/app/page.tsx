import Image from "next/image";
import { AnchorButton, Button } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import styles from "./page.module.css";
import Header from "./components/header";
import PageContent from "./components/pageContent";

import { Tab, Tabs } from "@blueprintjs/core";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <PageContent />
    </div>
  );
}
