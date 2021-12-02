import { createContext, Dispatch, ReactElement, ReactNode, SetStateAction, useContext, useState } from 'react';

type ContextProps = {
  lang: string | undefined;
  setLang: Dispatch<SetStateAction<string | undefined>>;
  ingredients: string[];
  setIngredients: Dispatch<SetStateAction<string[]>>;
  instructions: string[];
  setInstructions: Dispatch<SetStateAction<string[]>>;
  tips: string[];
  setTips: Dispatch<SetStateAction<string[]>>;
};

type Props = {
  children: ReactNode;
};

const MdxComponentsContext = createContext({} as ContextProps);

export function MdxComponentsProvider({ children }: Props): ReactElement {
  const [lang, setLang] = useState<string | undefined>(undefined);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [tips, setTips] = useState<string[]>([]);

  return (
    <MdxComponentsContext.Provider
      value={{
        lang,
        setLang,
        ingredients,
        setIngredients,
        instructions,
        setInstructions,
        tips,
        setTips
      }}>
      {children}
    </MdxComponentsContext.Provider>
  );
}

export function useMdxComponentsContext(): ContextProps {
  return useContext(MdxComponentsContext);
}
