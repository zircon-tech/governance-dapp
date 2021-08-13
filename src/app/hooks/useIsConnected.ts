import { useWalletContext } from 'react-wallet';

export function useIsConnected() {
  const { address, connected } = useWalletContext();
  return connected && !!address;
}
