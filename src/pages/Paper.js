import React from "react";
import { Avatar, Card, CardBody, CardHeader, Image, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

function PaperComponent() {
  const [isLoading, setIsLoading] = React.useState(true);

  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch("/record/top", {
        signal,
      });
      let json = await res.json();
      setIsLoading(false);
      console.log(json);
      return {
        items: json
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <div className="paper-container flex flex-row gap-4 flex-start flex-wrap justify-around">
      <div className="paper-section">
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="text-large font-bold">
              Paper with Highest Citations
            </h4>
          </CardHeader>
          <CardBody className="py-2">
            <Table
              classNames={{
                table: "min-h-[400px]",
                tr: "hover:bg-gray-100 h-[100px] overflow-auto",
                td: "height-auto",
              }}
            >
              <TableHeader>
                <TableColumn key="title">Title</TableColumn>
                <TableColumn key="abst" className="text-justify overflow-auto max-h-[100px]"> Abstract</TableColumn>
                <TableColumn key="authors">Authors</TableColumn>
                <TableColumn key="year">Year</TableColumn>
                <TableColumn key="venue">Venue</TableColumn>
                <TableColumn key="citations">Citations</TableColumn>
              </TableHeader>
              <TableBody
                items={list.items}
                isLoading={isLoading}
                onLoadMoreStart={() => {
                  setIsLoading(true);
                }}
                onLoadMoreEnd={() => {
                  setIsLoading(false);
                }}
              >
                {(item) => (
                  <TableRow key={item.id} className="overflow-auto max-h-[100px]">
                    <TableCell>
                      <Link to={`/paper/${item.id}`}>{item.title}</Link>
                    </TableCell>
                    <TableCell className="overflow-auto">
                      {item.abst || "Unknown"}
                    </TableCell>
                    <TableCell>
                      <Popover placement="bottom" trigger="hover" backdrop="blur">
                        <PopoverTrigger>
                          <Button auto>
                            {" "}
                            {item.authors.length > 1 ? (
                              <FontAwesomeIcon icon={faUsers} />
                            ) : (
                              <FontAwesomeIcon icon={faUser} />
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-2 p-2 flex-start">
                              {item.authors.map((author) => (
                                <Link to={`/author/${author.id}`} className="flex flex-row gap-2 items-center px-2 py-1 hover:bg-gray-100">
                                <Avatar key={author.id} src={author.avatar}>
                                  {author.name[0]} </Avatar>
                                  <p>{author.name}</p>
                                </Link>
                              ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell>{item.year}</TableCell>
                    <TableCell>{item.conference.venue}</TableCell>
                    <TableCell>
                      <Button auto>{item.citations.length}</Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default PaperComponent;
