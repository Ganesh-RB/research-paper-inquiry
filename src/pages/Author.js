import React from "react";
import "./Author.css";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
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

function AuthorComponent() {
  const [isLoading, setIsLoading] = React.useState(true);

  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch("author/frequent", {
        signal,
      });
      let json = await res.json();
      setIsLoading(false);
      console.log(json);
      return {
        items: json,
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
    <div className="author-container flex flex-row gap-4 flex-start flex-wrap justify-evenly gap-8">
      <div className="author-section">
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <h4 className="text-large font-bold">Top Authors</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Table
              onSortChange={list.sort}
              sortDescriptor={list.sortDescriptor}
              classNames={{
                table: "min-h-[400px]",
              }}
            >
              <TableHeader>
                <TableColumn key="name" className="min-w-[200px]">
                  Name
                </TableColumn>
                <TableColumn key="paper" allowsSorting>
                  Total Papers
                </TableColumn>
              </TableHeader>
              <TableBody
                items={list.items}
                isLoading={isLoading}
                loadingContent={() => <Spinner label="Loading..." />}
              >
                {(item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link to={`/author/${item.id}`}>{item.name}</Link>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.paperCount}
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

export default AuthorComponent;
