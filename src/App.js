import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Accueil from './accueil/Accueil';
import About from './about/About';
import About2 from './about/About2';
import Matiere from './matiere/Matiere';
import Salle from './salle/Salle';
import Classe from './classe/Classe';
import Disponible from './disponibilite/Disponible';
import Semaine from './semaine/Semaine';
import Semaine2 from './semaine/Semaine2';
import Enseignant from './enseignant/Enseignant';
import Enseignement from './enseignement/Enseignement';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Accueil/>} />
          <Route path="about/:id" element={<About/>}/>
          <Route path="about2/:id" element={<About2/>}/>
          <Route path="accueil" element={<Accueil/>}/>
          <Route path="matiere" element={<Matiere/>}/>
          <Route path="salle" element={<Salle/>}/>
          <Route path="classe" element={<Classe/>}/>
          <Route path="disponible" element={<Disponible/>}/>
          <Route path="semaine" element={<Semaine/>}/>
          <Route path="semaine2/:id" element={<Semaine2/>}/>
          <Route path="enseignant" element={<Enseignant/>}/>
          <Route path="enseignement" element={<Enseignement/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
