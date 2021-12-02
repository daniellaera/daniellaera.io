import { SITE_NAME } from '../utils/constants';
import LangMenu from './LangMenu';
import NextLink from './NextLink';
import ThemeSwitch from './ThemeSwitch';

const Header: React.FC = () => {
  return (
    <header className="py-2">
      <div className="flex justify-between items-center">
        <NextLink href="/" className="text-2xl font-bold text-green-500">
          {SITE_NAME}
        </NextLink>

        {/* <div className="hidden sm:block w-1/3">
          <Search />
        </div> */}

        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <LangMenu />
        </div>
      </div>

      {/* <div className="block sm:hidden mt-2">
        <Search />
      </div> */}
    </header>
  );
};

export default Header;
