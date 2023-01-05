import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../util/axios";

function Home(): JSX.Element {
  const [data, setData] = useState([] as any[]);

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        setData(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div id="title" className="text-center text-2xl mt-4 font-bold">
        Welcome to my blog!
      </div>
      {data?.map((post) => (
        <Link to={`/posts/${post._id}`} key={post._id}>
          <div className="max-w-xl mx-auto bg-gray-200 my-4 rounded-md py-4 px-4 text-left">
            <div className="text-xl font-bold">{post.title}</div>
            <div className="mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {post.content}
            </div>
            <p className="text-sm mt-4 font-bold">
              {post.author.first_name} {post.author.last_name}
              <span className="font-normal"> / {post.date_created}</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;
