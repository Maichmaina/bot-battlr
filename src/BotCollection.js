import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BotCard from './BotCard';
import SortBar from './SortBar';

const BotCollection = ({ bots, onEnlist }) => {
  const [filteredBots, setFilteredBots] = useState([]);
  const [yourBotArmy, setYourBotArmy] = useState([]);
  const [filters, setFilters] = useState([]);
  const botClasses = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"];
  const navigate = useNavigate();

  const handleSort = (criteria) => {
    const sorted = [...filteredBots].sort((a, b) => b[criteria] - a[criteria]);
    setFilteredBots(sorted);
  };

  const handleFilter = (classType) => {
    if (filters.includes(classType)) {
      const updatedFilters = filters.filter(filter => filter !== classType);
      setFilters(updatedFilters);
    } else {
      setFilters([...filters, classType]);
    }
  };

  const handleEnlist = (bot) => {
    if (!yourBotArmy.find(b => b.bot_class === bot.bot_class)) {
      setYourBotArmy([...yourBotArmy, bot]);
    }
    onEnlist(bot);
    const remainingBots = filteredBots.filter(b => b.id !== bot.id);
    setFilteredBots(remainingBots);
  };

  const handleCardClick = (bot) => {
    navigate(`/bots/${bot.id}`);
  };

  useEffect(() => {
    if (bots.length > 0) { 
      setFilteredBots(bots); 
    }
  }, [bots]);

  const filteredByClass = filters.length > 0
    ? filteredBots.filter(bot => filters.includes(bot.bot_class))
    : filteredBots;

  return (
    <div className="bot-collection">
      <SortBar 
        onSortHealth={() => handleSort('health')} 
        onSortDamage={() => handleSort('damage')} 
        onSortArmor={() => handleSort('armor')} 
      />
      <div className="filter-bar">
        {botClasses.map(botClass => (
          <label key={botClass}>
            <input
              type="checkbox"
              value={botClass}
              checked={filters.includes(botClass)}
              onChange={() => handleFilter(botClass)}
            />
            {botClass}
          </label>
        ))}
      </div>
      <div className="bot-cards">
        {filteredByClass.map(bot => (
          <BotCard key={bot.id} bot={bot} onEnlist={handleEnlist} onClick={() => handleCardClick(bot)} />
        ))}
      </div>
    </div>
  );
};

export default BotCollection;