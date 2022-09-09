import {FiSearch} from 'react-icons/fi'
import { useState } from 'react'
import './style.css'
import api from './services/api'


function App() {

  const [ input, setInput] = useState('');
  const [cep, setCep] = useState({});

   async function handleSearch(){
    // 24743000/json/

    if(input ===''){
      alert('Coloque algum cep para buscas')
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")
    } catch (error) {
      alert('Erro de busca de cep')
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Busca Cep's</h1>

      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite o Cep"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className='btnSearch' onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

        {Object.keys(cep).length > 0 && (
                <main className='main'>
                <h2>CEP:{cep.cep}</h2>
        
                <span>{cep.logradouro}</span>
                <span>Complemnto: {cep.complemento}</span>
                <span> {cep.bairro}</span>
                <span>{cep.localidade} - {cep.uf}</span>
        
        
              </main>
        )}

    </div>
  )
}

export default App
