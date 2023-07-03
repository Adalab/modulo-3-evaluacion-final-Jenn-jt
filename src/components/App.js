import { useState, useEffect } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
// services
import GetApiData from '../services/GetApiData';
import ls from '../services/local-storage';
//components
import CharacterList from './CharacterList';
import Filter from './Filter';
import CharacterDetails from './CharacterDetails';
//style
import '../styles/App.scss';

function App() {
  const usersLocalStorage = ls.get('users', []); //el segundo parámetro corresponde a defaultData
  const [users, setUsers] = useState(usersLocalStorage);
  const [filterName, setFilterName] = useState(ls.get('filterName', '')); //string vacío hace que nos muestre todos los personajes.
  const [filterSpecies, setFilterSpecies] = useState(
    ls.get('filterSpecies', '')
  );
  const [filterStatus, setFilterStatus] = useState(ls.get('filterStatus', ''));

  //UseEffect

  useEffect(() => {
    if (users.length === 0) {
      GetApiData().then((userData) => {
        setUsers(userData);
      });
    }
  }, [users.length]);

  useEffect(() => {
    ls.set('users', users);
  }, [users]); //guardo en en el array siempre que cambia users

  useEffect(() => {
    ls.set('filterName', filterName);
  }, [filterName]);

  useEffect(() => {
    ls.set('filterSpecies', filterSpecies);
  }, [filterSpecies]);

  useEffect(() => {
    ls.set('filterStatus', filterStatus);
  }, [filterStatus]);

  //Handle Function

  const handleFilter = (data) => {
    if (data.key === 'name') {
      setFilterName(data.value);
    } else if (data.key === 'species') {
      setFilterSpecies(data.value);
    } else if (data.key === 'status') {
      setFilterStatus(data.value);
    }
  };

  // render
  const filteredUsers = users
    .filter((user) => {
      return user.name.toLowerCase().includes(filterName.toLowerCase());
    })
    .filter((user) => {
      return filterSpecies === '' ? true : user.species === filterSpecies;
    })
    .filter((user) => {
      return filterStatus === '' ? true : user.status === filterStatus;
    });

  return (
    <div className='App'>
      <div className='logo__container'>
        <Link className='unfinded__homepage' to='/'>
          <img
            className='logo'
            src='https://www.vodafone.es/c/statics/imagen/img_OG_Rick_y_Morty_T4_V2.jpg'
            alt='Logo Rick and Morty'
          ></img>
        </Link>
      </div>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Filter
                handleFilter={handleFilter}
                filterName={filterName}
                filterSpecies={filterSpecies}
              />
              <CharacterList users={filteredUsers} />{' '}
            </>
          }
        />
        <Route
          path='/character/:userId'
          element={<CharacterDetails users={filteredUsers} />}
        />
      </Routes>
    </div>
  );
}

export default App;
