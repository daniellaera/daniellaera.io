import cn from 'classnames';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import Thumbnail from '../components/Thumbnail';
import usePagination from '../hooks/usePagination';
import { IPost } from '../types/post';
import { SITE_NAME } from '../utils/constants';
import { getAllPosts } from '../utils/mdxUtils';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive ? 'font-semibold text-gray-800 dark:text-gray-200' : 'font-normal text-gray-600 dark:text-gray-400',
          'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
        )}>
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

type Props = {
  posts: IPost[];
};

const Home: React.FC<Props> = ({ posts }: Props) => {
  const router = useRouter();
  const lang = router.locale;

  const { currentPage, currentData, maxPage, setElement } = usePagination(posts, 2, 1.0);

  const currentPosts = currentData();

  return (
    <Layout>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>

      {/* <Container /> */}

      <main>
        <h1 className="text-4xl font-bold mb-4">{lang === 'fr' ? 'Recettes' : 'Recipes'}</h1>

        <div className="space-y-12">
          {currentPosts.map(post => (
            <div key={post.slug}>
              <div className="mb-4">
                <Thumbnail slug={post.slug} title={post.title} src={post.thumbnail} />
              </div>

              <h2 className="text-2xl font-bold mb-4">
                <NextLink href={`/posts/${post.slug}`}>{post.title}</NextLink>
              </h2>

              <p className="dark:text-gray-300">{post.description}</p>
            </div>
          ))}
        </div>

        <Pagination currentPage={currentPage} maxPage={maxPage} setElement={setElement} />
      </main>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['slug', 'date', 'thumbnail', 'title', 'description']);

  return { props: { posts } };
};
