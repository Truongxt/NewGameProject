import { FaRegUserCircle } from "react-icons/fa";
import { useUser } from "../provider/UserProvider";
import { useEffect, useState } from "react";
import { getComment } from "../api/api";
import { IoIosSend } from "react-icons/io";

export const CommentItem = ({
  parentId,
  gameId,
  setCurrentShow,
  currentShow,
  handleOnRepCmt,
  setReplyCmt,
  replyCmt,
  errors,
  replySuccess
}) => {
  const { formatDate } = useUser();
  const [cmts, setCmts] = useState([]);

  const fetchCmt = async () => {
    try {
      const respone = await getComment({ gameId, responseFor: parentId });
      const data = await respone.json();
      setCmts(data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCmt();
    
  }, [replySuccess]);

  return (
    <div>
      {cmts.map((cmt) => (
        <div className={`flex gap-5 my-4`} key={cmt.commentId}>
          <FaRegUserCircle className="text-[50px] text-[rgb(50,187,237)]" />
          <div className="flex flex-col gap-1 flex-1">
            <p className="font-medium">{cmt.userName}</p>
            <p className="text-[14px] text-gray-500 font-[500]">
              Bình luận vào {formatDate(cmt.commentDate)}
            </p>
            <p>{cmt.content}</p>
            <p
              onClick={() => {
                setCurrentShow(currentShow ? "" : parentId);
              }}
              className="font-medium text-[rgb(36,122,242)] hover:cursor-pointer"
            >
              Trả lời
            </p>
          </div>
        </div>
      ))}
      <div>
        {currentShow == parentId ? (
          <div className="relative">
            <input
            value={replyCmt}
              onChange={(e) => {
                setReplyCmt(e.target.value);
              }}
              type="text"
              style={{ width: "100%" }}
              className="my-2 border border-gray-300 rounded px-3 py-2 hover:outline-none hover:ring-1 hover:ring-[rgb(36,122,242)] focus:outline-none focus:ring-1 focus:ring-[rgb(36,122,242)]"
            />
            <IoIosSend
              className="absolute right-2 top-[17px] text-2xl hover:cursor-pointer"
              onClick={(e) => {
                handleOnRepCmt(e);
              }}
            />
             {errors.reply && (<p className="text-red-500 text-sm">{errors.reply}</p>)}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
