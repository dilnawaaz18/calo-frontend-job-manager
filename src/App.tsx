import React from 'react';
import JobList from './components/JobList'
import { Alert, Container, Snackbar, Typography } from '@mui/material';
import JobForm from './components/JobForm';



function App() {
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine)

  const handleJobCreated = () => {
    window.location.reload();
  }

  React.useEffect(() => {

    // variables to check if the server is offline or not
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // events to check if the server is offline or not
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };

  }, [])
  return (
    <Container className='min-h-screen bg-gray-100 p-4'>
      <Typography variant="h3" align='center' >
        Job Managment
      </Typography>
      <JobForm onJobCreate={handleJobCreated} />
      <JobList />
      <Snackbar open={isOffline} autoHideDuration={3000}>
        <Alert severity='warning'>You are currently offline.</Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
