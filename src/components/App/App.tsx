import * as React from "react";
import { BrowserRouter} from "react-router-dom";
import "antd/dist/antd.css";
import { NavBar } from "../layout/nav-bar/nav-bar";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../types/redux-store";
import { memo } from "react";
import { Footer } from "../layout/footer/footer";
import { MainSection } from "../layout/main-section/main-section";

const App: React.FC = memo(() => {
  const auth: any = useSelector((store: ReduxStore) => store.firebase.auth);

  return (
    <BrowserRouter >

      {
        !!auth.isLoaded
          ? (
            <>
              <NavBar />

              <MainSection />

              <Footer />
            </>
          )
          : null}

    </BrowserRouter>
  );
});

export default App;
