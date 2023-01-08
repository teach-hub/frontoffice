import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchQuery, useRelayEnvironment } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro'
import { Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react'

const Root = () => {
  const navigate = useNavigate();
  const relayEnv = useRelayEnvironment();

  const elements = [];

  for (let i = 0; i < 100; i++) {
    elements.push(
      <h1>Hey! Welcome to TeachHub aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!</h1>
    )
  }

  return (
    <div>
      <h1>Aca empieza</h1>
      <h1>Hey! Welcome to TeachHub!</h1>
      {elements}
      <button onClick={() => navigate('/falopa')}> Click me to go over another page </button>
    </div>
  );
}

export default Root;
