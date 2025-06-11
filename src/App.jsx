import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Footer from "./Components/footer";
import Menu from "./Components/Menu";
import BookTable from "./Components/BookTable";
import Contact from "./Components/Contact";

function App() {
  return (
    <>
      <NavBar />
      {/* <Home /> */}
      <Menu />
      <BookTable />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
