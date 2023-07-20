import { Session } from "next-auth";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { sendDownload } from "../functions/sendDownload"; // Adjust path as needed

type Props = {
  session: Session | null;
  chatId: string;
};

function DownloadButton({ session, chatId }: Props) {
  var data = new Array();

  const downloadDoc = async () => {
    if (session) {
      const messages = await sendDownload(session.user?.email!, chatId);

      messages.forEach((message) => {
        data.push(
          new Paragraph({
            children: [new TextRun(`${message.content}`), new TextRun("\n\n")],
          })
        );
        data.push(
          new Paragraph({
            children: [new TextRun("\n\n")],
          })
        );
      });

      const doc = new Document({
        sections: [
          {
            children: data,
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "example.docx");
      });
    }
  };

  return (
    <button
      type="button"
      onClick={downloadDoc}
      className="p-1 ml-5 rounded-md text-black bg-[#93c5fd] border-2 border-[#d4d4d4] hover:bg-[#0c2474]/50"
    >
      Download Responses
    </button>
  );
}

export default DownloadButton;
