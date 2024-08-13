import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center custom-height background">
      <Head>
        <meta charSet="utf-8" />
        <title>Nick Hawn | Software Developer Based In Grand Rapids</title>
        <meta
          name="description"
          content="Hi, I am Nick Hawn a Software Developer based in Grand Rapids Michigan."
        ></meta>
        <link rel="icon" href="/logo.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-3xl font-bold">
          Hi, I am <span className="primary-color">Nick Hawn</span>, a Software
          Developer <br />
          Based in Grand Rapids, Michigan.
        </h1>
        <p className="mt-3 text-md">
          <a
          href="https://spin.atomicobject.com/author/nick-hawn/"
          className="flex justify-center text-sm gradient"
        >
          Latest Blog Posts
        </a>
        </p>
      </main>
    </div>
  );
}
