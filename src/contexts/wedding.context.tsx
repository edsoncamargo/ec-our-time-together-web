import { createContext } from 'react';

interface WeddingContextType {
  isWeddingActive: boolean;
  setIsWeddingActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WeddingContext = createContext<WeddingContextType>({
  isWeddingActive: false,
  setIsWeddingActive: () => {},
});
