  import React ,{useState}from "react";
  import styled from "styled-components";
  import useInput from "../Hooks/useInput";

  const InputField = () => {
    //address given by the user
    let address = useInput("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [enterStatus, setEnterStatus] = useState(false);

    //************TODO: selectig from keydown***************
    // const [suggestionIndex, setSuggestionIndex] = useState(null);

    // const handleSuggestions = (presentSuggestion)=>{
    //   address.setValue(presentSuggestion.place_name);
    // }

    const updateEnterStatus = ()=>{
      if(!enterStatus){
        setEnterStatus(true);
        console.log("entered status changed to true");
      }else{
        setEnterStatus(false);
        address.setValue('');
        address.setSuggestions([]);
        console.log("entered status changed to false");
      }
    }

    const updateLongitude= (suggestion) =>{
          setLongitude(suggestion.geometry.coordinates[0])
          console.log(suggestion.geometry.coordinates[0]);
    }
    
    const updateLatitude= (suggestion) =>{
         setLatitude(suggestion.geometry.coordinates[1])
         console.log(suggestion.geometry.coordinates[1]);
    }

    return (
      <Wrapper>
        <h1 style={{color:"white",fontSize:"2.5rem"}}>GeoCoding with MapBox</h1>
        <Input
          placeholder="Address"
          {...address}
          isTyping={address.value !== ""}

          //************TODO: selectig from keydown***************
          // onKeyDown={()=>{
          //   console.log("Down key pressed");
          //   handleSuggestions(address.suggestions);
          // }}

          //when entered is pressed latitude and longitude value should be displayed
          onKeyPress={(e)=>{
              if(e.key==="Enter"){
                  updateEnterStatus();
          }
        }
        }
        />
        {address.suggestions.length > 0 && (
          <SuggestionWrapper>
            {address.suggestions.map((suggestion, index) => {
              return (
                <Suggestion
                  key={index}
                  onClick={()=>{
                    address.setValue(suggestion.place_name);
                    address.setSuggestions([]);
                    updateLatitude(suggestion);
                    updateLongitude(suggestion);
                    updateEnterStatus();
                  }
                }
                >
                  {suggestion.place_name}
                </Suggestion>
              );
            })}
          </SuggestionWrapper>
        )}

        {/* Container to display the latitude and longitude of the place */}
      {enterStatus &&  <Coordinate>Latitude: {latitude}</Coordinate>}
      {enterStatus &&  <Coordinate>Longitude: {longitude}</Coordinate>}
      </Wrapper>
    );
  };

  export default InputField;

  const Coordinate= styled.div`
    width:400px;
    margin-top:10px;
    padding: 5px 10px;
    font-size: 1.1rem;
    color:white;
  `;

  const Wrapper = styled.div`
    margin: -5em auto 2em;
  `;

  const Input = styled.input`
    width: 400px;
    font-size: 1rem;
    background: white;
    border: none;
    padding: 10px 20px;
    border-radius: 30px;


    position: realtive;
    display: grid;
    justify-self: center;
    &:focus {
      outline: none;
      border-radius: ${(props) => props.isTyping && "10px 10px 0 0"};
    }
  `;

  const SuggestionWrapper = styled.div`
    background: white;
    position: absolute;
    width: 400px;
    padding: 10px 20px;
    border-radius: 0px 0px 10px 10px;
  `;

  const Suggestion = styled.p`
    cursor: pointer;
    max-width: 400px;
  `;
