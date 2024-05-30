import React, { useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'jspdf-autotable';
import ChartComponent from './ChartComponent';

const PdfGenerator = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState([]);
  const reportRef = useRef();
  const chartRef = useRef();


  const fetchUserName = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5095/RegistroHorasOperador?correoOperador=${email}`);
      console.log(response.data)
      if (response.data.length != 0) {
        setUserName("Reporte generado");
        setUserData(response.data)
      } else {
        setUserName('No hay horas registradas o usuario incorrecto');
        setUserData(response.data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserName('Error fetching user data');
    }
  };

  const generatePdf = () => {
    const pdf = new jsPDF();
    pdf.text('Reporte generado por Administrador', 14, 22);
    pdf.text(`Operador: ${email}`, 14, 32);
    pdf.autoTable({
      startY: 40,
      head: [['Hora Entrada', 'Hora Salida', 'Horas Transcurridas']],
      body: userData.map(entry => [entry.HoraEntrada, entry.HoraSalida, entry.HorasTranscurridas]),
    });
    pdf.save('report.pdf');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFetchUser = () => {
    fetchUserName(email);
  };

  return (
    <div>
      <div>
       
      </div>
      <div ref={reportRef} style={{ padding: '10px', backgroundColor: '#f5f5f5', marginTop: '20px' }}>
        <h1>Generador de Reportes</h1>
        <label>
          Correo electrónico:
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <button onClick={handleFetchUser}>Generar</button>
        <p>{userName}</p>
      </div>
      <div ref={chartRef} style={{ marginTop: '20px' }}>
        {userData.length > 0 && <ChartComponent data={userData} />}
      </div>
      <button onClick={generatePdf}>Descargar reporte en PDF</button>
    </div>
  );
};

export default PdfGenerator;
