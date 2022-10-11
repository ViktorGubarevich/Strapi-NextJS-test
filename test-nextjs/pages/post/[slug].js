import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { useFetchUser } from "../../lib/authContext";
import markdownToHtml from "../../lib/markdownToHtml";
import Link from "next/link";

const Post = ({ post, jwt, info, error }) => {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  const [review, setReview] = useState({
    value: "",
  });

  const handleChange = (e) => {
    setReview({ value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            review: review.value,
            reviewer: user,
            Post: post.id,
          },
        }),
      });
      router.reload("/");
    } catch (error) {
      console.error("error with request", error);
    }
  };

  if (error) {
    return (
      <Layout>
        <p>Page not found</p>
      </Layout>
    );
  } else {
    return (
      <Layout user={user}>
        {!user && (
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              Please, go to authorization or{" "}
              <Link href="/register">
                <a className="block py-2 hover:text-red-400 text-black">
                  registration!
                </a>
              </Link>
            </span>
          </h1>
        )}
        {user && (
          <>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                {post.attributes.title}
              </span>
            </h1>
            <p>
              Publication by{" "}
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                {post.attributes.edition}
              </span>
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                Information
              </span>
            </h2>
            <div
              className="tracking-wid font-normal text-sm"
              dangerouslySetInnerHTML={{ __html: info }}
            ></div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                Reviews
              </span>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="w-full text-sm px-3 py-2 text-gray-700 border-2 border-teal-400 rounded-lg focus:outline-none"
                  rows="4"
                  value={review.value}
                  onChange={handleChange}
                  placeholder="Add your review"
                ></textarea>
                <button
                  className="md:p-2 rounded text-black bg-red-200 p-2 mt-2"
                  type="submit"
                >
                  Add Review
                </button>
              </form>
            </h2>
            <ul>
              {post.attributes.reviews.data.length === 0 && (
                <span>No reviews yet</span>
              )}
              {post.attributes.reviews.data &&
                post.attributes.reviews.data.map((review) => {
                  return (
                    <li key={review.id}>
                      <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                        {review.attributes.reviewer}
                      </span>{" "}
                      said &quot;{review.attributes.review}&quot;
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      </Layout>
    );
  }
};

export async function getServerSideProps({ req, params }) {
  const { slug } = params;
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);

  const postResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/post/${slug}?populate=*`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );

  if (postResponse.data) {
    const info = await markdownToHtml(postResponse.data.attributes.info);

    return {
      props: {
        post: postResponse.data,
        info,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: postResponse.error.message,
      },
    };
  }
}

export default Post;
