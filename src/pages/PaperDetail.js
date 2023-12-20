import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Image,
  Skeleton,
} from "@nextui-org/react";
import "./PaperDetail.css"; // Assuming you have a PaperDetail.css file in the same directory
import { useParams } from "react-router-dom";

function PaperDetail(props) {
  const { id } = useParams();
  console.log("id: ", id);

  const DEpaper = {
    id: 0,
    title: "",
    abst: "",
    year: 0,
    venue: "",
    citations: [],
  };

  const [paper, setPaper] = React.useState(DEpaper);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function fetchPaper() {
      const response = await fetch(`/record/${id}`);
      console.log("response: ", response);
      const paperFromAPI = await response.json();
      console.log("paperFromAPI: ", paperFromAPI);
      // sleep(1000);
      await new Promise((r) => setTimeout(r, 2000));

      setPaper(paperFromAPI);
      setIsLoaded(true);
    }
    fetchPaper();
  }, [id]);

  return (
    <div className="paper-details min-h-[400px] max-w-[80%] min-w-[70%] mx-auto">
      <Card className="paper-card ">
        <CardHeader className="bg-gray-100">
          <div className="flex flex-col gap-2 align-start height-full">
            <Skeleton isLoaded={isLoaded} className="rounded-md">
              <p className="text-2xl font-bold max-h-[100px] overflow-auto p-2">
                {paper.title || "Title"}
              </p>
            </Skeleton>
            <div className="flex flex-row gap-4 mt-4 p-2">
              <Skeleton isLoaded={isLoaded} className="rounded-md">
                <p className="text-sm ">{paper.venue || "Unknown Venue"}</p>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className="rounded-md">
                <p className="text-sm ">{paper.year || "YYYY"}</p>
              </Skeleton>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-sm font-bold mt-4 mb-2">Abstract</p>
          <Skeleton isLoaded={isLoaded} className="h-full rounded-lg">
            <p className="paper-abstract text-sm m-2 max-h-[200px] overflow-auto">
              {paper.abst || "Unknown"}
            </p>
          </Skeleton>
          <p className="text-sm font-bold mt-2">Authors</p>
          <div className="paper-authors flex flex-row gap-4 p-2 mt-4 mb-2">
            {paper.authors ? (
              paper.authors.map((author, index) => (
                <a href={`/author/${author.id}`}>
                  <div
                    key={index}
                    className="author flex flex-col items-center gap-2 bg-gray-100 p-2 rounded-md"
                  >
                    <Avatar text={"A"} size="large" />
                    <p className="author-name text-sm">{author.name}</p>
                  </div>
                </a>
              ))
            ) : (
              <div
                key={0}
                className="author flex flex-col items-center gap-2 bg-gray-100 p-2 rounded-lg"
              >
                <Skeleton isLoaded={isLoaded} className="rounded-md">
                  <Avatar text={"A"} size="large" />
                </Skeleton>
                <Skeleton isLoaded={isLoaded} className="rounded-md">
                  <p className="author-name text-sm">Unknown</p>
                </Skeleton>
              </div>
            )}
          </div>
          <div className="paper-citations flex flex-col gap-2">
            <p className="text-sm font-bold">Citations</p>
            <Skeleton isLoaded={isLoaded} className="rounded-md">
              <p className="text-sm">
                {paper.citations.length || "No citations found"}
              </p>
            </Skeleton>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default PaperDetail;
