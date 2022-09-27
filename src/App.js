import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Edit from './components/Edit';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <>
    <section className="todoapp">
      
      <Routes>
        <Route path="/" element={[<Header />,<Content />]} />

        <Route path="/edit/:id" element={<Edit />} />
        
      </Routes>
      
    </section>
    </>
  );
}

export default App;
