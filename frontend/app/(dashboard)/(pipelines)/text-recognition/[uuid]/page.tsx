import TextRecognitionPipeline from "@/components/text-recognition-pipeline";
import { TopMainContent } from "@/components/top-main-content";
// import { getExtractionData, getS3ObjectUrl, getText } from "@/lib/requests";
import { headers } from "next/headers";

export type FileInfos = {
    uuid: string;
    filename: string;
    url: string;
}

export async function getS3ObjectUrl(uuid: string) {
    const res = await fetch(`http://localhost:3000/api/signed-url?uuid=${uuid}`, {
      method: "GET",
      headers: {
        Cookie: headers().get("cookie") || "",
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }

export default async function TextRecognitionPipelinePage({
  params,
}: {
  params: { uuid: string };
}) {
//   const { filename } = await getExtractionData(
//     params.uuid,
//     Status.TO_RECOGNIZE
//   );
//   const { url } = await getS3ObjectUrl(params.uuid);
const fileInfos = (await getS3ObjectUrl(params.uuid)) as FileInfos;

//   const text = await getText(url);
  return (
    <div>
      <div className="flex flex-col h-full">
        <TopMainContent title="Text Recognition" step={2} />
        <TextRecognitionPipeline
        //   uuid={params.uuid}
        //   url={url}
        //   text={text}
        //   filename={filename}
        infos = {fileInfos}
        />
      </div>
    </div>
  );
}