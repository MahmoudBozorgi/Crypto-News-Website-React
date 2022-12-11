import styled from "styled-components";
import React from "react";

const LoadingStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #383636;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
`;

const Loading = () => {
  return (
    <LoadingStyle>
      <LoadingSpinner />
    </LoadingStyle>
  );
};

export default Loading;
