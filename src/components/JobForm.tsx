import React, { useState } from 'react';
import { Button, CircularProgress, Container, Typography } from '@mui/material';
import { createJob } from '../services/jobServices';


function JobForm(props: any) {
  const [creating, setCreating] = useState(false)

  const handleCreateNewJob = async () => {
    setCreating(true);
    try {
      await createJob();
      if (props.onJobCreate) props.onJobCreate();
    }
    catch (error) {
      console.log('Error creatin the job', error)
    }
  }
  return (
    <Container className='p-4'>
      <Button
        variant="contained"
        color="primary"
        disabled={creating}
        onClick={handleCreateNewJob}
        startIcon={creating ? <CircularProgress size={20} /> : null}
      >
        {creating ? '' : 'Create new Job'}
      </Button>
    </Container>
  );
}

export default JobForm;
