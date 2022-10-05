import Layout from "../components/Layout";
import { useFetchUser } from "../lib/authContext";

const Contact = () => {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user}>
      <>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-yighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
            Contact Us
          </span>
        </h1>
      </>
    </Layout>
  );
};

export default Contact;
