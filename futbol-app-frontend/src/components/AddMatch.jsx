import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddMatch.css";

const AddMatch = () => {
  const [players, setPlayers] = useState([]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [winner, setWinner] = useState('');
  const [mvp, setMvp] = useState('');
  const [message, setMessage] = useState('');

  // Obtener la URL de la API desde las variables de entorno
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // Obtener los jugadores del backend
    axios.get(`${apiUrl}/players`)
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error('Error al cargar los jugadores:', error);
      });
  }, [apiUrl]);

  // Función para agregar o quitar jugadores de un equipo
  const togglePlayer = (player, team) => {
    if (team === 'A') {
      setTeamA(prev => prev.includes(player.name) ? prev.filter(p => p !== player.name) : [...prev, player.name]);
    } else {
      setTeamB(prev => prev.includes(player.name) ? prev.filter(p => p !== player.name) : [...prev, player.name]);
    }
  };

  const handleSubmit = () => {
    if (teamA.length === 0 || teamB.length === 0 || winner === '') {
      setMessage('Por favor, selecciona ambos equipos y el ganador.');
      return;
    }

    const match = {
      players: [...teamA, ...teamB],
      winner: winner === 'A' ? teamA : teamB,
      mvp
    };

    // Enviar el partido al backend
    axios.post(`${apiUrl}/matches`, match)
      .then(response => {
        setMessage('Partido registrado exitosamente');
        setTeamA([]);
        setTeamB([]);
        setWinner('');
        setMvp('');
      })
      .catch(error => {
        setMessage('Error al registrar el partido');
        console.error(error);
      });
  };

  return (
    <div className="add-match-container">
      <h2>Registrar Partido</h2>
      <div className="teams-container">
        <div className="team">
          <h3>Equipo A</h3>
          {players.map(player => (
            <button
              key={player.name}
              onClick={() => togglePlayer(player, 'A')}
              className={`player-btn ${teamA.includes(player.name) ? 'selected' : ''}`}
            >
              {player.name}
            </button>
          ))}
        </div>

        <div className="team">
          <h3>Equipo B</h3>
          {players.map(player => (
            <button
              key={player.name}
              onClick={() => togglePlayer(player, 'B')}
              className={`player-btn ${teamB.includes(player.name) ? 'selected' : ''}`}
            >
              {player.name}
            </button>
          ))}
        </div>
      </div>

      <div className="winner-mvp">
        <div>
          <h3>Selecciona el equipo ganador:</h3>
          <button onClick={() => setWinner('A')} className={`winner-btn ${winner === 'A' ? 'selected' : ''}`}>Equipo A</button>
          <button onClick={() => setWinner('B')} className={`winner-btn ${winner === 'B' ? 'selected' : ''}`}>Equipo B</button>
        </div>

        <div>
          <h3>Selecciona el MVP:</h3>
          <select onChange={(e) => setMvp(e.target.value)} value={mvp}>
            <option value="">Seleccionar MVP</option>
            {players.map(player => (
              <option key={player.name} value={player.name}>{player.name}</option>
            ))}
          </select>
        </div>
      </div>

      {message && <p className="message">{message}</p>}

      <button onClick={handleSubmit} className="submit-btn">Registrar Partido</button>
    </div>
  );
};

export default AddMatch;
