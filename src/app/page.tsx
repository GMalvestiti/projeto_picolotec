import Link from 'next/link';

import Button from '@mui/material/Button';

export default function Home() {
  return (
    <Button variant="contained" href="/dashboard" LinkComponent={Link}>
      Hello world
    </Button>
  );
}
