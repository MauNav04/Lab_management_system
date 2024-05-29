import React, { useState } from 'react';
import axios from 'axios';

const Averia = () => {
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleIdChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Only allow numbers
      setId(value);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !description) {
      setError('Both ID and description are required.');
      return;
    }

    try {
      const response = await axios.post(`https://localhost:7008/RegistroAveria/AgregarAveria?idSolicitud=${id}&detalle=${description}`);
      console.log('Response:', response.data);
      setError(''); // Clear any previous errors
      alert('Se ha registrado la averia');
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Error submitting data. Please try again.');
    }
  };

  return (
    <div>
      <h1>Registro de Avería</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            ID del préstamo (Número):
            <input
              type="text"
              value={id}
              onChange={handleIdChange}
            />
          </label>
        </div>
        <div>
          <label>
            Avería encontrada:
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
        <button type="submit">Confirmar y enviar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Averia;
