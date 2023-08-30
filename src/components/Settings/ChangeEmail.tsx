import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const ChangeEmail = (props: {}) => {
  return (
    <Card className="p-5 ">
      <CardHeader>
        <CardTitle>Change Email:</CardTitle>
      </CardHeader>
      <div className="flex gap-5">
        <Input />
        <Button>Change</Button>
      </div>
    </Card>
  );
};
