import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center darkblue_gradient">
        Find the proper Prompt
        <br className="max-md:hidden" />
        <span className=" text-center blue_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Dive into a world of AI-powered prompts, a powerful tool designed to
        ignite creativity, enhance effective communication, and significantly
        boost learning outcomes in an interactive and engaging way.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
