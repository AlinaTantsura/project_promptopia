"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, searchWord }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  
  const [copied, setCopied] = useState("");

  const searchHighlight = (str) => {
    // if (!searchWord) return str;
    if (!searchWord || !str.toLowerCase().includes(searchWord)) {
      return str.split('-');
    }
    else if (searchWord && str.toLowerCase().includes(searchWord)) {
      const newStr = str.replace(searchWord, `-${searchWord}-`).split('-')
      return newStr;
    }
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="User image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {/* {post.creator.username} */}
              {searchHighlight(post.creator.username).map(item => (
                <span className={item === searchWord ? "bg-gray-300 rounded-md" : ""} key={crypto.randomUUID()}>{item}</span>
              ))}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {/* {post.creator.email} */}
              {searchHighlight(post.creator.email).map(item => (
                <span className={item === searchWord ? "bg-gray-300 rounded-md" : ""} key={crypto.randomUUID()}>{item}</span>
              ))}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt
                ? "Tick icon"
                : "Copy icon"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {searchHighlight(post.prompt).map(item => (
                <span className={item === searchWord ? "bg-gray-300 rounded-md" : ""} key={crypto.randomUUID()}>{item}</span>
              ))}
      </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
      onClick={()=> handleTagClick && handleTagClick(post.tag)}>
        #{searchHighlight(post.tag).map(item => (
                <span className={item === searchWord ? "bg-gray-300 rounded-md text-white" : ""} key={crypto.randomUUID()}>{item}</span>
              ))}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
