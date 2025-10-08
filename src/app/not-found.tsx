import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <main className="h-screen bg-black text-white">
      <section className="text-center">
        <h1 className="text-[30rem]">404</h1>
        <p className="mb-10 text-2xl">This page could not be found</p>
        <Link className="rounded-full bg-white px-[14px] py-2 font-bold text-black transition-colors" href="/">
          Back home
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
