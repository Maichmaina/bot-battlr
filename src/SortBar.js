import React from 'react';

const SortBar = ({ onSortHealth, onSortDamage, onSortArmor }) => {
  return (
    <div className="sort-bar">
      <button onClick={() => onSortHealth('health')}>Sort by Health</button>
      <button onClick={() => onSortDamage('damage')}>Sort by Damage</button>
      <button onClick={() => onSortArmor('armor')}>Sort by Armor</button>
    </div>
  );
};

export default SortBar;