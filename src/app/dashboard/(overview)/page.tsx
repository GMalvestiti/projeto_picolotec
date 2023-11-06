import Link from 'next/link';

import Button from '@mui/material/Button';

export default function Page() {
  return (
    <Button variant="contained" href="/" LinkComponent={Link}>
      Homepage
    </Button>
  );
}
