import Head from "next/head";
import { UserProvider } from "../lib/authContext";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ user, loading = false, children }) => (
  <UserProvider value={{ user, loading }}>
    <Head>
      <title>Post Database</title>
    </Head>

    <Nav />

    <main className="grow px-4 pt-20">
      <div className="flex justify-center bg-white mx-auto w-2/4 rounded-lg my-16 p-16">
        <div className="text-2xl font-medium">{children}</div>
      </div>      
    </main>

    <Footer />
    
  </UserProvider>
);

export default Layout;
