import React, { useEffect, useState } from "react";
import { marked } from "marked";

const BlogBodyPreview = ({ data }) => {
  const [htmlString, setHtmlString] = useState("");
  const newData = data.replace(/[#*_`]/g, "");
  const newContent = newData.slice(0, 30) + "...";
  const parseMarkdown = (markdownContent) => {
    return marked(markdownContent, { sanitize: true });
  };
  useEffect(() => {
    setHtmlString(parseMarkdown(newContent));
    //   filter the markdown syntax from the string
  }, [data]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
};

export default BlogBodyPreview;
