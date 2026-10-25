"use client";

import SimpleEntryDetail from "@/components/SimpleEntryDetail";

export default function ChoreDetail({ params }: { params: { id: string } }) {
  return <SimpleEntryDetail id={params.id} heading="家事報告" />;
}
