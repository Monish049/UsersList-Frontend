

// import React from 'react';
// import { Container, Grid } from '@mui/material';
// import UserList from './Components/UserList';


// function App() {
//   return (
//     <Container>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <UserList />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// export default App;


import React from 'react';
import { Container, Grid } from '@mui/material';
import UserList from './Components/UserList';

function App() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <UserList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;

