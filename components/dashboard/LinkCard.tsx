// components/dashboard/LinkCard.tsx
"use client";

import { Link as LinkType } from "@prisma/client";

export default function LinkCard({ link }: { link: LinkType }) {
  return (
    <div className="border p-4 rounded-md flex justify-between items-center">
      <div className="flex-1 space-y-1">
        <p className="text-sm text-gray-500">Short Code: {link.shortCode}</p>
        <a
          href={link.url}
          target="_blank"
          className="text-indigo-600 font-medium hover:underline"
        >
          {link.url}
        </a>
        <p className="text-xs text-gray-400">
          Created: {link.createdAt.toLocaleString()}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">{link.clicks} clicks</p>
      </div>
    </div>
  );
}