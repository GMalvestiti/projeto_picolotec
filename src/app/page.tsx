"use client"

import Link from 'next/link';

import Button from '@mui/material/Button';

async function fetchData() {
  const res = await fetch("api/car");
  const data = await res.json();
  console.log(data);
}

export default function Home() {
  return (
    <Button variant="contained" href='/dashboard' LinkComponent={Link} onClick={fetchData}>
      Hello world
    </Button>
  );
}
