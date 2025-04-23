import React from 'react';
import Link from 'next/link'; // or use <a> if not using Next.js

interface LinkifyTextProps {
  text: string;
}

const LinkifyText: React.FC<LinkifyTextProps> = ({ text }) => {
  const linkified = text.split(/(\s+)/).map((part, i) => {
    // Match @mention
    if (/^@\w+/.test(part)) {
      const username = part.slice(1);
      return (
        <Link key={i} href={`/${username}`}>
          <span className="text-blue-500 hover:underline">{part}</span>
        </Link>
      );
    }

    // Match #tag
    if (/^#\w+/.test(part)) {
      const tag = part.slice(1);
      return (
        <Link key={i} href={`/tags/${tag}`}>
          <span className="text-blue-500 ">{part}</span>
        </Link>
      );
    }

    return part;
  });

  return <p>{linkified}</p>;
};

export default LinkifyText;
