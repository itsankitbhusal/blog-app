import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const PostRichText = ({ setContent, content }) => {
  // const [value, setValue] = useState(content || "");
  // console.log(value);
  // console.log("content ===", content);
  return (
    <MDEditor
      value={content}
      onChange={(val) => {
        // setValue(val);
        setContent(val);
      }}
    />
  );
};

export default PostRichText;
