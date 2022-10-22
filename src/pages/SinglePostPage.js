import React, {useEffect, useState} from "react";
import Header from "../components/Header/Header";
import moment from "moment";
import {useNavigate, useParams} from "react-router-dom";
import Footer from "../components/Footer/Footer";
import {useContextAPI} from "../context/Context";
import {app} from "../utils/axiosConfig";

function SinglePostPage() {
  const {id} = useParams();

  const {user} = useContextAPI();

  const [singlePost, setSinglePost] = useState();

  const imageFolder = "http://localhost:4000/images/";

  async function getSinglePost() {
    const post = await app
      .get(`/api/blogs/${id}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .catch((err) => console.log(err));

    setSinglePost(post.data);
  }

  const navigate = useNavigate();
  async function handleDelete(id) {
    await app
      .delete(`/api/blogs/${id}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .catch((err) => console.log(err));

    navigate(0);
  }

  useEffect(() => {
    getSinglePost();
  }, []);

  return (
    <div>
      <Header />

      <section className="single-post-page">
        <img src={imageFolder + singlePost?.blogImage} alt="post-image" />
        <h2 className="mt-4 text-center">{singlePost?.title}</h2>
        <p>{`${singlePost?.blogBody}`}</p>
        <small>{moment(singlePost?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</small>
        <button
          className="btn-sm btn btn-danger mr-2"
          style={{fontSize: "0.7rem"}}
          id={id}
          onClick={(e) => handleDelete(e.target.id)}
        >
          Delete
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default SinglePostPage;
