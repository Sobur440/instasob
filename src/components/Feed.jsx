import Posts from "./Posts";
import Profile from "./Profile";

function Feed() {
  return (
    <main className="w-full md:w-[80%] flex flex-col md:flex-row mx-auto">
      {/* Posts */}
      <section className="md:flex-[2]">
        <Posts />
      </section>
      {/* Mini profile */}
      <section className="hidden md:inline-flex md:flex-[1]">
        <Profile />
      </section>
    </main>
  );
}

export default Feed;
