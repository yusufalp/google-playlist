import React from 'react';

export default function Play(props){
  return(
    <div className='playlist'>
      <h2>{props.App}</h2>
      <div className='category'>Category: {props.Category}</div>
      <div className='rating'>Rating: {props.Rating}</div>
      <div className='installs'>Installs: {props.Installs}</div>
      <div className='type'>Type: {props.Type}</div>
      <div className='genres'>Genres: {props.Genres}</div>
    </div>
  )
}