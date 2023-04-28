import React from "react";
import html2canvas from 'html2canvas';

function InviteCard({guestName}) {
  const downloadRef = React.useRef();
  console.log("Invitecard called with guestName", guestName);

  const handleDownloadImage = async () => {
    const element = downloadRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <>
      <article
        className="relative rounded-xl h-[85vh] shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
        ref={downloadRef}
      >
        {/* style={{backgroundImage: `url(./Placeholder.png)`, backgroundSize: "cover"}} */}
          <img
            className="h-[85vh] w-full object-cover"
            src={"./Placeholder.png"}
            alt={"Invitation Card"}
          />
        <h1 className="absolute invitee text-2xl lg:text-4xl sm:text-3xl text-white top-[27%] left-0 right-0 text-center h-fit m-auto">
          {guestName ? guestName : "Friends and Family"}
        </h1>
      </article>
      <button
        className="bg-violet-600 text-white rounded-xl p-2 hover:border-violet-600 hover:text-violet-600 hover:bg-white border border-white absolute bottom-0 right-0 mr-4 mb-4"
        onClick={handleDownloadImage}
      >
        Download
      </button>
    </>
  );
}

export default InviteCard;
