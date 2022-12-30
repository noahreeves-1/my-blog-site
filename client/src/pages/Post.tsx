import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../util/axios";

const Post = () => {
  const params = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState(Object);
  const [comments, setComments] = useState(Object);

  useEffect(() => {
    api
      .get(`/posts/${params.id}`)
      .then((res) => {
        console.log(res);

        setTitle(res.data.post.title);
        setContent(res.data.post.content);
        setDate(res.data.post.date_created);
        setAuthor(res.data.post.author);
        setComments(res.data.comments);
      })
      .catch((err) => console.error(err));
  }, [params.id]);

  interface CommentType {
    author: object;
    blogpost: string;
    commentBody: string;
    date_created: string;
  }

  const submitHandler = () => {
    const body = {
      title: "",
      commentBody: "",
    };

    api
      .post("/posts/:id", body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <section>
      <h1>{title}</h1>
      <br />
      <p>
        {author.first_name} {author.last_name}
        <span> / {date}</span>
      </p>
      <br />
      <div id="contentContainer">{content}</div>
      <div id="commentsWrapper">
        <h3>Comments Section</h3>
        <form onSubmit={submitHandler}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="Title"
          />
          <label htmlFor="commentBody">Comment</label>
          <textarea
            name="commentBody"
            id="commentBody"
            required
            cols={30}
            rows={10}
          ></textarea>
          <button>Submit Comment</button>
        </form>
        {comments.map((comment: CommentType) => {
          return <div id="commentsContainer">{comment.commentBody}</div>;
        })}
      </div>
    </section>
  );
};

export default Post;
