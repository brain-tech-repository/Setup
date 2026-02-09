"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

/* =======================
   PERMISSION CONFIG
======================= */

const PERMISSIONS = [
  {
    key: "users",
    label: "User Management",
    rows: ["Users", "User Roles"],
  },
  {
    key: "products",
    label: "Product Management",
    rows: ["Products", "Categories"],
  },
  {
    key: "reports",
    label: "Reports",
    rows: ["Sales Report", "Audit Logs"],
  },
];

const ACTIONS = ["create", "view", "update", "delete"];

/* =======================
   COMPONENT
======================= */

export default function RolePermissionMenu() {
  return (
    <Accordion type="multiple" className="w-full">
      {PERMISSIONS.map((module) => (
        <AccordionItem key={module.key} value={module.key}>
          <AccordionTrigger className="text-left font-medium">
            {module.label}
          </AccordionTrigger>

          <AccordionContent>
            {/* Header row */}
            <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-muted-foreground px-2 pb-2">
              <div>Feature</div>
              <div className="text-center">Create</div>
              <div className="text-center">View</div>
              <div className="text-center">Update</div>
              <div className="text-center">Delete</div>
            </div>

            <Separator />

            {/* Permission rows */}
            <div className="space-y-3 mt-3">
              {module.rows.map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-5 items-center gap-4 px-2"
                >
                  <span className="text-sm">{row}</span>

                  {ACTIONS.map((action) => (
                    <div key={action} className="flex justify-center">
                      <Switch />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
