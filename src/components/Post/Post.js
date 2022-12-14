import React from "react";
import "./Post.css";

import {Link} from "react-router-dom";
import moment from "moment";
import {useContextAPI} from "../../context/Context";

function Post({post, id}) {
  const imageFolder = "https://mern-blog-api.onrender.com/images/";

  return (
    <div className="single-post">
      <img src={imageFolder + post.blogImage} alt="post-img" className="post-img" />
      <div className="post-info">
        <h6 style={{fontWeight: "bold"}}>{post.title}</h6>
        <p style={{lineHeight: "1.3rem", fontSize: "0.9rem", marginBottom: "0"}}>
          {post?.blogBody.length > 300
            ? ` ${post?.blogBody.slice(0, 300)}....`
            : post.blogBody}
        </p>
        <div className="d-flex justify-content-between">
          <p style={{marginBottom: "0"}}>
            <small>{moment(post?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</small>
          </p>
          <div>
            <Link to={`/edit/${id}`}>
              <button
                className="btn-sm btn btn-success mr-2"
                style={{fontSize: "0.7rem"}}
                id={id}
              >
                Edit
              </button>
            </Link>

            <Link to={`/blog/${id}`}>
              <button
                className="btn-sm btn btn-secondary"
                style={{fontSize: "0.7rem"}}
                id={id}
              >
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
