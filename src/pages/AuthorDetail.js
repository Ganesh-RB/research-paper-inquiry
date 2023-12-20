import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAsyncList } from "@react-stately/data";

import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Skeleton,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import "./AuthorDetail.css";
import PaperSmall from "../component/PaperSmall";

function AuthorDetail(props) {
  const { id } = useParams();
  console.log(id);

  const [author, setAuthor] = useState({});
  const [isLoadingAuthor, setIsLoadingAuthor] = useState(true);

  const [isLoadingRecentPapers, setIsLoadingRecentPapers] = useState(true);
  const [isLoadingTopPapers, setIsLoadingTopPapers] = useState(true);

  const [recentPapers, setRecentPapers] = useState([]);

  const [topPapers, setTopPapers] = useState([]);

  useEffect(() => {
    async function fetchRecentPapers() {
      const response = await fetch(`/author/${id}/recentpapers`);
      const recentPapersFromAPI = await response.json();
      setRecentPapers(recentPapersFromAPI);
      setIsLoadingRecentPapers(false);
    }

    fetchRecentPapers();
  }, [id]);

  useEffect(() => {
    async function fetchTopPapers() {
      const response = await fetch(`/author/${id}/toppapers`);
      const topPapersFromAPI = await response.json();
      setTopPapers(topPapersFromAPI);
      setIsLoadingTopPapers(false);
    }

    fetchTopPapers();
  }, [id]);

  useEffect(() => {
    async function fetchAuthor() {
      const response = await fetch(`/author/${id}`);
      const authorFromAPI = await response.json();
      setAuthor(authorFromAPI);
      setIsLoadingAuthor(false);
    }

    fetchAuthor();
  }, [id]);

  return (
    <div className="author-details flex flex-col gap-4 bg-gray-100 p-4 max-w-[80%] min-w-[70%] mx-auto">
      <Card className="author-card">
        <CardHeader className="flex flex-col gap-2 flex-start flex-wrap justify-around align-center">
          <Skeleton isLoaded={!isLoadingAuthor}>
            <Avatar text={"A"} size="large" />
          </Skeleton>
          <Skeleton isLoaded={!isLoadingAuthor}>
            <p className="author-name text-md font-bold">{author.name}</p>
          </Skeleton>
        </CardHeader>
        <CardBody className="flex flex-row gap-2 flex-start flex-wrap justify-around">
          {/* <section className="author-details flex flex-col gap-4 flex-start flex-wrap justify-around align-center">
            <p className="author-email text-sm">{author.email}</p>
            <p className="author-phone text-sm">{author.phone}</p>
            <p className="author-website text-sm">{author.website}</p>
          </section>
          <section className="author-stats flex flex-col gap-4 flex-start flex-wrap justify-around align-center">
            <p className="text-sm font-bold">Total Papers: 20</p>
            <p className="text-sm font-bold">Total Citations: 20</p>
            <p className="text-sm font-bold">Total Co-Authors: 20</p>
          </section>
          <section className="author-stats flex flex-col gap-4 flex-start flex-wrap justify-around align-center">
            <p className="text-sm">Participated in 2-cliqe 20 </p>
            <p className="text-sm">Participated in 2-cliqe 20 </p>
            <p className="text-sm">Participated in 2-cliqe 20 </p>
          </section> */}

          <section className="author-papers flex gap-4 flex-start flex-wrap justify-evenly align-center">
            <PaperSmall
              title="Recent Papers"
              keys={["title", "year"]}
              papers={recentPapers}
              isLoading={isLoadingRecentPapers}
            />
            <PaperSmall
              title="Top cited Papers"
              keys={["title", "citation_count"]}
              papers={topPapers}
              isLoading={isLoadingTopPapers}
            />
          </section>
        </CardBody>
      </Card>
    </div>
  );
}

export default AuthorDetail;
