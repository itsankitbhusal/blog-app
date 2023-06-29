import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const BlogBodyPreview = ({ data }) => {
  const [htmlString, setHtmlString] = useState("");
  const newData = data?.replace(/[#*_`]/g, "");
  const newContent = newData?.slice(0, 30) + "...";
  useEffect(() => {
    setHtmlString(newContent);
    //   filter the markdown syntax from the string
  }, [data]);

  return (
    <div>
      {/* <div dangerouslySetInnerHTML={{ __html: htmlString }} /> */}
      <ReactMarkdown>{htmlString}</ReactMarkdown>
    </div>
  );
};

export default BlogBodyPreview;
