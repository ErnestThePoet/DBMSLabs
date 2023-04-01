import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  router.replace("/flights");

  return (
    <>
      <Head>
        <title>HIT民航信息监控系统</title>
      </Head>
      
      You are being redirected to the /flights page.
    </>
  );
}
