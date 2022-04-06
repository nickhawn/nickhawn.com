import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <meta charSet="utf-8" />
        <title>Nicholas Hawn | Software Developer Based In Grand Rapids</title>
        <meta name="description" content="Hi, I am Nick Hawn a Software Developer based in Grand Rapids Michigan."></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
        Hi, I am{' '}
          <span className="text-yellow-600">
          Nick Hawn{' '}
          </span>
          a Software Developer <br/> 
          Based in Grand Rapids Michigan. 
        </h1>

        <p className="mt-8 text-2xl">
        <a
          className="underline text-yellow-600 hover:text-yellow-700 mr-3"
          href="mailto:nick@nickhawn.com">
          Email
        </a>
        {' '}
        <a
          className="underline text-yellow-600 hover:text-yellow-700 mr-3"
          href="https://www.linkedin.com/in/nickhawn/">
          LinkedIn
        </a>
        </p>
      </main>
    </div>
  )
}
