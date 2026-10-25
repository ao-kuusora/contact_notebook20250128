"use client";

import SimpleEntryDetail from "@/components/SimpleEntryDetail";

export default function ErrandDetail({ params }: { params: { id: string } }) {
  return <SimpleEntryDetail id={params.id} heading="おつかいメモ" />;
}
