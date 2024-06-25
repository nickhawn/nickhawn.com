import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen background">
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
          Software Developer & Consultant at{" "}
          <a href="https://www.atomicobject.com/" className="underline">
            Atomic Object
          </a>
        </p>
      </main>
      <div className="flex flex-row items-center justify-center mt-4">
        <a
          href="https://spin.atomicobject.com/author/nick-hawn/"
          className="flex justify-center text-sm gradient"
        >
          Latest Blog Post
        </a>
        <div className="h-4 w-0.5 mx-2 background-primary-color"></div>
        <a
          href="https://www.linkedin.com/in/nickhawn/"
          className="flex justify-center text-sm gradient"
        >
          Linkedin
        </a>
      </div>
    </div>
  );
}
