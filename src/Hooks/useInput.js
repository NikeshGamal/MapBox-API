import { useState } from "react";

const useInput = (initialValue)=>{
//1.create new state and save the value and use it to update the value since it is a hook indeed
const [value,setValue]=useState(initialValue);

//create state for the suggestion section
const [suggestions, setSuggestions] = useState([]);
//suggestions will be in an array so array update will be done here

//2.handle the change since  for useInput, we need a form 
const handleChange =  async (event)=>{
   setValue(event.target.value);// document.getElementById("input").value=event.target.value;

   try{
 //endpoint
 const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=pk.eyJ1IjoiZG90YmFzaWMiLCJhIjoiY2t6Z3FwaHZjMDR0azJ2cGFvaWdoNHN1eCJ9.Knhp1ipVGyO2yZZ2X4i_2Q&autocomplete=true`;

 const response = await fetch(url);
 const results = await response.json();
 console.log(results.features);
  setSuggestions(results.features);
  console.log("Suggestion data");
  console.log(suggestions);
   }catch(error){
     console.log("Error Fetching data: ",error);
   }
};

//3.return the values to set the properties of the input field
return{
    value,
    onChange:handleChange,
    setValue,
    suggestions,
    setSuggestions
};
    
};

export default useInput;
