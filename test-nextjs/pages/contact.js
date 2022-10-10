import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import { useFetchUser } from "../lib/authContext";
import markdownToHtml from "../lib/markdownToHtml";

const Contact = ({ contacts, contact }) => {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user}>
      <>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-yighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
            {contacts[0].attributes.title}
          </span>
        </h1>
        <div
          className="tracking-wid font-normal text-sm"
          dangerouslySetInnerHTML={{ __html: contact }}
        ></div>
      </>
    </Layout>
  );
};

export default Contact;

export async function getServerSideProps() {
  const contactResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts`
  );

  const contact = await markdownToHtml(contactResponse.data[0].attributes.contact);

  return {
    props: {
      contacts: contactResponse.data,
      contact,
    },
  };
}
