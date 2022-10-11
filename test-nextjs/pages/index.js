import Link from "next/link";
import Layout from "../components/Layout";
import { useFetchUser } from "../lib/authContext";

const Home = () => {
  const { user, loading } = useFetchUser();

  return (
    <>
      <Layout user={user}>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
          Strapi{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Post Reviews
          </span>
        </h1>
        <p className="flex justify-center py-4">
          This is a sample site about various publications in the field of IT!
        </p>
      </Layout>
    </>
  );
};

export default Home;
