import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import { useFetchUser } from "../lib/authContext";

const About = ({ abouts }) => {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user}>
      <>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-yighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
            {abouts[0].attributes.title}
          </span>
        </h1>
        <h2>{abouts[0].attributes.about}</h2>
      </>
    </Layout>
  );
};

export default About;

export async function getServerSideProps() {
  const aboutsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/abouts`
  );

  return {
    props: {
      abouts: aboutsResponse.data,
    },
  };
}
