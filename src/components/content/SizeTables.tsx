"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sizeTables, type SizeTable } from "@/src/lib/data/size-guide";

/** Women / Men / Kids tables behind a tab switcher with a sliding underline. */
export default function SizeTables({ initial = "women" }: { initial?: SizeTable["id"] }) {
  const [active, setActive] = useState<SizeTable["id"]>(initial);
  const table = sizeTables.find((t) => t.id === active) ?? sizeTables[0];

  return (
    <div>
      <div role="tablist" aria-label="Size charts" className="flex gap-8 border-b border-line">
        {sizeTables.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`caps relative pb-3 text-[11px] transition-colors ${
              active === t.id ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {t.id}
            {active === t.id && (
              <motion.span
                layoutId="size-tab-underline"
                className="absolute inset-x-0 -bottom-px h-px bg-ink"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        key={table.id}
        role="tabpanel"
        id={`panel-${table.id}`}
        aria-labelledby={`tab-${table.id}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6"
      >
        <p className="caps mb-4 text-[10px] text-muted">{table.title}</p>
        <div className="-mx-4 overflow-x-auto px-4">
          <table className="w-full min-w-[420px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-ink">
                {table.columns.map((c) => (
                  <th key={c} scope="col" className="caps pb-3 pr-4 text-[10px] font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row[0]} className="border-b border-line transition-colors hover:bg-sand/60">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="py-3.5 pr-4 font-medium">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className="py-3.5 pr-4 text-ink-soft">
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
