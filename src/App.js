import styled from 'styled-components';
import './App.css';
import InputField from './Components/InputField';

function App() {
  return (
    <Container>
      <h1 style={{color:"white",fontSize:"2.5rem"}}>GeoCoding with MapBox</h1>
      <InputField/>
   </Container>
  );
}

export default App;

const Container = styled.div`
  padding:1em 1.5em;
  width:100vw;
  height:100vh;
  display:flex;
  justify-content: center;
  align-items:center;
  flex-direction:column;
  background:purple;
  border:1px solid hotpink;
`;

