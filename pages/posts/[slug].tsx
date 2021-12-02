import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {
  const router = useRouter();
  const lang = router.locale;

  const ogImage = SITE_URL + frontMatter.thumbnail;

  const { setLang, setIngredients, setInstructions, setTips } = useMdxComponentsContext();

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

  return (
    <Layout pageTitle={frontMatter.title}>
      <Head>
        <meta name="description" content={frontMatter.description} key="description" />
        <meta property="og:description" content={frontMatter.description} key="ogDescription" />
        <meta property="og:image" content={ogImage} key="ogImage" />
      </Head>

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
