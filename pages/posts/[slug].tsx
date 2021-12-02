import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Ingredients from '../../components/Ingredients';
import Instructions from '../../components/Instructions';
import Layout from '../../components/Layout';
import Thumbnail from '../../components/Thumbnail';
import { useMdxComponentsContext } from '../../context/MdxComponents';
import { IPost } from '../../types/post';
import { SITE_URL } from '../../utils/constants';
import { getAllPosts, getPost } from '../../utils/mdxUtils';

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IPost, 'slug'>;
};

const components = {
  Ingredients,
  Instructions,
  Tips: dynamic(() => import('../../components/Tips'))
};

export function useQuery() {
  const router = useRouter();

  const hasQueryParams = /\[.+\]/.test(router.route) || /\?./.test(router.asPath);
  const ready = !hasQueryParams || Object.keys(router.query).length > 0;

  if (!ready) return null;

  return router.query;
}

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpacity, setOpacity] = useState(false);
  const router = useRouter();
  const lang = router.locale;

  const ogImage = SITE_URL + frontMatter.thumbnail;

  const { setLang, setIngredients, setInstructions, setTips } = useMdxComponentsContext();

  const query = useQuery();

  useEffect(() => {
    if (!query) {
      return;
    }
    // fetch the dynamic page routeId
    console.log('my query exists!!', query.slug);
  }, [query]);

  useEffect(() => {
    setLang(lang);
    setIngredients(frontMatter.ingredients);
    setInstructions(frontMatter.instructions);
    setTips(frontMatter.tips);
  }, [
    frontMatter.instructions,
    frontMatter.ingredients,
    frontMatter.tips,
    lang,
    setInstructions,
    setIngredients,
    setLang,
    setTips
  ]);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const toggleOpacity = () => {
      if (window.pageYOffset > 50) {
        setOpacity(true);
      } else {
        setOpacity(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("scroll", toggleOpacity);

    return () => {
      window.removeEventListener("scroll", toggleVisibility),
        window.removeEventListener("scroll", toggleOpacity)
    };
  }, [])



  return (
    <>
      <Layout pageTitle={frontMatter.title}>
        <Head>
          <meta name="description" content={frontMatter.description} key="description" />
          <meta property="og:description" content={frontMatter.description} key="ogDescription" />
          <meta property="og:image" content={ogImage} key="ogImage" />
        </Head>

        <Link passHref
          href={{
            pathname: "/"
          }}
        >
          <nav
            id="my-breacrumb"
            className={`
            ${isOpacity ? 'bg-opacity-20' : 'bg-opacity-0'}
          mb-4 sticky top-1
    block
    text-sm text-left text-green-600
    bg-green-500 
    h-12
    flex
    items-center
    p-4
    rounded-md
  `}
            role="alert"
          >
            <ol className="list-reset flex text-grey-dark">
              <li><a href="#" className="font-bold">Home</a></li>
              <li><span className="mx-2">/</span></li>
              <li><a href="#" className="font-bold">{query.slug}</a></li>
            </ol>
          </nav>
        </Link>

        <article className="prose prose-green dark:prose-dark">
          <div className="mb-4">
            <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
          </div>

          <h1>{frontMatter.title}</h1>

          <p className="font-bold">
            {lang === 'fr' ? 'les yieldés' : 'Yields: '}
            {frontMatter.yields}
          </p>

          <p>{frontMatter.description}</p>

          <MDXRemote {...source} components={components} />

        </article>

      </Layout>

      <div className="fixed bg-green-500 bottom-3 right-3  cursor-pointer">
        {isVisible && (
          <div
            onClick={scrollToTop}
            className="fixed p-2 rounded-lg bg-green-500 bottom-3 right-3 lg:bottom-5 lg:right-5 cursor-pointer"
          >
            <h3>Go up!</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { content, data } = getPost(params?.slug as string, locale);

  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data
    }
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = getAllPosts(['slug']);

  const paths = locales!.flatMap(locale =>
    posts.map(post => ({
      params: {
        slug: post.slug
      },
      locale
    }))
  );

  return {
    paths,
    fallback: false
  };
};
