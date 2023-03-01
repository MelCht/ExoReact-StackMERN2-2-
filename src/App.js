import './App.scss';
import React, { useState} from 'react';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';

function App() {
  const [user, setUser] = useState([])
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleShow = async () => 
  {
    try 
    {
      const awaitFetch = await fetch('http://localhost:8080/users') 
      const data = await awaitFetch.json();  
      setUser(data);
      setIsButtonClicked(true);
    } catch(error) 
    {
      console.error('Il y a eu une erreur lors du chargement des données : ', error);
    };
  };

  const[isDeleted, setIsDeleted] = useState(false)
          
  const Delete = async (id) => {
    try {
      await fetch(`http://localhost:8080/users/${id}`, {
        method: "DELETE",
      });
      setIsDeleted(true);
      setUser((prevUser) => prevUser.filter((user) => user.id !== id));
      const usersTest = await fetch("http://localhost:8080/users");
      const data = await usersTest.json();
      setUser(data);
    } catch(error) {
      console.error(error);
    }
  }
            
  return (
    <>
      <Header />
      <button 
      className='users'
      onClick={handleShow}>Voir les utilisateurs</button>
      {isButtonClicked && (
        <div className="card">        
          {user.map((current) => (
            <div className="card-body" key={current._id}>
              <div>
                <div className='name'>
                  <h2>{current.name}</h2>
                </div>
                <div className='age'>
                  <h3>Age:</h3> {current.age}
                </div>
                <div className='salary'>
                  <h3>Salaire:</h3> {current.salary}
                </div>
                <button className='delete'
                onClick={() => Delete(current._id)}
                >Supprimer</button>
              </div>
            </div>           
          ))}
        </div>       
      )}                 
      <Footer />
    </>
  );
}

export default App;
