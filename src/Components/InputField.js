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
    const [suggestionIndex, setSuggestionIndex] = useState(0);

    const handleDownArrow = (presentSuggestion)=>{
      console.log("before change");
      console.log(suggestionIndex);
      setSuggestionIndex((suggestionIndex+1)%presentSuggestion.length);
      console.log("after change");
      console.log(suggestionIndex);

      address.setValue(presentSuggestion[suggestionIndex].place_name);
    }

   

    const updateLongitude= (suggestion) =>{
          setLongitude(suggestion.geometry.coordinates[0])
          console.log(suggestion.geometry.coordinates[0]);
    }
    
    const updateLatitude= (suggestion) =>{
         setLatitude(suggestion.geometry.coordinates[1])
         console.log(suggestion.geometry.coordinates[1]);
    }


    const updateEnterStatus = (presentSuggestion)=>{
      if(!enterStatus){
        setEnterStatus(true);
        console.log("entered status changed to true");
        address.setSuggestions([]);
        updateLatitude(presentSuggestion[suggestionIndex]);
        updateLongitude(presentSuggestion[suggestionIndex]);
      }else{
        setEnterStatus(false);
        address.setValue('');
        setSuggestionIndex(0);
        address.setSuggestions([]);
        console.log("entered status changed to false");
      }
    }
    return (
      <Wrapper>
        <h1 style={{color:"white",fontSize:"2.5rem"}}>GeoCoding with MapBox</h1>
        <Input
          placeholder="Address"
          {...address}
          isTyping={address.value !== ""}

          //************selectig from keydown***************
          onKeyDown={(e)=>{address.value !=="" && e.keyCode=== 40 && handleDownArrow(address.suggestions)
          }}

          //when entered is pressed latitude and longitude value should be displayed
          onKeyPress={(e)=>{
              if(e.key==="Enter"){
                  updateEnterStatus(address.suggestions);
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
                    updateEnterStatus(address.suggestions);
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
