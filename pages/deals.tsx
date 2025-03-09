import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DealsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/category/deals');
  }, [router]);

  return null;
} 