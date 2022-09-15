import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const { connectWallet, account, accountFound, switchAccount, error } =
    useAuth()

  useEffect(() => {
    if (error) {
      toast.error('Make Sure You Have A Wallet!')
    }
  }, [error])

  return (
    <nav className='mt-16'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <div>
              <Link href={'/'}>
                <a className='flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 mr-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>

                  <span className='font-bold hover:text-red-400'>
                    Web3 Ecommerce
                  </span>
                </a>
              </Link>
            </div>
          </div>

          <div>
            <Link href={'/'}>
              <a className='underline hover:text-red-400 font-medium mr-16'>
                Market
              </a>
            </Link>

            {!account && accountFound ? (
              <button
                onClick={() => connectWallet()}
                className='bg-red-400 text-white px-32 text-md duration-300 transition-all py-5 border-4 rounded-lg hover:bg-transparent hover:text-gray-700 border-red-400'
              >
                Connect
              </button>
            ) : (
              <span
                onClick={() => switchAccount()}
                className='font-bold underline hover:text-red-400 cursor-pointer'
              >
                {account}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
