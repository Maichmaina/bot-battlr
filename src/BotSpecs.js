import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BotSpecs = ({ onEnlist }) => {
  const { botId } = useParams();
  const [bot, setBot] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/bots/${botId}`)
      .then(response => response.json())
      .then(data => {
        setBot(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching bot details:', error));
  }, [botId]);

  const handleBackToList = () => {
    navigate('/');
  };

  if (loading) {
    return <p>Loading bot details...</p>;
  }

  return (
    <div className="bot-specs">
      {bot && (
        <>
          <h2>{bot.name}</h2>
          <img src={bot.avatar_url} alt={bot.name} />
          <p>Health: {bot.health}</p>
          <p>Damage: {bot.damage}</p>
          <p>Armor: {bot.armor}</p>
          <button onClick={handleBackToList}>Back to List</button>
          <button onClick={() => onEnlist(bot)}>Enlist</button>
        </>
      )}
    </div>
  );
};

export default BotSpecs;