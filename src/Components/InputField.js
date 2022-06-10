import React from "react";
import styled from "styled-components";
import useInput from "../Hooks/useInput";

const InputField = () => {
  //address given by the user
  let address = useInput("");

  return (
    <Wrapper>
      <Input placeholder="Address" {...address}  isTyping={address.value !== ""}/>
      {address.suggestions.length > 0 && (
        <SuggestionWrapper>
          {address.suggestions.map((suggestion, index) => {
            return <Suggestion key={index}>{suggestion.place_name}</Suggestion>;
          })}
        </SuggestionWrapper>
      )}
    </Wrapper>
  );
};

export default InputField;

const Wrapper = styled.div`
  margin: 1em auto;
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
