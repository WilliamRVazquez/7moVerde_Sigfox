'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';

// Components
import Navbar from './components/Navbar';

const MyPage = () => {
  const [variableData, setVariableData] = useState(null);
  let ws;

  useEffect(() => {
    ws = new WebSocket('ws://localhost:3002/movimiento');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setVariableData(data.movimiento);
    };

    // Cerrar el WebSocket al desmontar el componente
    return () => {
      ws.close();
    };
  }, []);

  const handleSwalConfirmation = useCallback((result) => {
    if (result.isConfirmed) {
      // Refrescar la página
      location.reload();
    }
  }, []);

  useEffect(() => {
    if (variableData === 1) {
      Swal.fire({
        icon: 'warning',
        title: 'MOVIMIENTO DETECTADO',
        text: 'Se ha detectado movimiento en el área',
        footer: '<a href="#">Why do I have this issue?</a>',
      }).then(handleSwalConfirmation);
    }
  }, [variableData, handleSwalConfirmation]);

  return (
    <>
    <Navbar />
    <div className="bg-gray-200 p-4">
      <div id="app" className="max-w-xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Motion Detection Dashboard</h1>
      </div>
    </div>
    </>
  );
};

export default MyPage;
