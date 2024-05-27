import Link from "next/link"

const NotFound = () => {
  return (
    <>
      <section className=''>
        <div className=''>
          <div className='row'>
            <div className=''>
              <div className='error__content'>
                <h1 className='text-[7rem] font-bold'>404</h1>
                <h1>Hmm. Resource is not found!</h1>
                <p>
                  {
                    "The page you are looking for doesn't exist or has been moved."
                  }
                </p>
                <Link
                  className='border px-5 uppercase font-semibold py-2'
                  href='/'>
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound
