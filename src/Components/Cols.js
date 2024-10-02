import React, { useEffect, useState } from "react";
import copy from "copy-text-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { FiCopy } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
export default function Cols() {
  const [colorArr, setColorArr] = useState(generateRandomColors(5));
  function randColor() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  }
  function generateRandomColors(num) {
    return Array.from({ length: num }, (_, id) => ({
      id,
      color: randColor(),
      state: false,
    }));
  }
  function copyToClipboard(color) {
    copy(color);
    toast.success(`Color ${color} copied to clipboard!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  }

  useEffect(() => {
    const isReloaded = sessionStorage.getItem("isReloaded");
    if (!isReloaded) {
      console.log("Hello World!!!");
    } else {
      console.log(colorArr);
    }
    sessionStorage.setItem("isReloaded", true);

    setColorArr([...colorArr]);
    function handleKeyDown(e) {
      if (e.key === " ") {
        setColorArr((prevArr) =>
          prevArr.map((ele) =>
            ele.state ? ele : { ...ele, color: randColor() }
          )
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="parent flex min-h-screen items-center ">
      <ToastContainer />
      <div className="w-full h-screen">
        <div className="grid grid-cols-5 h-screen">
          {colorArr.map((ele, i) => (
            <div
              key={ele.id}
              style={{ background: ele["color"] }}
              className="flex justify-center text-md items-center flex-col gap-4 p-6  shadow-lg "
            >
              <button
                className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 shadow-md"
                onClick={() => {
                  ele["state"] = !ele["state"];
                  setColorArr([...colorArr]);
                }}
              >
                {ele.state ? (
                  <span role="img" aria-label="locked">
                    🔒 Locked
                  </span>
                ) : (
                  <span role="img" aria-label="unlocked">
                    🔓 Unlocked
                  </span>
                )}
              </button>

              <button
                className="cursor-pointer bg-white bg-opacity-70 rounded-lg px-4 py-2 select-all text-gray-900 shadow-md hover:bg-opacity-100 flex items-center gap-2"
                onClick={() => {
                  copyToClipboard(ele.color);
                  console.log(ele["color"]);
                }}
              >
                {ele.color}
                <FiCopy size={20} className="text-gray-700" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
