import { useMdxComponentsContext } from '../context/MdxComponents';

const Instructions: React.FC = () => {
  const { lang, instructions } = useMdxComponentsContext();

  return (
    <>
      <h2>{lang === 'fr' ? 'les instructions' : 'Instructions'}</h2>
      <ol>
        {instructions.map((direction, index) => (
          <li key={index}>{direction}</li>
        ))}
      </ol>
    </>
  );
};

export default Instructions;
