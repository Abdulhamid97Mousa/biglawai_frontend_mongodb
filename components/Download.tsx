import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Session } from "next-auth";
import { db } from "../utils/firebase";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

type Props = {
  session: Session | null;
  chatId: string;
};

type Data = {
  data: string;
};

function DownloadButton({ session, chatId }: Props) {
  var data = new Array();
  const downloadDoc = async () => {
    const docRef = collection(
      db,
      "users",
      session?.user?.email!,
      "chats",
      chatId,
      "messages"
    );
    const messageQueries = query(
      docRef,
      orderBy("createdAt", "asc"),
      where("checked", "==", true)
    );
    const querySnapshot = await getDocs(messageQueries);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(
        new Paragraph({
          children: [new TextRun(`${doc.data().text}`), new TextRun("\n\n")],
        })
      );
      data.push(
        new Paragraph({
          children: [new TextRun("\n\n")],
        })
      );
      //console.log(doc.id, " => ", doc.data());
    });
    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "myWonkyStyle",
            name: "My Wonky Style",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              italics: true,
              color: "999999",
            },
            paragraph: {
              spacing: {
                line: 276,
              },
              indent: {
                left: 720,
              },
            },
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              // size: {
              //   width: `${21}${"cm"}`,
              //   height: `${29.7}${"cm"}`,
              //   orientation: PageOrientation.PORTRAIT,
              // },
              // margin: {
              //     top: `${2}${"cm"}`,
              //     right: `${2}${"cm"}`,
              //     bottom: `${2}${"cm"}`,
              //     left: `${2}${"cm"}`,
              // },
            },
          },
          children: data,
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  };

  return (
    <button
      type="button"
      onClick={downloadDoc}
      className="p-1 ml-5 mb-5 rounded-md text-white bg-blue-700/100 border-2 border-[#d4d4d4]"
    >
      Download Responses
    </button>
  );
}

export default DownloadButton;
