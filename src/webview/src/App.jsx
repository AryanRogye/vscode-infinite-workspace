import { useState } from 'react'
import styled from "styled-components";
import './App.css'
import InfiniteViewer from 'react-infinite-viewer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container> {/* ✅ Use Container instead of plain <div> */}
      <InfiniteViewer
        
      >
        <p
          style={{
            textAlign: 'center',
            marginTop: '40px',
            fontSize: '24px',
            color: 'black',
          }}
        >
          Hello
        </p>
      </InfiniteViewer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  background-color: white;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
`;

export default App
