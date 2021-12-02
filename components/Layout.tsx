import Header from './Header';
import Meta from './Meta';

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
};

const Layout: React.FC<Props> = ({ children, pageTitle }: Props) => {
  return (
    <>
      <Meta pageTitle={pageTitle} />

      <div className="max-w-prose mx-auto px-4">
        <Header />
        {/* <Container /> */}
        <main className="pt-4 pb-12">{children}</main>
      </div>
    </>
  );
};

export default Layout;
