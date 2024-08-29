"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const page = () => {
  const [path, setPath] = useState(null);

  useEffect(() => {
    const url = new URL(window.location);
    setPath(url.pathname); // Отримання частини шляху до сторінки
  }, []);

  return (
    <div>{path}</div>
  )
}

export default page
