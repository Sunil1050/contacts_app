import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import FileBase from 'react-file-base64';

const AddContact = () => {
  const classes = {
    fileInput: {
      width: '97%',
      margin: '10px 0',
    }
  }

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { addContactHandler } = useContactsCrud();
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    addContactHandler({ name, email, imageUrl });
    setEmail("");
    setName("");
    navigate("/");
  };
  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ margin: '10px 0' }}><FileBase type="file" multiple={false} onDone={({ base64 }) => setImageUrl(base64)} /></div>
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
}

export default AddContact;
