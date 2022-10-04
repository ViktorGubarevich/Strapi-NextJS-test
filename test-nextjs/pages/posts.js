import Layout from "../components/Layout";
import Posts from "../components/Posts";
import { fetcher } from "../lib/api";
import { useFetchUser } from "../lib/authContext";

const PostsList = ({ posts }) => {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user}>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-yighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          Posts
        </span>
      </h1>
      <Posts posts={posts} />
    </Layout>
  );
};

export default PostsList;

export async function getStaticProps() {
  const postsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/posts`
  );

  return {
    props: {
      posts: postsResponse,
    },
  };
}
