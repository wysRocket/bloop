import { createContext } from 'react';
import { UITabType } from '../types/general';

type ContextType = {
  tabs: UITabType[];
  activeTab: string;
  handleAddTab: (repoRef: string, repoName: string) => void;
  handleRemoveTab: (t: string) => void;
  setActiveTab: (t: string) => void;
};

export const TabsContext = createContext<ContextType>({
  tabs: [{ key: 'initial', name: 'Home' }],
  activeTab: 'initial',
  handleAddTab: () => {},
  handleRemoveTab: () => {},
  setActiveTab: () => {},
});
