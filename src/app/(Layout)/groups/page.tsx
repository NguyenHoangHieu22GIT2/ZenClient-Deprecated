import React from "react";
import { Container } from "@/components/ui/Container";
import { GroupFilter } from "@/components/Groups/GroupFilter";
import { Groups } from "@/components/Groups/Groups";
import useCheckAuth from "@/hooks/useCheckAuth";

export default async function groupsPage() {
  return (
    <Container className="mt-5">
      <div className="flex md:flex-row flex-col gap-2 [&>*:first-child]:basis-1/4 [&>*:last-child]:basis-3/4">
        <GroupFilter />
        <Groups />
      </div>
    </Container>
  );
}