"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

/** Skill trees now open as structured courses at /courses/[id] */
export default function TreeRedirectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    if (id) router.replace(`/courses/${id}`);
  }, [id, router]);

  return (
    <div className="arc-page py-20 text-center text-sm text-[var(--arc-muted)]">
      Opening course…
    </div>
  );
}
