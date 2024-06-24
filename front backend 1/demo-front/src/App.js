import logo from './logo.svg';
import './App.css';

function FormConsulta(){

  async function handleClick(){
    const id = document.getElementById("idPub").value;

    const URL_base = "http://localhost:3080/";

    
    if(id.length > 0){
      const response = await fetch(URL_base + "publicaciones/" + id);
      try{  
        const data = await response.json();
        document.getElementById("tabBody").innerHTML = "<tr><td>" + data.id + "</td><td>" + data.titulo +
          "</td><td>" + data.contenido + "</td><td>" + data.autor + "</td></tr>";
        console.log(data); 
        
      } catch(error) {
        console.log("error");
      }

    } else {
      const response = await fetch(URL_base + "publicaciones");
      const data = await response.json();
      document.getElementById("tabBody").innerHTML = "";
      for(let i in data){
        let item = data[i];
        document.getElementById("tabBody").innerHTML += "<tr><td>" + item.id + "</td><td>" + item.titulo +
        "</td><td>" + item.contenido + "</td><td>" + item.autor + "</td></tr>";
      }
      console.log(data);
    }

  }


  return(
    <>
      ID PUBLICACION: <input type='number' id='idPub'></input><br/>
      <button type='button' onClick = {handleClick} >Consultar</button>
      <hr/>
      <table border="1">
        <thead>
          <th>ID</th>
          <th>Titulo</th>
          <th>Contenido</th>
          <th>Autor</th>
        </thead>
        <tbody id="tabBody"></tbody>
      </table>
    </>
  )
}

function FormRegistro() {

  async function handleClick(){
    const URL_base = "http://localhost:3080/";
    const response = await fetch(URL_base + "publicaciones", {
      method: "POST",
      body: JSON.stringify({
        titulo: document.getElementById("titulo").value,
        contenido: document.getElementById("contenido").value,
        autor: document.getElementById("autor").value
      }),
      headers: {
        'Content-type': 'application/json'
      }
    });
    console.log(response);
  }

  return(<form>
    <input name="titulo" id="titulo" placeholder="titulo"></input><br></br>
    <input name="contenido" id="contenido" placeholder="contenido"></input><br></br>
    <input name="autor" id="autor" placeholder="autor"></input><br></br>
    <button type="button" onClick={handleClick}>Guardar</button>
  </form>);
}

function App() {
  return (
    <>
    <FormRegistro></FormRegistro>
    </>
  );
}

export default App;
