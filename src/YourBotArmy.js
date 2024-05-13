import React from 'react';

const YourBotArmy = ({ army, onRelease }) => {
  const handleRelease = (botId) => {
    onRelease(botId);
  };

  return (
    <div className="your-bot-army">
      <h2>Your Bot Army</h2>
      <div className="enlisted-bot-cards">
        {army.map(bot => (
          <div key={bot.id} className="bot-card">
            <img src={bot.avatar_url} alt={bot.name} />
            <h3>{bot.name}</h3>
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
            <button onClick={() => handleRelease(bot.id)}>Release</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourBotArmy;