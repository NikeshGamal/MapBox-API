import styled from 'styled-components';
import './App.css';
import InputField from './Components/InputField';

function App() {
  return (
    <Container>
      <InputField/>
   </Container>
  );
}

export default App;

const Container = styled.div`
  padding:1em 1.5em;
  max-width:100%;
  height:95vh;
  display:flex;
  justify-content: center;
  align-items:center;
  flex-direction:column;
  background:purple;
  border:1px solid hotpink;
`;

