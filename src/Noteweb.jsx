import React, { useState } from "react";
// import Image from "./Image";
import "./Noteweb.css";

const Noteweb = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [FullNotes, setFullNotes] = useState([]);
  const [Isedit, setIsedit] = useState(null);

  // const [selectedImage, setSelectedImage] = useState([]);

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    const selectedFileArray = Array.from(selectedFiles);

    const imageArray = selectedFileArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setTitle(imageArray);
  };

  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    if (note && Isedit) {
      setFullNotes(
        FullNotes.map((elem) => {
          if (elem.id === Isedit) {
            return { ...elem, title, note };
          }
          return elem;
        })
      );
      setTitle(" ");
      setNote("");
      setIsedit(null);
    } else {
      const data = { id: new Date().getTime().toString(), title, note };
      setFullNotes([...FullNotes, data]);
      setTitle("");
      setNote("");
    }
  };

  const deleteBook = (index) => {
    const dltItem = FullNotes.filter((book) => {
      return index !== book.id;
    });
    setFullNotes(dltItem);
  };

  const editbtn = (id) => {
    let newEditItem = FullNotes.find((elem) => {
      return id === elem.id;
    });
    setTitle(newEditItem.title);
    setNote(newEditItem.note);
    setIsedit(id);
  };

  return (
    <div className="wrapper">
      <h1>Your Privacy In Your Hand</h1>
      <div className="main">
        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleAddBookSubmit}
          >
            {/* <input
              type="file"
              className="form-control form-cntrl1"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
  ></input>*/}
            <input
              type="file"
              name="images"
              className="images"
              onChange={onSelectFile}
            />
            <br></br>

            <textarea
              type="text"
              className="form-control form-cntrl"
              placeholder="Your Name"
              required
              onChange={(e) => setNote(e.target.value)}
              value={note}
            ></textarea>
            <br></br>
            <button type="submit" className="btn-submit">
              Post Blog
            </button>
          </form>
        </div>
      </div>

      <div className="view-container">
        <h3>Your Blogs</h3>
        {FullNotes.length > 0 && (
          <>
            <div className="container">
              {FullNotes.map((book) => {
                return (
                  <div className="items" key={book.id}>
                  <img
                  src={book.title}
                  alt="AVATAR"
                  style={{ height: "280px",width:"250px"}}
                />
                    <h2>{book.note}</h2>
                    <div className="btnn">
                      <p
                        className="delete-btn"
                        onClick={() => deleteBook(book.id)}
                      >
                        Delete
                      </p>
                      <p className="edit" onClick={() => editbtn(book.id)}>
                        Edit
                      </p>
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </>
        )}
        {FullNotes.length < 1 && (
          <div>
            <p>Nothing to show!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Noteweb;
