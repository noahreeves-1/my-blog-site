import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../util/axios";
import { useAuthContext } from "../hooks/useAuth";

const Post = () => {
  const params = useParams();
  const { auth } = useAuthContext();

  interface AuthorType {
    admin: boolean;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    refresh_token: string;
    roles: string[];
    username: string;
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState<AuthorType | null>(null);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");

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
  }, [params.id, comments.length]);

  interface CommentType {
    _id: string;
    author: object;
    blogpost: string;
    commentBody: string;
    date_created: string;
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(auth);

    const body = {
      commentBody,
    };

    api
      .post(`/posts/${params.id}`, body, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setCommentBody("");
        setComments(res.data.comments);
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="max-w-xl mx-auto">
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <br />
      <p>
        {author?.first_name} {author?.last_name}
        <span> / {date}</span>
      </p>
      <br />
      <div id="contentContainer" className="bg-gray-100 p-8 rounded-md">
        {content}
      </div>
      <div id="commentsWrapper">
        <h3 className="font-bold mt-4 text-left">Comments</h3>
        <div className="bg-gray-200 p-4 mt-4">
          <form onSubmit={submitHandler}>
            <div className="flex flex-col">
              <label htmlFor="commentBody text-left">Add a Comment</label>
              <textarea
                name="commentBody"
                id="commentBody"
                required
                cols={30}
                rows={5}
                className="rounded-md mt-2"
                onChange={(e) => setCommentBody(e.target.value)}
              ></textarea>
            </div>
            <button className="mt-4 py-2 px-4 text-white bg-cyan-800 rounded-md">
              Submit Comment
            </button>
          </form>
        </div>

        {comments.map((comment: CommentType) => {
          return (
            <div id="commentsContainer" key={comment._id}>
              {comment.commentBody}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Post;

// *   div(class="max-w-xl mx-auto")#blogContainer
//  *   h1(class="my-4 text-2xl font-bold")= post.title
//     p= post.content
//     if user
// *      div(class="bg-gray-200 p-4 mt-4")
// *         form(method="POST" action="" class="flex flex-wrap justify-end")
//            #commentContainer
//  *           label(for="comment" class="font-bold") Comments
//   *          textarea#comment(name="comment", cols="62", rows="4", class="rounded-md mt-2", required="true")
//  *         button(type="submit" class=" mt-4 py-2 px-4 text-white bg-cyan-800 rounded-md") Submit Comment
//     else
//       a(href="/users/login")
//         p(class="my-4 text-center text-blue-500") Log in to comment on this post!
//     div(class="font-bold") Comments
//     div(class="mb-10")#allComments
//       for comment in comments
//         div(class="bg-gray-200 max-w-xl mx-auto mt-4 p-4")
//           p= comment.commentBody
//           p(class="text-sm font-bold mt-2")= comment.author.name
//             span(class="font-normal")  / #{comment.date_clean}
