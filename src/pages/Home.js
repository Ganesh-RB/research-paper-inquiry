import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import "./Home.css"; // Assuming you have a Home.css file in the same directory
import { Chart } from "chart.js";
import { Bar } from "react-chartjs-2";

function HomeComponent() {
  const [totalPapers, setTotalPapers] = React.useState(0);
  const [totalAuthors, setTotalAuthors] = React.useState(0);

  const yearPaperData = [
    { year: 2017, papers: 100 },
    { year: 2018, papers: 200 },
    { year: 2019, papers: 300 },
    { year: 2020, papers: 400 },
    { year: 2021, papers: 500 },
  ]

  React.useEffect(() => {
    async function fetchTotalPapers() {
      const response = await fetch("/paper/count");
    const papersFromAPI = await response.json();
    console.log("papersFromAPI: ");
    console.log(papersFromAPI);
    setTotalPapers(papersFromAPI.data);
    }
    fetchTotalPapers();
  }
  , []);

  React.useEffect(() => {
    async function fetchTotalAuthors() {
      const response = await fetch("/author/count"
      );
      const authorsFromAPI = await response.json();
      console.log("authorsFromAPI: ");
      console.log(authorsFromAPI);
      setTotalAuthors(authorsFromAPI.data);
    }
    fetchTotalAuthors();
  }
  , []);

  
  return (
    <div className="home-container flex flex-col gap-8">
      <section className="home-banner">
      <h1 className="home-title">Welcome to Research Paper Inquiry</h1>
      <p className="home-content">
        Explore research papers and gain valuable insights with our
        user-friendly web application.
      </p>
      </section>
      <section className="home-stats flex flex-row gap-4 flex-start flex-wrap justify-around padding-4">
        <div>
          <Card className="stat-card">
            <CardHeader className="stat-header flex flex-col items-start gap-2">
              <p className="text-2xl font-bold center">Papers</p>
              <p className="text-sm">Total: {totalPapers}</p>
            </CardHeader>
            <CardBody className="stat-body">
              {/* show chart here based on data */}
              {/* <Bar type="line" data={ yearPaperData.map((data) => data.papers)} /> */}
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="stat-card">
            <CardHeader className="stat-header flex flex-col items-start gap-2">
              <p className="text-2xl font-bold center">Authors</p>
              <p className="text-sm">Total: {totalAuthors}</p>
            </CardHeader>
            <CardBody className="stat-body">
              {/* <Image
                alt="Authors"
                className="stat-image"
                src="/images/authors.jpeg"
                width={270}
              /> */}
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default HomeComponent;
