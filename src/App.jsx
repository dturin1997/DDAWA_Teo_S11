import { useState, useEffect } from "react"
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles"
import { Container, Button, Typography } from "@mui/material"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

function App() {
  const [age, setAge] = useState('');
  const [categorias, setCategorias] = useState([])
  const [pokemones, setPokemones] = useState([])

  const handleChange = (event) => {
    setAge(event.target.value);
    //setPokemones(event.target.value)
    console.log(event.target.value)
    listadoPokemones(event.target.value)
  };

  async function listadoTipo() {
   const response = await axios.get('https://pokeapi.co/api/v2/type');
   setCategorias(response.data.results)
   console.log(response.data.results)
   console.log(categorias)
   
  }

  async function listadoPokemones(url) {
    const response = await axios.get(url);
    setPokemones(response.data.results)
    console.log(response.data.results)
    console.log(categorias)
    
   }
 
  useEffect(() => {
    listadoTipo();
  }, [])

  
  
  

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h2">Mi primera con material</Typography>
        <Button color="secondary" variant="contained">
          Hola mundo
        </Button>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipos</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Tipos"
            onChange={handleChange}
          >
            {categorias.map(function(item, i){
              
              return <MenuItem value={item.url}>{item.name}</MenuItem>
            })}
            
          </Select>
        </FormControl>
        <table>
        {pokemones.map(function(item, i){
              
              return <tr value={item.url}>
                      <td>
                        {item.name}
                      </td>
                    </tr>
            })}
          
        </table>
    </Container>
    
    </ThemeProvider>
    
  );
}

export default App
