import React, { useState } from 'react';
import './App.css';

function App() {
  const [numMeses, setNumMeses] = useState(0);
  const [datosMeses, setDatosMeses] = useState([]);
  const [inflacionProyectada, setInflacionProyectada] = useState(0);
  const [resultado, setResultado] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const totalMeses = 12;
    const inflacion = calculadoraInflacionMensual(datosMeses, totalMeses, inflacionProyectada);
    setResultado(inflacion);
  };

  const handleChangeNumMeses = (event) => {
    setNumMeses(parseInt(event.target.value));
    setDatosMeses([]);
  };

  const handleChangeDatoMes = (index, value) => {
    const newData = [...datosMeses];
    newData[index] = value;
    setDatosMeses(newData);
  };

  const renderInputsMeses = () => {
    const inputs = [];
    for (let i = 0; i < numMeses; i++) {
      inputs.push(
        <input
          key={i}
          type="number"
          placeholder={`Mes ${i + 1}`}
          value={datosMeses[i] || ''}
          onChange={(e) => handleChangeDatoMes(i, parseInt(e.target.value))}
        />
      );
    }
    return inputs;
  };

  const calculadoraInflacionMensual = (datosMeses, totalMeses, inflacionProyectada) => {
    let acum = 1;
    if (datosMeses.length > 0) {
      datosMeses.forEach(i => {
        acum *= (i / 100 + 1);
      });
    }
    const inflacionRestante = (inflacionProyectada / 100 + 1) / acum;
    const calculoMeses = totalMeses - datosMeses.length;
    const inflaPromedio = Math.pow(inflacionRestante, 1 / calculoMeses);
    return (inflaPromedio - 1) * 100;
  };

  return (
    <div className="wrapper">
      <div className='container'>
        <h1>Calculadora de Inflación Mensual</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Cantidad de meses con dato:
            <select value={numMeses} onChange={handleChangeNumMeses}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>

          {renderInputsMeses()}
 
          <label>
            Inflación Proyectada (%):
            <input
              type="number"
              value={inflacionProyectada}
              onChange={(e) => setInflacionProyectada(parseInt(e.target.value))}
            />
          </label>

          <button type="submit">Calcular</button>
        </form>
        <div>
          <h2>Resultado: {resultado}%</h2> 
        </div>
      </div>
    </div>
  );
}

export default App;

