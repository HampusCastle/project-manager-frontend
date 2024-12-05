import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center p-4">
      <h1>Välkommen till Projektledningsappen</h1>
      <p>Den bästa appen för att hantera projekt och uppgifter.</p>
      <div>
        <Link to="/login" className="bg-blue-500 text-white p-2 rounded">Logga in</Link>
      </div>
    </div>
  );
};

export default Home;
