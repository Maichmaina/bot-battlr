import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BotCollection from './BotCollection';
import BotSpecs from './BotSpecs';
import YourBotArmy from './YourBotArmy';

function App() {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yourBotArmy, setYourBotArmy] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/bots')
      .then(response => response.json())
      .then(data => {
        setBots(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching bots:', error));
  }, []);

  const enlistBot = (bot) => {
    const existingBot = yourBotArmy.find(b => b.bot_class === bot.bot_class);
    if (!existingBot) {
      setYourBotArmy([...yourBotArmy, bot]);
    } else {
      console.log(`Already enlisted a bot of class ${bot.bot_class}`);
    }
  };
 
  const releaseBot = (botId) => {
    setYourBotArmy(yourBotArmy.filter(bot => bot.id !== botId));
  };

  return (
    <Router>
      <div className="App">
        <h1>Bot Battlr</h1>
        <Routes>
          <Route
            path="/"
            element={<>
              <YourBotArmy army={yourBotArmy} onRelease={releaseBot} />
              <BotCollection bots={bots} onEnlist={enlistBot} />
            </>}
          />
          <Route
            path="/bots/:botId"
            element={<BotSpecs onEnlist={enlistBot} />}
          />
        </Routes>
        {loading && <p>Loading bots...</p>}
      </div>
    </Router>
  );
}

export default App;
