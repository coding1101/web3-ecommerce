import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useAuth = () => {
  const [account, setAccount] = useState<string>()
  const [accountFound, setAccountFound] = useState<boolean>()

  const [error, setError] = useState<boolean>()

  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ethereum = typeof window !== 'undefined' && (window as any).ethereum

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      setAccount(accounts[0])
    } catch (error) {
      console.error(error)
    }
  }

  const switchAccount = async () => {
    try {
      if (!ethereum) {
        return
      }

      await ethereum.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      })

      router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        if (!ethereum) {
          setError(true)

          return
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' })

        if (accounts.length !== 0) {
          const account = accounts[0]

          setAccount(account)
          setAccountFound(true)
        } else {
          setAccountFound(true)
        }
      } catch (error) {
        console.error(error)
      }
    }

    checkIfWalletIsConnected()
  }, [ethereum])

  return { account, accountFound, connectWallet, switchAccount, error }
}

export default useAuth
