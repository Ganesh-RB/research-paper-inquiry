import React from "react";

import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";

import { Link } from "react-router-dom";

function PaperSmall(props) {
  return (
    <div className="paper-section-small min-w-[40%]">
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <h4 className="text-large font-bold">{props.title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Table
            classNames={{
              table: "min-h-[400px]",
            }}
          >
            <TableHeader>
              {props.keys.map((key) => (
                <TableColumn key={key}>{key.toUpperCase()}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {props.papers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell>
                    <Link to={`/paper/${paper.id}`}>{paper.title}</Link>
                  </TableCell>
                  <TableCell className="text-center">
                    {paper[props.keys[1]]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default PaperSmall;
