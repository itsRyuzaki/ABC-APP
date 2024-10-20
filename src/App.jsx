import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  // useEffect(() => {
  //   fetch("http://localhost:3000/meals")
  //     .then((res) => res.json())
  //     .then(console.log);
  // }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
