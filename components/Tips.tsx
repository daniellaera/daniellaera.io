import { useMdxComponentsContext } from '../context/MdxComponents';

const Tips: React.FC = () => {
  const { lang, tips } = useMdxComponentsContext();

  return (
    <>
      <h2>{lang === 'fr' ? 'trucs' : 'Tips'}</h2>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </>
  );
};

export default Tips;
