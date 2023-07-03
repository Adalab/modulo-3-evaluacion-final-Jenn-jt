import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CharacterDetails = (props) => {
  console.log(props);
  const setIcon = () => {
    if (props.users[0].status === 'Dead') {
      return 'fas fa-dizzy';
    } else if (props.users[0].status === 'Alive') {
      return 'fas fa-smile-wink';
    } else {
      return 'fas fa-question-circle';
    }
  };
  return (
    <div className='character__container'>
      <article className='character__detail'>
        <img
          className='detail__img'
          src={props.users[0].image}
          alt={`Foto de ${props.users[0].name}`}
          title={`Foto de ${props.users[0].name}`}
        />

        <section className='card__description'>
          <h4 className='card__titleD'>Name: {props.users[0].name}</h4>
          <ul className='card__details'>
            <li className='card__details--item'>
              Species: {props.users[0].species}
            </li>
            <li className='card__details--item '>
              Status: {props.users[0].status}
              <i class={`${setIcon()}`}></i>
            </li>
            <li className='card__details--item'>
              Origin: {props.users[0].origin}
            </li>
            <li className='card__details--item'>
              Number of episodes: {props.users[0].episodes}
            </li>
          </ul>
        </section>
      </article>
      <Link className='backToHomepage' to='/'>
        Go back to the Homepage
      </Link>
    </div>
  );
};

CharacterDetails.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.number,
    episodes: PropTypes.number,
    species: PropTypes.string,
    status: PropTypes.string,
  }),
};
export default CharacterDetails;
