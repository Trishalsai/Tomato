import React, { useState } from 'react';
function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://16.171.69.119/classify', {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        //'Access-Control-Allow-Origin': 'http://16.16.107.23:80:3000'
      },
      body: formData
    });
    console.log(response)
    const data = await response.json();
    setResult(data.result);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }} onSubmit={handleSubmit}>
        <input style={{ margin: '1rem 0' }} type="file" onChange={handleFileChange} />
        <button style={{ backgroundColor: '#4caf50', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">Submit</button>
      </form>
      {result && <p style={{ marginTop: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>Class: {result}</p>}
    </div>
  );

}

export default App;
