import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-4 bg-white md:flex md:items-center md:justify-between text-lg text-gray-700">
      <span className="text-lg text-gray-700 sm:text-center dark:text-gray-400">
        © 2022 Strapi and Next JS.
      </span>
      <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0 space-x-2">
        <li>
          <Link href="/about">
            <a className="md:p-2 py-2 block hover:text-red-400">About Us</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a className="md:p-2 py-2 block hover:text-red-400" href="#">
              Contact Us
            </a>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
